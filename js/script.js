/*
  SAMEO SMASH — site scripts
  Three small, independent features:
  1. Mobile nav menu (hamburger open/close)
  2. Scroll-reveal animations (fade/slide elements in as you scroll)
  3. Contact form handling (basic validation + submit feedback)
  No external libraries are used, so the site stays fast and simple to edit.
*/

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- 1. Mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 3. Contact form ---------- */
  var form = document.getElementById("contact-form");
  var statusBox = document.getElementById("form-status");

  if (form && statusBox) {
    form.addEventListener("submit", function (event) {
      // If a real form backend (e.g. Formspree) has been connected,
      // the form's "action" attribute will point to it and this
      // handler just lets the normal submit happen after validation.
      // See README.md for how to connect one.
      if (!form.checkValidity()) {
        event.preventDefault();
        statusBox.textContent = "Please fill in all required fields correctly.";
        statusBox.className = "form-status visible error";
        return;
      }

      var actionUrl = form.getAttribute("action") || "";
      var isPlaceholderAction = actionUrl.indexOf("REPLACE_WITH_YOUR_FORM_ENDPOINT") !== -1 || actionUrl === "" || actionUrl === "#";

      if (isPlaceholderAction) {
        // No real backend connected yet — show a friendly demo message
        // instead of trying (and failing) to submit somewhere.
        event.preventDefault();
        statusBox.textContent = "Thanks! This is a demo form — connect Formspree (see README.md) to receive real messages.";
        statusBox.className = "form-status visible success";
        form.reset();
      }
      // Otherwise, let the browser submit normally to the real endpoint.
    });
  }
});
