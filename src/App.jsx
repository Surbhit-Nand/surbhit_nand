import { useEffect, useState } from 'react';
import './App.css';
import { projects as seedProjects } from './data/projects.js';
import { loadProjects } from './admin/store.js';
import { validateContact } from './contactValidate.js';
import Admin from './admin/Admin.jsx';
import ProjectDetail, { ProjectNotFound, SiteNotFound } from './ProjectDetail.jsx';

const skillGroups = [
  { name: 'Languages', items: 'JavaScript, TypeScript, Python, Java' },
  { name: 'Frontend', items: 'React, HTML, CSS, responsive UI development' },
  {
    name: 'Backend and data',
    items: 'APIs, authentication, databases, server-side application logic',
  },
  { name: 'Tools', items: 'Git, GitHub, GitHub Actions, Vite, Vercel' },
  {
    name: 'Practices',
    items: 'Agile development, debugging, refactoring, documentation, collaborative development',
  },
];

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function Section({ id, labelledBy, kicker, title, children }) {
  return (
    <section className="block" id={id} aria-labelledby={labelledBy}>
      <p className="kicker">{kicker}</p>
      <h2 id={labelledBy}>{title}</h2>
      {children}
    </section>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <label htmlFor="cf-name">Name</label>
      <input
        id="cf-name"
        name="name"
        autoComplete="name"
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
      />
      <p className="error" role={errors.name ? 'alert' : undefined}>
        {errors.name ?? ''}
      </p>

      <label htmlFor="cf-email">Email</label>
      <input
        id="cf-email"
        name="email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />
      <p className="error" role={errors.email ? 'alert' : undefined}>
        {errors.email ?? ''}
      </p>

      <label htmlFor="cf-message">Message</label>
      <textarea
        id="cf-message"
        name="message"
        rows="4"
        value={values.message}
        onChange={(e) => setValues({ ...values, message: e.target.value })}
      />
      <p className="error" role={errors.message ? 'alert' : undefined}>
        {errors.message ?? ''}
      </p>

      <button className="btn btn-solid" type="submit">
        Send message
      </button>
      {sent && (
        <p className="sent">
          Message validated. Wire this form to your inbox or mail link before release.
        </p>
      )}
    </form>
  );
}

function Dossier({ project }) {
  const count = (project.gallery || []).length;
  const preview = (project.gallery || [])[0];

  return (
    <article className="dossier">
      <div className="dossier-top">
        <div className="dossier-main">
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <p className="tech">{project.tech}</p>
          <ul>
            <li>
              <strong>Decision:</strong> {project.decisions}
            </li>
            <li>
              <strong>Lesson:</strong> {project.lessons}
            </li>
          </ul>
          {preview ? (
            <a className="dossier-thumb" href={`#/project/${project.slug}`}>
              <img src={preview.src} alt="" loading="lazy" />
              <span>
                {count} screenshot{count === 1 ? '' : 's'} — open the write-up
              </span>
            </a>
          ) : (
            <p className="note">Screenshots coming soon — tracked in TODO.md.</p>
          )}
          <a className="btn btn-line btn-small detail-toggle" href={`#/project/${project.slug}`}>
            View details
          </a>
        </div>
        <div className="dossier-side">
          <div className="links">
            <a href={project.repo}>Repository</a>
            {project.live && <a href={project.live}>Live demo</a>}
          </div>
          <p className="note">
            {project.live
              ? 'Live deployment available — try it before reading the code.'
              : 'No live deployment linked yet — the repo is the source of truth.'}
          </p>
        </div>
      </div>
    </article>
  );
}

function setNoIndex(on) {
  const id = 'robots-noindex';
  let tag = document.getElementById(id);
  if (on && !tag) {
    tag = document.createElement('meta');
    tag.id = id;
    tag.name = 'robots';
    tag.content = 'noindex, nofollow';
    document.head.appendChild(tag);
  } else if (!on && tag) {
    tag.remove();
  }
}

export default function App() {
  const hash = useHashRoute();
  const isAdmin = hash.startsWith('#/admin');
  const [navOpen, setNavOpen] = useState(() => window.innerWidth > 900);
  const [projects, setProjects] = useState(() => {
    try {
      return loadProjects();
    } catch {
      return seedProjects;
    }
  });

  useEffect(() => {
    setNoIndex(isAdmin);
    if (isAdmin) document.title = 'Admin — Surbhit Nand';
    else if (!hash.startsWith('#/project/')) document.title = 'Surbhit Nand — E-Portfolio';
  }, [isAdmin, hash]);

  useEffect(() => {
    // Reload after leaving admin so freshly saved local edits show, and
    // scroll home views to top. Section anchors (#about, …) keep native
    // jump behavior. Runs on the hash event, not on render.
    const onRouteChange = (event) => {
      const nextHash = new URL(event.newURL).hash;
      if (!nextHash.startsWith('#/admin')) {
        try {
          setProjects(loadProjects());
        } catch {
          /* keep current */
        }
      }
      if (nextHash === '' || nextHash === '#/') window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onRouteChange);
    return () => window.removeEventListener('hashchange', onRouteChange);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function closeNavOnMobile() {
    if (window.innerWidth <= 900) setNavOpen(false);
  }

  if (isAdmin) {
    return (
      <div className="shell-admin">
        <Admin
          initial={projects}
          onExit={() => {
            window.location.hash = '#/';
          }}
        />
      </div>
    );
  }

  if (hash.startsWith('#/project/')) {
    const slug = hash.replace('#/project/', '').split(/[?#]/)[0];
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) {
      return (
        <div className="shell shell-detail">
          <ProjectNotFound />
        </div>
      );
    }
    const project = projects[index];
    return (
      <div className="shell shell-detail">
        <ProjectDetail
          project={project}
          prev={index > 0 ? projects[index - 1] : null}
          next={index < projects.length - 1 ? projects[index + 1] : null}
        />
      </div>
    );
  }

  if (hash.startsWith('#/') && !isAdmin && !hash.startsWith('#/project/')) {
    return (
      <div className="shell shell-detail">
        <SiteNotFound />
      </div>
    );
  }

  return (
    <div className={navOpen ? 'shell nav-open' : 'shell'}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={navOpen}
        aria-controls="site-rail"
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setNavOpen((v) => !v)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <button
        type="button"
        className="scrim"
        aria-label="Close navigation"
        tabIndex={navOpen ? 0 : -1}
        onClick={() => setNavOpen(false)}
      />
      <aside className="rail" id="site-rail" aria-label="Portfolio index">
        <div className="wordmark">
          Surbhit Nand<span>Computing student · full-stack systems</span>
        </div>
        <nav aria-label="Sections" onClick={closeNavOnMobile}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#coursework">Coursework</a>
          <a href="#reflection">Reflections</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="status">Under development — see TODO.md for the checklist.</p>
      </aside>

      <main className="main" id="main-content">
        <header className="hero" id="home">
          <div className="hero-top">
            <div
              className="portrait-swap"
              tabIndex={0}
              role="img"
              aria-label="Portrait of Surbhit Nand — hover or focus to see another photo"
            >
              <img
                className="portrait portrait-base"
                src="/profile.jpg"
                alt=""
                width="480"
                height="640"
                loading="eager"
              />
              <img
                className="portrait portrait-alt"
                src="/Profile2.png"
                alt=""
                width="181"
                height="190"
                loading="eager"
              />
            </div>
            <div>
              <h1>I build working software, then write down what I learned.</h1>
              <p className="lede">
                Computing student focused on full-stack development, databases, and authentication.
                Four shipped projects below — each with real repos, decisions, and lessons.
              </p>
            </div>
          </div>
          <div className="cta-row">
            <a className="btn btn-solid" href="#projects">
              View projects
            </a>
            <a className="btn btn-line" href="#contact">
              Get in touch
            </a>
          </div>

          <div className="board" aria-label="Systems at a glance">
            <header>
              <span>
                <span className="pulse" aria-hidden="true" />
                Harbour board — systems at a glance
              </span>
              <span>{projects.length} projects</span>
            </header>
            <div className="rows">
              <div className="cell">
                <b>Commerce</b>
                <small>Carts · vendors · auth</small>
              </div>
              <div className="cell">
                <b>Dashboards</b>
                <small>Roles · Clerk · Neon</small>
              </div>
              <div className="cell">
                <b>Transit</b>
                <small>Tracking · tickets · wallet</small>
              </div>
              <div className="cell">
                <b>Weather</b>
                <small>Forecast · simple UI</small>
              </div>
            </div>
          </div>
        </header>

        <Section
          id="about"
          labelledBy="about-h"
          kicker="About me and education"
          title="Practical applications, documented as I go"
        >
          <p>
            I am Surbhit Nand, a computing student interested in full-stack development, software
            engineering, databases, and authentication. This portfolio is where I document my
            learning journey, showcase selected work, and reflect on the skills I build through
            coursework and independent projects.
          </p>
          <div className="two-col">
            <article>
              <h3>Education</h3>
              <p>Degree, institution, and expected graduation — to be added.</p>
            </article>
            <article>
              <h3>How I work</h3>
              <p>
                Build complete applications, keep code maintainable, debug systematically, and write
                down decisions and lessons learned.
              </p>
            </article>
          </div>
        </Section>

        <Section
          id="skills"
          labelledBy="skills-h"
          kicker="Technical skills"
          title="The stack I reach for"
        >
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <article key={group.name}>
                <h3>{group.name}</h3>
                <p>{group.items}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          labelledBy="projects-h"
          kicker="Featured projects"
          title="Four systems, each with a paper trail"
        >
          <p>
            Every project links to its repository. Live deployments are linked where they exist;
            open a dossier for the case study and screenshots.
          </p>
          {projects.map((project) => (
            <Dossier key={project.slug} project={project} />
          ))}
        </Section>

        <Section
          id="coursework"
          labelledBy="course-h"
          kicker="Achievements and experience"
          title="Coursework, work, and life outside code"
        >
          <div className="two-col">
            <article>
              <h3>Academic achievements and coursework</h3>
              <p>Relevant modules and achievements — to be added.</p>
            </article>
            <article>
              <h3>Work experience and extracurriculars</h3>
              <p>Roles, volunteering, and collaboration — to be added.</p>
            </article>
          </div>
        </Section>

        <Section
          id="reflection"
          labelledBy="refl-h"
          kicker="Reflections and lessons learned"
          title="How I debug, collaborate, and improve"
        >
          <div className="two-col">
            <article>
              <h3>Problem solving</h3>
              <p>
                Reproduce first, narrow the scope, check the data layer, then the auth layer — and
                write the fix down so it stays fixed.
              </p>
            </article>
            <article>
              <h3>Teamwork and goals</h3>
              <p>
                Still writing: collaboration style, career goals, and per-project retrospectives.
                Tracked in TODO.md under Content and Reflection.
              </p>
            </article>
          </div>
        </Section>

        <Section
          id="contact"
          labelledBy="contact-h"
          kicker="Contact and professional links"
          title="Say hello"
        >
          <p>
            GitHub: <a href="https://github.com/Surbhitnand001">@Surbhitnand001</a>. LinkedIn and
            professional email are added on request — use the form and it validates before sending.
          </p>
          <ContactForm />
        </Section>

        <footer className="colophon">
          Built with Vite + React. Design: harbour ledger — ink, lagoon, and signal amber. One
          validated form, one animated board pulse, nothing else moves on its own.
        </footer>
      </main>
    </div>
  );
}
