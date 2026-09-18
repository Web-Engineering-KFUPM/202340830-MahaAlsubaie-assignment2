# AI Usage Report

**Project:** 202340830-MahaAlsubaie-assignment1
**Author:** Maha Alsubaie (202340830)

## 1. Which AI Tool Was Used

I used **Claude** (Anthropic) as an assistant while building this portfolio
assignment.

## 2. What AI Helped With

- Scaffolding the overall folder structure (`index.html`, `css/`, `js/`,
  `assets/images/`, `projects/`, `docs/`) to match the assignment requirements.
- Drafting the initial HTML markup for the homepage and the two project
  detail pages, including semantic sections and accessible form labels.
- Building the pastel folder-card CSS design system (colors, folder tabs,
  rounded cards, shadows) using CSS variables so light/dark mode could share
  one set of rules.
- Writing the JavaScript for the theme toggle, smooth scrolling, and contact
  form success message, including the null-check pattern that keeps the
  script error-free across pages that don't share every element.
- Drafting the first pass of this documentation (README, technical
  documentation, and this report) based on the finished code.

## 3. Benefits

- Saved significant time on repetitive boilerplate (page structure, repeated
  header/footer markup across three HTML pages).
- Helped keep the CSS organized and consistent (e.g. one variable system
  driving both the light and dark themes instead of duplicated color values).
- Made it easier to catch small but important details, like adding `required`
  attributes and labels to form fields, and using `loading="lazy"` on images.

## 4. Challenges

- AI-generated code needed to be checked carefully for consistency between
  files — for example, making sure the relative paths in the project detail
  pages (`../css/styles.css`, `../assets/images/...`) actually matched the
  real folder structure, since a small path mistake would break the whole
  page.
- I had to review the generated JavaScript closely to make sure every
  `document.getElementById` call was properly null-checked before adding
  event listeners, since the same script file is shared across pages that
  don't all contain the same elements (e.g. the contact form only exists on
  the homepage).

## 5. What I Changed and Understood Myself

- I reviewed every section of HTML, CSS, and JavaScript to confirm I could
  explain what each part does — from how CSS variables cascade into the
  dark-mode override, to how `scrollIntoView` and `localStorage` work in the
  JavaScript file.
- I adjusted the wording of the About Me and project description text so it
  reflects my own voice and the specific points required by the assignment
  (curiosity, creativity, purposeful coding, learning by doing, collaboration,
  and continuous growth).
- I verified the folder structure, image paths, and internal links matched
  exactly what the assignment specified, and tested the site in the browser
  to confirm there were no console errors and that the layout worked across
  desktop, tablet, and mobile widths.

## 6. Responsible Use of AI

I used AI as a drafting and organizing tool, not as a replacement for
understanding the work. Every file was read, tested, and edited by me before
being considered final, and I made sure I could explain the reasoning behind
the structure, styling, and scripting choices in this project. No AI-generated
content was submitted without review, and the final descriptions and
documentation reflect my own understanding of what was built and why.
