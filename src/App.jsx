import { useEffect, useState } from 'react'
import './App.css'
import { projects as seedProjects } from './data/projects.js'
import { loadProjects } from './admin/store.js'
import Admin from './admin/Admin.jsx'

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
    items:
      'Agile development, debugging, refactoring, documentation, collaborative development',
  },
]

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function validate(next) {
    const nextErrors = {}
    if (next.name.trim().length < 2) nextErrors.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim()))
      nextErrors.email = 'Enter a valid email address.'
    if (next.message.trim().length < 10)
      nextErrors.message = 'Write at least a sentence (10+ characters).'
    return nextErrors
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSent(true)
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
          Message validated. Wire this form to your inbox or mail link before
          release.
        </p>
      )}
    </form>
  )
}

function Gallery({ gallery, projectName }) {
  const [lead, setLead] = useState(0)
  const [failed, setFailed] = useState({})
  if (!gallery.length) return null
  const visible = gallery.filter((_, i) => !failed[i])
  if (!visible.length)
    return <p className="note">Images could not be loaded — check the image URLs.</p>
  const current = visible[Math.min(lead, visible.length - 1)]
  const currentIndex = gallery.indexOf(current)

  return (
    <div className="gallery">
      <figure className="gallery-lead">
        <img src={current.src} alt={current.alt || `${projectName} screenshot`} loading="lazy" />
        {current.caption && <figcaption>{current.caption}</figcaption>}
      </figure>
      {visible.length > 1 && (
        <div className="thumb-row" role="list">
          {visible.map((g) => {
            const i = gallery.indexOf(g)
            return (
              <button
                key={i}
                type="button"
                role="listitem"
                aria-label={`Show image ${i + 1}${g.caption ? `: ${g.caption}` : ''}`}
                aria-current={i === currentIndex}
                className="thumb"
                onClick={() => setLead(i)}
              >
                <img
                  src={g.src}
                  alt=""
                  loading="lazy"
                  onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Dossier({ project }) {
  const [open, setOpen] = useState(false)
  const id = `detail-${project.slug}`

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
          <button
            type="button"
            className="btn btn-line btn-small detail-toggle"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Hide details' : 'View details'}
          </button>
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
      {open && (
        <div className="dossier-detail" id={id}>
          {(project.contribution || project.caseStudy) && (
            <div className="detail-text">
              {project.contribution && (
                <p>
                  <strong>My contribution:</strong> {project.contribution}
                </p>
              )}
              {project.caseStudy && (
                <p>
                  <strong>Case study:</strong> {project.caseStudy}
                </p>
              )}
            </div>
          )}
          <Gallery gallery={project.gallery || []} projectName={project.name} />
          {!(project.gallery || []).length && (
            <p className="note">Screenshots coming soon — tracked in TODO.md.</p>
          )}
        </div>
      )}
    </article>
  )
}

function setNoIndex(on) {
  const id = 'robots-noindex'
  let tag = document.getElementById(id)
  if (on && !tag) {
    tag = document.createElement('meta')
    tag.id = id
    tag.name = 'robots'
    tag.content = 'noindex, nofollow'
    document.head.appendChild(tag)
  } else if (!on && tag) {
    tag.remove()
  }
}

export default function App() {
  const hash = useHashRoute()
  const isAdmin = hash.startsWith('#/admin')
  const [projects, setProjects] = useState(() => {
    try {
      return loadProjects()
    } catch {
      return seedProjects
    }
  })

  useEffect(() => {
    setNoIndex(isAdmin)
    document.title = isAdmin ? 'Admin — Surbhit Nand' : 'Surbhit Nand — E-Portfolio'
  }, [isAdmin])

  useEffect(() => {
    // Reload after leaving admin so freshly saved local edits show. This runs
    // on the hash event, not on render, so it is not a render cascade.
    const onAdminExit = (event) => {
      if (!event.newURL.includes('#/admin')) {
        try {
          setProjects(loadProjects())
        } catch {
          /* keep current */
        }
      }
    }
    window.addEventListener('hashchange', onAdminExit)
    return () => window.removeEventListener('hashchange', onAdminExit)
  }, [])

  if (isAdmin) {
    return (
      <div className="shell-admin">
        <Admin
          initial={projects}
          onExit={() => {
            window.location.hash = '#/'
          }}
        />
      </div>
    )
  }

  return (
    <div className="shell">
      <aside className="rail" aria-label="Portfolio index">
        <div className="wordmark">
          Surbhit Nand<span>Computing student · full-stack systems</span>
        </div>
        <nav aria-label="Sections">
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

      <main className="main">
        <header className="hero" id="home">
          <h1>I build working software, then write down what I learned.</h1>
          <p className="lede">
            Computing student focused on full-stack development, databases, and
            authentication. Four shipped projects below — each with real repos,
            decisions, and lessons.
          </p>
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

        <section className="block" id="about" aria-labelledby="about-h">
          <p className="kicker">About me and education</p>
          <h2 id="about-h">Practical applications, documented as I go</h2>
          <p>
            I am Surbhit Nand, a computing student interested in full-stack
            development, software engineering, databases, and authentication.
            This portfolio is where I document my learning journey, showcase
            selected work, and reflect on the skills I build through coursework
            and independent projects.
          </p>
          <div className="two-col">
            <article>
              <h3>Education</h3>
              <p>Degree, institution, and expected graduation — to be added.</p>
            </article>
            <article>
              <h3>How I work</h3>
              <p>
                Build complete applications, keep code maintainable, debug
                systematically, and write down decisions and lessons learned.
              </p>
            </article>
          </div>
        </section>

        <section className="block" id="skills" aria-labelledby="skills-h">
          <p className="kicker">Technical skills</p>
          <h2 id="skills-h">The stack I reach for</h2>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <article key={group.name}>
                <h3>{group.name}</h3>
                <p>{group.items}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="block" id="projects" aria-labelledby="projects-h">
          <p className="kicker">Featured projects</p>
          <h2 id="projects-h">Four systems, each with a paper trail</h2>
          <p>
            Every project links to its repository. Live deployments are linked
            where they exist; open a dossier for the case study and screenshots.
          </p>
          {projects.map((project) => (
            <Dossier key={project.slug} project={project} />
          ))}
        </section>

        <section className="block" id="coursework" aria-labelledby="course-h">
          <p className="kicker">Achievements and experience</p>
          <h2 id="course-h">Coursework, work, and life outside code</h2>
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
        </section>

        <section className="block" id="reflection" aria-labelledby="refl-h">
          <p className="kicker">Reflections and lessons learned</p>
          <h2 id="refl-h">How I debug, collaborate, and improve</h2>
          <div className="two-col">
            <article>
              <h3>Problem solving</h3>
              <p>
                Reproduce first, narrow the scope, check the data layer, then
                the auth layer — and write the fix down so it stays fixed.
              </p>
            </article>
            <article>
              <h3>Teamwork and goals</h3>
              <p>
                Still writing: collaboration style, career goals, and per-project
                retrospectives. Tracked in TODO.md under Content and Reflection.
              </p>
            </article>
          </div>
        </section>

        <section className="block" id="contact" aria-labelledby="contact-h">
          <p className="kicker">Contact and professional links</p>
          <h2 id="contact-h">Say hello</h2>
          <p>
            GitHub:{' '}
            <a href="https://github.com/Surbhitnand001">@Surbhitnand001</a>.
            LinkedIn and professional email are added on request — use the form
            and it validates before sending.
          </p>
          <ContactForm />
        </section>

        <footer className="colophon">
          Built with Vite + React. Design: harbour ledger — ink, lagoon, and
          signal amber. One validated form, one animated board pulse, nothing
          else moves on its own.
        </footer>
      </main>
    </div>
  )
}
