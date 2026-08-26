/* =========================================================
   SAMEO SMASH — language system (English / Русский / ქართული)
   ---------------------------------------------------------
   How it works, in plain terms:

   1. Anything on the page that should be translated is marked
      in the HTML with  data-i18n  (for the text inside it) or
      data-i18n-attr="alt,aria-label"  (for attributes).
   2. On the first run this file reads the ENGLISH already in
      the page and remembers it. English is the source, so it
      never needs to be listed anywhere.
   3. js/i18n-data.js holds the Russian and Georgian, looked up
      by that English text. A missing entry simply stays in
      English — nothing ever goes blank.
   4. The choice is saved in the browser (localStorage) so a
      visitor is only asked once.

   To change a piece of English text: edit the HTML, then edit
   the matching key in js/i18n-data.js so the two still match.

   Note for later: the full-screen language chooser and the
   EN/RU/KA buttons in the header are built by this file, not
   written into the HTML pages — that way there is only one
   copy of them to edit. The markup is right below.
   ========================================================= */

(function () {
  "use strict";

  var LANGS   = ["en", "ru", "ka"];
  var STORAGE = "sameo-lang";
  var DATA    = window.SAMEO_I18N || {};

  /* ---------- the two pieces of UI this file builds ---------- */

  var GATE_HTML =
    '<div class="langgate" role="dialog" aria-modal="true" aria-label="Choose your language">' +
      '<div class="langgate__inner">' +
        '<p class="langgate__brand">SAMEO SMASH<em lang="ka">სამეო სმეშ</em></p>' +
        '<p class="langgate__title">' +
          '<span>Choose your language</span>' +
          '<span lang="ru">Выберите язык</span>' +
          '<span lang="ka">აირჩიეთ ენა</span>' +
        '</p>' +
        '<div class="langgate__opts">' +
          '<button class="langgate__opt" type="button" data-lang="en">' +
            '<b>English</b><small>EN</small></button>' +
          '<button class="langgate__opt" type="button" data-lang="ru" lang="ru">' +
            '<b>Русский</b><small>RU</small></button>' +
          '<button class="langgate__opt" type="button" data-lang="ka" lang="ka">' +
            '<b>ქართული</b><small>KA</small></button>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* Two shapes of the same control. On a phone there is no room beside the
     logo for three pills, so a single button showing the current language
     reopens the full-screen chooser instead. CSS decides which is on. */
  var PICK_HTML =
    '<div class="langpick" role="group" aria-label="Language">' +
      '<button class="langpick__now" type="button" data-langgate ' +
              'aria-haspopup="dialog" aria-label="Change language">EN</button>' +
      '<span class="langpick__opts">' +
        '<button type="button" data-lang="en">EN</button>' +
        '<button type="button" data-lang="ru">RU</button>' +
        '<button type="button" data-lang="ka">KA</button>' +
      '</span>' +
    '</div>';

  /* ---------- lookup tables ---------- */

  /* Source HTML is indented for readability, so "Two    words" and
     "Two words" must be treated as the same string. Everything is
     compared with runs of whitespace squashed to one space. */
  function squash(s) {
    return String(s).replace(/\s+/g, " ").trim();
  }

  var TABLE = {};
  LANGS.forEach(function (lang) {
    var src = DATA[lang] || {};
    var out = {};
    for (var key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) out[squash(key)] = src[key];
    }
    TABLE[lang] = out;
  });

  /* ---------- collect every translatable unit, once ---------- */

  var units = [];

  /* `root` is a document by default, but anything added to the page later can
     be passed in instead — see window.SameoLang.adopt at the foot of this
     file. Whatever is passed, its English is read once and remembered, so it
     can always be put back. */
  function collect(root) {
    var i, j, el, list;

    list = root.querySelectorAll("[data-i18n]");
    for (i = 0; i < list.length; i++) {
      el = list[i];
      units.push({ el: el, attr: null, en: el.innerHTML, key: squash(el.innerHTML) });
    }

    list = root.querySelectorAll("[data-i18n-attr]");
    for (i = 0; i < list.length; i++) {
      el = list[i];
      var names = el.getAttribute("data-i18n-attr").split(",");
      for (j = 0; j < names.length; j++) {
        var name = names[j].trim();
        var value = el.getAttribute(name);
        if (value) units.push({ el: el, attr: name, en: value, key: squash(value) });
      }
    }
  }

  /* ---------- apply ---------- */

  var current = "en";

  function apply(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "en";
    var dict = TABLE[lang] || {};

    for (var i = 0; i < units.length; i++) {
      var u = units[i];
      var text = lang === "en" ? u.en : (dict[u.key] || u.en);
      if (u.attr) {
        if (u.el.getAttribute(u.attr) !== text) u.el.setAttribute(u.attr, text);
      } else if (u.el.innerHTML !== text) {
        u.el.innerHTML = text;
      }
    }

    current = lang;
    document.documentElement.setAttribute("lang", lang);

    var buttons = document.querySelectorAll("[data-lang]");
    for (var b = 0; b < buttons.length; b++) {
      var on = buttons[b].getAttribute("data-lang") === lang;
      buttons[b].setAttribute("aria-pressed", on ? "true" : "false");
      buttons[b].classList.toggle("is-on", on);
    }

    var now = document.querySelector(".langpick__now");
    if (now) now.textContent = lang.toUpperCase();
  }

  /* ---------- remembering the choice ---------- */

  /* Safari in private mode throws on localStorage, so every access
     is wrapped: the site must still work, it just forgets. */
  function read() {
    try { return window.localStorage.getItem(STORAGE); } catch (e) { return null; }
  }
  function save(lang) {
    try { window.localStorage.setItem(STORAGE, lang); } catch (e) {}
  }

  /* ---------- header switcher ---------- */

  function buildPicker() {
    var actions = document.querySelector(".nav__actions");
    if (!actions) return;
    var holder = document.createElement("div");
    holder.innerHTML = PICK_HTML;
    var pick = holder.firstChild;
    actions.insertBefore(pick, actions.firstChild);
    pick.addEventListener("click", function (event) {
      var gateButton = event.target.closest("[data-langgate]");
      if (gateButton) { openGate(gateButton); return; }

      var button = event.target.closest("button[data-lang]");
      if (!button) return;
      var lang = button.getAttribute("data-lang");
      if (lang === current) return;
      save(lang);
      apply(lang);
    });
  }

  /* ---------- first-visit chooser ---------- */

  /* `opener` is the header button when the chooser is reopened later, so
     focus can go back where it came from. It is absent on a first visit. */
  function openGate(opener) {
    if (document.querySelector(".langgate")) return;

    var holder = document.createElement("div");
    holder.innerHTML = GATE_HTML;
    var gate = holder.firstChild;
    document.body.appendChild(gate);
    document.documentElement.classList.add("lang-choosing");

    var buttons = gate.querySelectorAll("button[data-lang]");
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute("data-lang") === current;
      buttons[i].classList.toggle("is-on", on);
      if (on && opener) buttons[i].focus();
    }
    if (!opener || !gate.querySelector(".is-on")) buttons[0].focus();

    gate.addEventListener("keydown", function (event) {
      /* Escape only makes sense once a language is already in force —
         on a first visit there is nothing to go back to. */
      if (event.key === "Escape" && opener) {
        closeGate(gate, opener);
        return;
      }
      /* Keep tabbing inside the chooser while it is open. */
      if (event.key !== "Tab") return;
      var all = gate.querySelectorAll("button");
      var edge = event.shiftKey ? all[0] : all[all.length - 1];
      if (document.activeElement === edge) {
        event.preventDefault();
        (event.shiftKey ? all[all.length - 1] : all[0]).focus();
      }
    });

    gate.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-lang]");
      if (!button) return;
      var lang = button.getAttribute("data-lang");
      save(lang);
      apply(lang);
      closeGate(gate, opener);
    });
  }

  function closeGate(gate, opener) {
    document.documentElement.classList.remove("lang-choosing");
    if (opener) opener.focus();
    var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) { gate.remove(); return; }
    gate.classList.add("is-out");
    /* Remove on transitionend, with a timer as the safety net in case
       the transition never fires (a background tab, for instance). */
    var done = false;
    function finish() { if (!done) { done = true; gate.remove(); } }
    gate.addEventListener("transitionend", finish);
    window.setTimeout(finish, 900);
  }

  /* ---------- start ---------- */

  /* Anything built by another script after this one has run — the order
     chooser in js/script.js, for instance — is written in English like the
     rest of the site and hands itself over here to be translated. */
  window.SameoLang = {
    adopt: function (root) {
      if (!root) return;
      collect(root);
      apply(current);
    },
    current: function () { return current; }
  };

  function start() {
    units = [];
    collect(document);
    buildPicker();

    var stored = read();
    if (stored && LANGS.indexOf(stored) >= 0) {
      apply(stored);
    } else {
      apply("en");
      openGate();
    }

    /* The page was held back by the inline script in <head>; it is now in
       the right language, so let it show. */
    document.documentElement.classList.remove("lang-boot");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
