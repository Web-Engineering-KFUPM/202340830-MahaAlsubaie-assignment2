/* =========================================================
   Maha Alsubaie — Portfolio Script (Assignment 2)
   Shared by index.html and the project detail pages.

   Each feature lives in its own init function and looks up
   its elements first. If an element is missing (for example
   the contact form on a project page) the function simply
   returns, so one file is safe on every page.
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     Shared helpers
     --------------------------------------------------------- */
  const THEME_KEY = "portfolio-theme";
  const NAME_KEY = "portfolio-visitor-name";
  const MAX_NAME_LENGTH = 30;

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // localStorage can throw (private browsing, blocked site data),
  // so every access goes through these small try/catch wrappers.
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {
        /* nothing to do: the value just stays in the browser */
      }
    },
  };

  // Restart a CSS animation that is driven by a class (used for the
  // greeting pop-in and the error shake).
  function replayAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth; // force a reflow so the browser restarts the animation
    element.classList.add(className);
  }

  /* ---------------------------------------------------------
     1. Scroll reveal animations
        Elements with class "reveal" fade and slide in the first
        time they scroll into view. Children of [data-stagger] get
        an increasing delay so they arrive one after another.
        Runs first so content can never stay hidden by accident.
     --------------------------------------------------------- */
  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    document.querySelectorAll("[data-stagger]").forEach((parent) => {
      Array.from(parent.children).forEach((child, index) => {
        child.style.setProperty("--reveal-delay", `${index * 90}ms`);
      });
    });

    // Fallback: no observer support, or the visitor asked for less motion.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // reveal once, then stop watching
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
  }

  /* ---------------------------------------------------------
     2. Dark / light theme toggle (saved in localStorage)
     --------------------------------------------------------- */
  function initTheme() {
    const body = document.body;
    const toggleBtn = document.getElementById("theme-toggle");
    const icon = document.getElementById("theme-icon");

    function applyTheme(theme) {
      const isDark = theme === "dark";
      body.setAttribute("data-theme", isDark ? "dark" : "light");
      if (icon) icon.textContent = isDark ? "☀️" : "🌙";
    }

    const saved = storage.get(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    } else {
      const prefersDark =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }

    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", () => {
      const next = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      storage.set(THEME_KEY, next);
    });
  }

  /* ---------------------------------------------------------
     3. Smooth scrolling for in-page links
     --------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    });
  }

  /* ---------------------------------------------------------
     4. Personalised greeting
        - The greeting word depends on the visitor's local time.
        - The visitor can type a name; it is validated, shown in
          the greeting, and remembered in localStorage.
        - "Not you?" forgets the name again.
     --------------------------------------------------------- */
  const GREETINGS = [
    { from: 5, to: 12, text: "Good morning", emoji: "☀️" },
    { from: 12, to: 17, text: "Good afternoon", emoji: "🌤️" },
    { from: 17, to: 22, text: "Good evening", emoji: "🌆" },
  ];
  const NIGHT_GREETING = { text: "Hello", emoji: "🌙" };

  // Letters from any language (so Arabic names work too), spaces,
  // hyphens and apostrophes. No digits or symbols.
  const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} '’-]*$/u;

  function getTimeGreeting(date = new Date()) {
    const hour = date.getHours();
    return GREETINGS.find((g) => hour >= g.from && hour < g.to) || NIGHT_GREETING;
  }

  // Returns { name } when valid, or { error } with a friendly message
  // that says what went wrong and what to do next.
  function validateName(rawValue) {
    const name = rawValue.trim().replace(/\s+/g, " ");

    if (!name) {
      return { error: "Please type your name first, then press “Say hi”." };
    }
    if (name.length > MAX_NAME_LENGTH) {
      return { error: `That name is a little long. Please use ${MAX_NAME_LENGTH} characters or fewer.` };
    }
    if (!NAME_PATTERN.test(name)) {
      return { error: "Names can only contain letters, spaces, hyphens and apostrophes. Please remove any numbers or symbols and try again." };
    }
    return { name };
  }

  function initGreeting() {
    const greetingText = document.getElementById("greeting-text");
    const form = document.getElementById("greeting-form");
    const input = document.getElementById("visitor-name");
    const errorEl = document.getElementById("name-error");
    const note = document.getElementById("greeting-note");
    const noteText = document.getElementById("greeting-note-text");
    const resetBtn = document.getElementById("greeting-reset");

    if (!greetingText || !form || !input || !errorEl || !note || !noteText || !resetBtn) return;

    greetingText.tabIndex = -1; // lets us move keyboard focus here after the name is saved

    function showError(message) {
      errorEl.textContent = message;
      errorEl.hidden = false;
      input.setAttribute("aria-invalid", "true");
      replayAnimation(errorEl, "shake");
    }

    function clearError() {
      errorEl.hidden = true;
      errorEl.textContent = "";
      input.removeAttribute("aria-invalid");
    }

    // Draws the greeting. With a name it hides the form and shows the
    // "Not you?" note; without one it shows the form again.
    function render(name, message, animate) {
      const { text, emoji } = getTimeGreeting();

      greetingText.textContent = "";
      greetingText.append(text);
      if (name) {
        greetingText.append(", ");
        // <bdi> keeps Arabic and English names displaying correctly side by side.
        // textContent (not innerHTML) means whatever was typed can never become markup.
        const nameEl = document.createElement("bdi");
        nameEl.textContent = name;
        greetingText.append(nameEl);
      }
      greetingText.append(` ${emoji}`);

      form.hidden = Boolean(name);
      note.hidden = !name;
      noteText.textContent = message;

      if (animate) replayAnimation(greetingText, "pop-in");
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const result = validateName(input.value);
      if (result.error) {
        showError(result.error);
        input.focus();
        return;
      }

      clearError();
      const saved = storage.set(NAME_KEY, result.name);
      const message = saved
        ? "Nice to meet you!"
        : "Nice to meet you! (Your browser blocked saving, so I'll ask again next visit.)";

      render(result.name, message, true);
      greetingText.focus({ preventScroll: true });
    });

    input.addEventListener("input", clearError);

    resetBtn.addEventListener("click", () => {
      storage.remove(NAME_KEY);
      input.value = "";
      clearError();
      render("", "", true);
      input.focus();
    });

    // First paint: use the saved name if there is a valid one.
    const savedName = storage.get(NAME_KEY);
    const check = savedName ? validateName(savedName) : null;

    if (check && check.name) {
      render(check.name, "Welcome back, nice to see you again.", false);
    } else {
      if (savedName) storage.remove(NAME_KEY); // discard a corrupted or edited value
      render("", "", false);
    }
  }

  /* ---------------------------------------------------------
     Start everything
     --------------------------------------------------------- */
  initScrollReveal();
  initTheme();
  initSmoothScroll();
  initGreeting();
  initProjectFilter();
  initContactForm();
})();
