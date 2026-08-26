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

    /* ---------- 4. Contact form ---------- */
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
