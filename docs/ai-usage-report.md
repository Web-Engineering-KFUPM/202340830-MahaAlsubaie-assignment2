# AI Usage Report

**Project:** 202340830-MahaAlsubaie-assignment2
**Author:** Maha Alsubaie (202340830)

> **BEFORE YOU SUBMIT:** every line marked **TODO (Maha)** must be filled in with
> your own words, then the marker deleted. The declaration at the bottom is only
> true if this report is complete and you understand the code. Delete this
> note too.

## 1. AI Tools Used

| Tool | Model | How it was used |
|---|---|---|
| Claude (Anthropic) | Claude Sonnet 5.5 | Planning and drafting the new features, reworking `js/script.js`, writing CSS, drafting documentation, writing a browser test script, and suggesting further improvements |

No other AI tool was used. **TODO (Maha): if you also used Copilot, ChatGPT or
anything else (even autocomplete), add it here and in the log. Undeclared use
counts as plagiarism.**

## 2. Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|----------------|------------------------------------------|
| C01 | Claude (Claude Sonnet 5.5) | 2026-10-24 | Starting from my Assignment 1 code, add (1) project filter and live search, (2) personalised greeting saved in `localStorage`, (3) scroll animations and hover effects. Also asked for further suggestions. Claude copied the Assignment 1 files into a new folder, rewrote `script.js` in ES6+, added the HTML/CSS, fixed two small issues it found (a typo "WordPrees" in the GSR page, the sticky header covering section labels), and drafted the README and technical documentation. | `index.html`, `css/styles.css`, `js/script.js`, `projects/seraj.html`, `projects/gsr-hackathon.html`, `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md`, `.gitignore` | **Verified in the AI session:** 87 scripted browser checks (Playwright, Chromium) passed: greeting, validation, persistence, filter, search, empty state, scroll reveal, hover, reduced motion, JavaScript off, mobile width, no console errors. Screenshots at desktop, dark mode and 375 px were inspected.

 **TODO (Maha): describe what *you* changed after receiving this output (for example wording, colours, tags, messages, anything you rewrote) and how *you* verified it (which browsers/devices you tested, what you tried).** |


| A01 | Claude (Claude Sonnet 5.5) | 2026-10-24 | Browser test script used to check the features above. Not part of the repository. | none (kept in the evidence ZIP under `artifacts/`) | Run during the AI session; results are summarised in C01. **TODO (Maha): note whether you re-ran it or tested by hand instead.** |

**TODO (Maha): add a new row (C02, C03, …) for every further AI conversation
you have about this assignment, for example if you ask Claude to explain code
or fix something.**

C02 | I ask Clude to explain which parts have been changes or modifaide to implemnt it by my self and see the affect of erery change 

C03 | ChatGPT | 2026-10-25 | Suggested centering the About section and changing the skill-pill hover effect to enlarge slightly. | css/styles.css, index.html
## 3. How AI Supported the Work

- **Feature design:** the AI proposed how the filter, search and greeting should
  behave (for example: filter and search combine, the greeting uses the
  visitor's local time, names are validated and saved) and what feedback the
  user should get when something goes wrong.
- **Code generation:** the AI wrote the first version of the new JavaScript,
  CSS and HTML.
- **Debugging and review:** while testing, the AI noticed the search
  placeholder was cut off on mobile and the sticky header was hiding section
  labels, and fixed both.
- **Documentation:** the AI drafted the README and technical documentation.
- **Suggestions:** the AI listed further features that could be added later.

## 4. Understanding the Code

I can explain the following parts of my submission in my own words. 

- [ ] Why the visitor's name is inserted with `textContent` (inside `<bdi>`) and not `innerHTML`
- [ ] How `localStorage` is used, and why every access is wrapped in `try/catch`
- [ ] Why a saved name is validated *again* when the page loads
- [ ] How `validateName` works, including the `\p{L}` Unicode regex for Arabic names
- [ ] How a card is chosen to be shown: category check **and** every search word must match
- [ ] Why the search text is built once, up front, in a `Map`
- [ ] What `IntersectionObserver` does and why `unobserve` is called after the first reveal
- [ ] Why the reveal is a `@keyframes` animation with `fill-mode: backwards` and not a transition (so the card hover lift still works)
- [ ] What the `js` class on `<html>` is for, and what happens with JavaScript disabled
- [ ] Why `[hidden] { display: none !important; }` is needed
- [ ] What `prefers-reduced-motion` does here
- [ ] How the `aria-live`, `aria-pressed` and `role="alert"` attributes help screen reader users

## 5. Benefits and Challenges

**TODO (Maha): write a few honest sentences in your own words about what the AI
helped with, what was difficult or wrong, and what you learned. Examples of
things you could comment on: anything you had to correct, anything that did not
work the first time on your machine, or a concept you understand better now.**

Ai helped to transfer the ideas into code, it was challenging to handel program with larg number of lines. Also Ai provieds the base line code. A challenge was to make sure that the program is will integrated with the last version.


## 6. Evidence

The **AI Evidence ZIP** (`202340830-MahaAlsubaie-assignment2-ai-evidence.zip`),
submitted on Blackboard with the repository link, contains:

- `conversations/`: the complete, unedited export of every AI conversation
  (https://claude.ai/share/01d59129-576e-4fde-affe-713bf2f8f0ce)
- `artifacts/`: the files exactly as the AI produced them, before my edits

The ZIP and the logs are **not** committed to the repository.

Commits that contain AI-assisted code credit the AI in the message, for example:

```
Add project filter and live search

Assisted-by: Claude (Claude Sonnet 5.5)
```

## 7. Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Maha Alsubaie
**ID:** 202340830
**Date:** 24-Oct-2026
