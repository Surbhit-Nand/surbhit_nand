# AGENTS.md

Vite + React portfolio (chosen by owner). Commands: `npm run dev`, `npm run build`, `npm run lint` (oxlint). No tests, CI, or backend.

## Sources of truth

- `README.md` is the content contract. `TODO.md` is the execution checklist. Follow both strictly.
- README identity: Surbhit Nand, computing student focused on full-stack development, software engineering, databases, authentication, and practical real-world applications.
- README featured projects (do not rename, drop, or invent others without asking):
  - E-Commerce Application (`Surbhitnand001/E-Commerce`, live: e-commerce-island-cart.vercel.app) — TypeScript, React, DB, auth
  - Computing Project Dashboard (`Surbhitnand001/IS314-Computing-Project`) — Clerk auth, Neon DB, role-based dashboards
  - Central Buses (`Surbhitnand001/Central-Buses`) — JavaScript, routing, live tracking, tickets, wallet payments
  - Weather Forecast (`Surbhitnand001/Weather-Forecast`) — simple forecast web UI
- README skills and Portfolio Sections lists are normative: any Skills section must cover languages, frontend, backend/data, tools, practices from README; the finished portfolio must contain all 7 sections (about/education, skills, projects, achievements/coursework, experience/extracurriculars, reflections, contact/links).

## Strict TODO workflow

- Work `TODO.md` top-to-bottom: High Priority -> Project Documentation -> Design and UX -> Technical Improvements -> Content and Reflection -> Final Review.
- Do not skip ahead to a later section while earlier boxes are unchecked unless the user explicitly orders it.
- Complete one checklist item at a time with a verifiable change; flip its box from `- [ ]` to `- [x]` in the same change. Never batch-check or mark items done without the corresponding content/code existing.
- Keep `README.md` in sync: project links, skills, Portfolio Sections, and final live URL must match what was built.
- Final Review is the release gate: all links tested, responsive on mobile/tablet/desktop, accessibility + performance checked, placeholders removed, spelling reviewed, README live URL set.

## Project data and hidden admin

- Project content lives in `src/data/projects.js` (one object per repo: `slug, name, tech, summary, decisions, lessons, contribution, caseStudy, repo, live, gallery`). Edit that file to change what visitors see.
- Hidden admin at `#/admin` (hash route, no router dep). No link points to it; it sets `noindex` + a separate title at runtime. First visit sets a browser-local PIN (SHA-256, localStorage only, never in the bundle); later visits verify it.
- Admin saves to localStorage for instant preview only. To publish for all visitors: Export JSON in admin → paste into `src/data/projects.js` → `npm run build` → deploy. There is no backend yet; `src/admin/store.js` is the single swap point if one is added later.
- Images are URL strings, not uploads. Require Google Photos **direct** image addresses (`lh3.googleusercontent.com/…` via right-click → Copy image address); album/share links will not render. `checkImageUrl` in `store.js` warns on these; gallery drops failed loads via `onError` fallback.
- Each dossier has a `View details` toggle (`aria-expanded`) revealing contribution, case study, and gallery (lead image + thumbnail row). Keep new projects in the same shape so the strict TODO order holds: only check a screenshot/case-study box once its real content exists.

## Guardrails

- Do not introduce a backend, router, or new dependency without asking (`store.js` is the agreed swap point; hash routing is intentional).
- `README.md` still has placeholders (LinkedIn, email) and no real photo/CV. Leave them intact unless the user supplies real values.
- Verify with `git status` / `git diff` before committing; there are no automated checks to rely on.
