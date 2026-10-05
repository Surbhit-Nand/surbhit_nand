import { useEffect, useRef } from 'react';
import Gallery from './Gallery.jsx';

export default function ProjectDetail({ project, prev, next }) {
  const headingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${project.name} — Surbhit Nand`;
    headingRef.current?.focus();
  }, [project]);

  return (
    <main className="main detail">
      <a className="btn btn-line btn-small" href="#/">
        Back to projects
      </a>
      <p className="kicker">Project detail</p>
      <h1 ref={headingRef} tabIndex={-1}>
        {project.name}
      </h1>
      <p className="lede">{project.summary}</p>
      <p className="tech">{project.tech}</p>
      <div className="cta-row">
        <a className="btn btn-solid" href={project.repo}>
          Repository
        </a>
        {project.live && (
          <a className="btn btn-line" href={project.live}>
            Live demo
          </a>
        )}
      </div>

      <div className="detail-gallery">
        <Gallery gallery={project.gallery || []} projectName={project.name} />
        {!(project.gallery || []).length && (
          <p className="note">Screenshots coming soon — tracked in TODO.md.</p>
        )}
      </div>

      <div className="detail-body">
        {project.contribution && (
          <section aria-label="What I built">
            <h2>What I built</h2>
            <p>{project.contribution}</p>
          </section>
        )}
        {project.decisions && (
          <section aria-label="How I built it">
            <h2>How I built it</h2>
            <p>{project.decisions}</p>
          </section>
        )}
        {(project.lessons || project.caseStudy) && (
          <section aria-label="What I would do differently">
            <h2>What I would do differently</h2>
            {project.lessons && <p>{project.lessons}</p>}
            {project.caseStudy && <p>{project.caseStudy}</p>}
          </section>
        )}
      </div>

      <nav className="detail-nav" aria-label="More projects">
        {prev ? (
          <a href={`#/project/${prev.slug}`}>
            <span className="nav-dir">Previous</span>
            <span className="nav-name">{prev.name}</span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={`#/project/${next.slug}`}>
            <span className="nav-dir">Next</span>
            <span className="nav-name">{next.name}</span>
          </a>
        )}
      </nav>
    </main>
  );
}

export function ProjectNotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Project not found — Surbhit Nand';
  }, []);

  return (
    <main className="main detail">
      <h1>Project not found</h1>
      <p>That project slug does not match anything in the portfolio.</p>
      <a className="btn btn-solid" href="#projects">
        Back to projects
      </a>
    </main>
  );
}

export function SiteNotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Page not found — Surbhit Nand';
  }, []);

  return (
    <main className="main detail">
      <p className="kicker">404</p>
      <h1>Nothing at this address</h1>
      <p>
        The page you asked for does not exist. The portfolio home and every project are one click
        away.
      </p>
      <div className="cta-row">
        <a className="btn btn-solid" href="#/">
          Go home
        </a>
        <a className="btn btn-line" href="#projects">
          View projects
        </a>
      </div>
    </main>
  );
}
