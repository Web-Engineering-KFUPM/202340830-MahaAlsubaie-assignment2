# Technical Documentation

**Project:** 202340830-MahaAlsubaie-assignment1
**Author:** Maha Alsubaie (202340830)

## 1. Technologies Used

- **HTML5** — semantic page structure (`header`, `main`, `section`, `footer`, `nav`, `form`)
- **CSS3** — CSS custom properties (variables), Flexbox, CSS Grid, media queries,
  transitions, and `prefers-color-scheme` support
- **Vanilla JavaScript (ES5+/ES6)** — no frameworks, no libraries, no build tools
- No backend, no npm packages, no React/Bootstrap/Tailwind — everything runs
  directly in the browser from static files

## 2. Main Page Structure (`index.html`)

The homepage is organized into four main sections inside `<main>`:

1. **Hero (`#hero`)** — logo, navigation, page title, short introduction, and an
   "Explore My Work" call-to-action button that scrolls to the projects section.
2. **About (`#about`)** — a short personal introduction and a skills list
   rendered as pastel "pill" tags.
3. **Projects (`#projects`)** — a responsive grid of folder-style cards. Each
   card is a full `<a>` element linking to its own detail page in `/projects/`.
4. **Contact (`#contact`)** — a form with Name, Email, and Message fields, each
   with a `<label>` and the `required` attribute for built-in HTML validation.

A sticky `<header>` sits above all sections and contains the logo, in-page
navigation links, and the dark/light mode toggle button.

## 3. CSS Organization (`css/styles.css`)

The stylesheet is organized top-to-bottom as:

1. **CSS variables** — one `:root` block for the light theme and one
   `body[data-theme="dark"]` block that overrides the same variable names for
   dark mode. Every color used across the site (backgrounds, text, shadows,
   and the six pastel folder colors) is defined once as a variable, so the
   whole theme can flip by swapping variable values.
2. **Reset & base styles** — box-sizing, typography defaults, and container
   width rules.
3. **Component sections** — header/navigation, hero, about, project folder
   cards, contact form, footer, and project detail page styles, each grouped
   under a clearly commented block.
4. **Responsive rules** — media queries at the bottom of the file for tablet
   (`≤ 860px`) and mobile (`≤ 600px`) breakpoints.

Layout relies on:
- **CSS Grid** for the `.projects-grid` (auto-fit columns that reflow from two
  columns down to one on narrow screens).
- **Flexbox** for the navigation bar, skills pill list, and form field layout.

## 4. JavaScript Behavior (`js/script.js`)

The script is wrapped in an IIFE (`(function () { ... })();`) and split into
three independent, null-checked blocks so the same file can be safely included
on every page (`index.html` and both project detail pages) without throwing
errors when an element isn't present:

1. **Theme toggle** — reads a saved theme from `localStorage`; if none exists,
   it falls back to the user's OS-level `prefers-color-scheme`. Clicking the
   toggle button flips `data-theme` on `<body>` and persists the new value to
   `localStorage`.
2. **Smooth scrolling** — attaches a click handler to every `a[href^="#"]`
   link that calls `scrollIntoView({ behavior: "smooth" })` on the matching
   section.
3. **Contact form handling** — listens for the form's `submit` event, calls
   `preventDefault()` so no page reload or network request happens, runs the
   browser's built-in validation (`checkValidity()` / `reportValidity()`), and
   then reveals a success message and resets the form fields.

Every `document.getElementById` / `querySelector` result is checked for
`null` before an event listener is attached, which is what keeps the console
error-free on pages that don't contain every element (for example, the
project detail pages have no contact form).

## 5. Responsive Design Decisions

- A **mobile-first-friendly** grid (`repeat(auto-fit, minmax(280px, 1fr))`)
  lets the project cards reflow naturally without extra media queries for
  most screen sizes.
- **Two breakpoints** (860px and 600px) reduce heading sizes, section
  padding, and navigation spacing so text never feels cramped on small
  screens.
- **Images use `object-fit: cover`** inside fixed-aspect-ratio containers, so
  project thumbnails and detail-page hero images stay well-cropped at any
  width.
- Decorative hero shapes are hidden below 700px to avoid clutter on small
  screens.

## 6. How Project Detail Pages Work

Each file in `/projects/` (`seraj.html`, `gsr-hackathon.html`) is a standalone
HTML page that:

- Links back to the shared stylesheet with a relative path (`../css/styles.css`)
  and the shared script (`../js/script.js`), and shows an image from
  `../assets/images/`.
- Repeats the same header/navigation markup as the homepage, with links back
  to `index.html`'s sections (e.g. `../index.html#projects`).
- Includes a **"Back to Projects"** button at the top that returns the user
  to the homepage's projects section.
- Displays the project's image, followed by four content blocks: **Overview**,
  **Key Features**, **Tools**, and **My Contribution**.

Because the detail pages reuse `script.js` as-is, the theme toggle and smooth
scrolling continue to work identically across the whole site, while the
absence of a contact form on these pages is handled gracefully by the null
checks described above.
