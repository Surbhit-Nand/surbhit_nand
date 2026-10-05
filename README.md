# Surbhit's E-Portfolio

Welcome to my e-portfolio. This repository contains my academic work, software projects, technical skills, and ongoing development as a computing student and software developer.

## About Me

I am Surbhit Nand, a computing student interested in full-stack development, software engineering, databases, authentication, and building practical applications that solve real-world problems.

This portfolio is a central place to document my learning journey, showcase selected projects, and reflect on the skills I develop through coursework and independent work.

## Featured Projects

### IslandCart — E-Commerce Platform

A full-stack e-commerce platform with customer and vendor functionality, including product browsing, carts, wishlists, notes, CRUD product flows with vendor ownership checks, role-based access control, and authentication. Migrated from flat JSON storage to PostgreSQL (Neon).

- Repository: [E-Commerce](https://github.com/Surbhit-Nand/E-Commerce)
- Live demo: [E-Commerce Island Cart](https://e-commerce-island-cart.vercel.app)
- Technologies: React, TypeScript, Node.js/Express, PostgreSQL (Neon)

### Computing Project Dashboard

A project involving authenticated dashboards and role-based functionality for different users.

- Repository: [IS314-Computing-Project](https://github.com/Surbhitnand001/IS314-Computing-Project)
- Technologies: Clerk authentication, Neon database, web application development

### Central Buses

A transport-focused application supporting navigation, live tracking, ticket purchasing, and wallet payments.

- Repository: [Central-Buses](https://github.com/Surbhit-Nand/Central-Buses)
- Technologies: JavaScript, application routing, payment and wallet features

### Weather Forecast

A weather application that displays forecast information through a simple web interface.

- Repository: [Weather-Forecast](https://github.com/Surbhit-Nand/Weather-Forecast)

### TCP-Based File Transfer

A Python socket-programming application for chunked binary file transfer with progress tracking and error handling for reliable, resumable transfers over TCP.

- Repository: [TCP_FileTransfer](https://github.com/Surbhit-Nand/TCP_FileTransfer)
- Technologies: Python, sockets, TCP, binary protocols

## Skills

- **Languages:** Java, Python, TypeScript, JavaScript, PowerShell
- **Frontend:** React, HTML, CSS, responsive UI development
- **Backend and data:** Node.js, Express, PostgreSQL, Neon, Drizzle ORM, APIs, authentication, Clerk
- **Tools:** Git, GitHub, GitHub Actions, Vite, Vercel, Postman, Figma, JUnit 5, Selenium
- **Practices:** Agile/Scrum development, debugging, refactoring, documentation, testing, collaborative development

## Portfolio Sections

The completed portfolio will include:

- About me and education
- Technical skills
- Featured projects
- Academic achievements and coursework
- Work experience and extracurricular activities
- Reflections and lessons learned
- Contact information and professional links

## Goals

I am continuing to improve my software engineering skills by building complete applications, writing maintainable code, learning new technologies, and documenting my progress.

## Contact

- GitHub: [@Surbhit-Nand](https://github.com/Surbhit-Nand)
- LinkedIn: [surbhit-nand](https://www.linkedin.com/in/surbhit-nand)
- Email: [surbhitnand@gmail.com](mailto:surbhitnand@gmail.com)

## Status

The portfolio site is built with Vite + React and lives in this repo
(`src/`, `index.html`, `package.json`). See [TODO.md](TODO.md) for what is
done and what still needs real content (photos, screenshots, CV, links).

- Live URL: not deployed yet — add it here after the first deploy.
- Verify: `npm run format:check && npm run lint && npm test && npm run build`
- CI runs the same checks on every push (`.github/workflows/ci.yml`).

## Running the site

- `npm install`, then `npm run dev` (usually http://localhost:5173/).
- Project pages: `#/project/<slug>` (e.g. `#/project/e-commerce`).
- Hidden admin: `#/admin` — no link points to it. First visit sets a
  browser-local PIN; add repos and Google Photos image addresses
  (right-click a photo, "Copy image address"), Save preview, Export JSON,
  paste into `src/data/projects.js`, redeploy to publish.
- CV: `public/Surbhit_Nand_CV.pdf`, linked from the hero and contact section.
