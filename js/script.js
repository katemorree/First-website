/* =========================================================
   SAMEO SMASH — site scripts
   Vanilla JS, no dependencies.
   1. Mobile navigation
   2. Sticky header state
   3. Scroll reveal (staggered)
   4. Contact form
   ========================================================= */

(function () {
  "use strict";

  /* ---- CONFIG ------------------------------------------------------
     To make the contact form deliver real email, create a free form at
     https://formspree.io and paste its endpoint URL below.
     Until then the form politely directs visitors to the phone number.
     Full instructions: README.md §4
  ------------------------------------------------------------------- */
  var FORM_ENDPOINT = "";
  var PHONE_DISPLAY = "+995 511 10 08 35";

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 1. Mobile navigation ---------- */
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav__toggle");

    if (nav && toggle) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });

      // Close the menu after tapping a link
      nav.querySelectorAll(".nav__links a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });

      // Close on Escape, and on outside tap
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });

      document.addEventListener("click", function (e) {
        if (nav.classList.contains("is-open") && !nav.contains(e.target)) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* ---------- 2. Sticky header state ---------- */
    var header = document.querySelector(".header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 10);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ---------- 3. Scroll reveal ---------- */
    // Give grouped children an incremental delay so they cascade in.
    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty("--i", i);
      });
    });

    var revealEls = document.querySelectorAll("[data-reveal]");

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      // Older browsers: show everything immediately.
      revealEls.forEach(function (el) { el.classList.add("is-in"); });
    }

    /* ---------- 4. Scroll-driven sections ----------
       Drives the pinned hero stage and the "anatomy" section.

       Design notes:
       - ONE requestAnimationFrame loop serves every section. Scroll events
         only set a flag; all reading and writing happens once per frame.
       - Each section gets a single custom property (--p / --q) holding its
         progress from 0 to 1. All the actual movement is expressed as
         calc() in the stylesheet, so the tuning lives with the design.
       - IntersectionObserver switches sections off while they are out of
         view, so scrolling the rest of the page costs nothing.
       - Rects are read for every active section first, then styles are
         written — never interleaved, so there is no layout thrashing.
       - If the visitor prefers reduced motion we never start the loop at
         all; the stylesheet already renders the resting state.
    */
    var reduceMotion = window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var sections = [];

    function addSection(rootSel, varName, onProgress) {
      var root = document.querySelector(rootSel);
      if (!root) return;
      var track = root.querySelector("[data-track]");
      if (!track) return;
      sections.push({ root: root, track: track, name: varName,
                      onProgress: onProgress, active: false, last: -1 });
    }

    addSection(".stage", "--p", null);

    // Anatomy also swaps which caption is showing
    var steps = [].slice.call(document.querySelectorAll(".anatomy__step"));
    var dots  = [].slice.call(document.querySelectorAll(".anatomy__count i"));
    addSection(".anatomy", "--q", function (q) {
      if (!steps.length) return;
      var i = Math.floor(q * steps.length);
      if (i > steps.length - 1) i = steps.length - 1;
      if (i < 0) i = 0;
      if (i === this.step) return;          // only touch the DOM on change
      this.step = i;
      steps.forEach(function (el, n) { el.classList.toggle("is-on", n === i); });
      dots.forEach(function (el, n) { el.classList.toggle("is-on", n <= i); });
    });

    // Product showcase: one burger hands over to the next.
    // The same helper as the anatomy — a step index derived from progress,
    // with the DOM touched only when the step actually changes.
    function stepper(items, marks) {
      return function (p) {
        if (!items.length) return;
        var i = Math.floor(p * items.length);
        if (i > items.length - 1) i = items.length - 1;
        if (i < 0) i = 0;
        if (i === this.step) return;
        this.step = i;
        items.forEach(function (el, n) { el.classList.toggle("is-on", n === i); });
        marks.forEach(function (el, n) { el.classList.toggle("is-on", n === i); });
      };
    }

    addSection(".showcase", "--r", stepper(
      [].slice.call(document.querySelectorAll(".showcase__item")),
      [].slice.call(document.querySelectorAll(".showcase__rail i"))
    ));

    if (sections.length && !reduceMotion) {
      var queued = false;

      function render() {
        queued = false;
        var live = sections.filter(function (s) { return s.active; });
        if (!live.length) return;

        // Read every rect first...
        var values = live.map(function (s) {
          var r = s.track.getBoundingClientRect();
          var span = r.height - window.innerHeight;
          if (span <= 0) return 0;
          var p = -r.top / span;
          return p < 0 ? 0 : p > 1 ? 1 : p;
        });

        // ...then write, so reads and writes are never interleaved.
        live.forEach(function (s, i) {
          var p = values[i];
          if (Math.abs(p - s.last) < 0.0005) return;  // skip imperceptible changes
          s.last = p;
          s.root.style.setProperty(s.name, p.toFixed(4));
          if (s.onProgress) s.onProgress(p);
        });
      }

      function schedule() {
        if (!queued) { queued = true; requestAnimationFrame(render); }
      }

      if ("IntersectionObserver" in window) {
        var gate = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            sections.forEach(function (s) {
              if (s.track === e.target) s.active = e.isIntersecting;
            });
          });
          schedule();
        }, { rootMargin: "120px 0px" });
        sections.forEach(function (s) { gate.observe(s.track); });
      } else {
        sections.forEach(function (s) { s.active = true; });
      }

      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", function () {
        sections.forEach(function (s) { s.last = -1; });  // force a recompute
        schedule();
      }, { passive: true });

      schedule();
    }

    /* ---------- 5. Contact form ---------- */
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");

    if (!form || !status) return;

    var say = function (message, ok) {
      status.textContent = message;
      status.className = "form__status is-shown " + (ok ? "is-ok" : "is-err");
    };

    if (FORM_ENDPOINT) form.setAttribute("action", FORM_ENDPOINT);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        say("Please check the highlighted fields and try again.", false);
        return;
      }

      if (!FORM_ENDPOINT) {
        say("Thanks for reaching out. For the fastest reply, please call us on " + PHONE_DISPLAY + ".", true);
        return;
      }

      var button = form.querySelector("button[type=submit]");
      var original = button.textContent;
      button.disabled = true;
      button.textContent = "Sending…";

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          say("Thanks! Your message has been sent — we'll get back to you soon.", true);
        })
        .catch(function () {
          say("Sorry, something went wrong. Please call us on " + PHONE_DISPLAY + ".", false);
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = original;
        });
    });
  });
})();
