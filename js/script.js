/* =========================================================
   Maha Alsubaie — Portfolio Script
   Shared across index.html and project detail pages.
   All DOM lookups use null checks so this file never throws
   on pages that don't contain a given element.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Dark / Light theme toggle ---------- */
  var THEME_KEY = "portfolio-theme";
  var body = document.body;
  var themeToggleBtn = document.getElementById("theme-toggle");
  var themeIcon = document.getElementById("theme-icon");

  function applyTheme(theme) {
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "☀️";
    } else {
      body.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.textContent = "🌙";
    }
  }

  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {
      saved = null;
    }

    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    } else {
      var prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      var current = body.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* localStorage unavailable — theme still applies for this session */
      }
    });
  }

  initTheme();

  /* ---------- 2. Smooth scrolling for in-page nav links ---------- */
  var navLinks = document.querySelectorAll('a[href^="#"]');

  if (navLinks && navLinks.length > 0) {
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          event.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ---------- 3. Contact form submission (no backend) ---------- */
  var contactForm = document.getElementById("contact-form");
  var formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var isValid = contactForm.checkValidity();
      if (!isValid) {
        contactForm.reportValidity();
        return;
      }

      if (formSuccess) {
        formSuccess.hidden = false;
      }

      contactForm.reset();

      if (formSuccess) {
        setTimeout(function () {
          formSuccess.hidden = true;
        }, 5000);
      }
    });
  }
})();
