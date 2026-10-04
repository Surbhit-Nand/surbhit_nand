import { useState } from 'react'
import {
  checkImageUrl,
  clearLocalOverride,
  exportProjectsJSON,
  hasLocalOverride,
  hasPin,
  saveProjectsLocal,
  setPin,
  verifyPin,
} from './store.js'

const blankProject = () => ({
  slug: `project-${Date.now()}`,
  name: '',
  tech: '',
  summary: '',
  decisions: '',
  lessons: '',
  contribution: '',
  caseStudy: '',
  repo: '',
  live: '',
  gallery: [],
})

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

function PinGate({ onUnlock }) {
  const [pin, setPinValue] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const setup = !hasPin()

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (pin.length < 6) {
      setError('PIN must be at least 6 characters.')
      return
    }
    if (setup) {
      if (pin !== confirm) {
        setError('PINs do not match.')
        return
      }
      await setPin(pin)
      onUnlock()
    } else if (await verifyPin(pin)) {
      onUnlock()
    } else {
      setError('Wrong PIN.')
    }
  }

  return (
    <form className="admin-pin" onSubmit={submit}>
      <h1>Admin</h1>
      <p>{setup ? 'Set an admin PIN for this browser.' : 'Enter the admin PIN.'}</p>
      <label htmlFor="admin-pin">PIN</label>
      <input
        id="admin-pin"
        type="password"
        autoComplete="off"
        value={pin}
        onChange={(e) => setPinValue(e.target.value)}
      />
      {setup && (
        <>
          <label htmlFor="admin-confirm">Confirm PIN</label>
          <input
            id="admin-confirm"
            type="password"
            autoComplete="off"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-solid" type="submit">
        {setup ? 'Set PIN' : 'Unlock'}
      </button>
    </form>
  )
}

function GalleryEditor({ gallery, onChange }) {
  function update(index, field, value) {
    onChange(gallery.map((g, i) => (i === index ? { ...g, [field]: value } : g)))
  }

  return (
    <div className="gallery-editor">
      <h3>Images (Google Photos direct links)</h3>
      <p className="hint">
        Open the photo, right-click, “Copy image address” — it looks like
        lh3.googleusercontent.com/… Album or share links will not display.
      </p>
      {gallery.map((g, i) => {
        const warning = g.src ? checkImageUrl(g.src) : ''
        return (
          <div className="gallery-row" key={i}>
            <label>
              Image URL
              <input
                value={g.src}
                placeholder="https://lh3.googleusercontent.com/…"
                onChange={(e) => update(i, 'src', e.target.value)}
              />
            </label>
            {warning && <p className="warn">{warning}</p>}
            <label>
              Alt text (required)
              <input
                value={g.alt}
                placeholder="E-commerce cart page showing…"
                onChange={(e) => update(i, 'alt', e.target.value)}
              />
            </label>
            <label>
              Caption
              <input
                value={g.caption}
                placeholder="Cart with vendor items"
                onChange={(e) => update(i, 'caption', e.target.value)}
              />
            </label>
            {g.src.startsWith('https://') && (
              <img className="thumb-preview" src={g.src} alt="" loading="lazy" />
            )}
            <button
              type="button"
              className="btn btn-line btn-small"
              onClick={() => onChange(gallery.filter((_, j) => j !== i))}
            >
              Remove image
            </button>
          </div>
        )
      })}
      <button
        type="button"
        className="btn btn-line btn-small"
        onClick={() => onChange([...gallery, { src: '', alt: '', caption: '' }])}
      >
        Add image
      </button>
    </div>
  )
}

function ProjectForm({ project, onChange }) {
  function set(field, value) {
    onChange({ ...project, [field]: value })
  }

  const fields = [
    ['name', 'Project name'],
    ['tech', 'Technologies'],
    ['repo', 'Repository URL'],
    ['live', 'Live demo URL (optional)'],
  ]

  return (
    <div className="project-form">
      {fields.map(([field, label]) => (
        <label key={field}>
          {label}
          <input
            value={project[field]}
            onChange={(e) => {
              const value = e.target.value
              if (field === 'name') {
                const auto = slugify(value)
                onChange({
                  ...project,
                  name: value,
                  slug: project.slug.startsWith('project-') || !project.slug ? auto || project.slug : project.slug,
                })
              } else set(field, value)
            }}
          />
        </label>
      ))}
      {[
        ['summary', 'Summary'],
        ['decisions', 'Key decision'],
        ['lessons', 'Lessons learned'],
        ['contribution', 'My contribution'],
        ['caseStudy', 'Case study'],
      ].map(([field, label]) => (
        <label key={field}>
          {label}
          <textarea rows="2" value={project[field]} onChange={(e) => set(field, e.target.value)} />
        </label>
      ))}
      <GalleryEditor gallery={project.gallery} onChange={(g) => set('gallery', g)} />
    </div>
  )
}

export default function Admin({ initial, onExit }) {
  const [unlocked, setUnlocked] = useState(false)
  const [list, setList] = useState(initial)
  const [selected, setSelected] = useState(0)
  const [saved, setSaved] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />

  const current = list[selected]

  function save() {
    saveProjectsLocal(list)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <h1>Projects admin</h1>
          <p>
            {hasLocalOverride()
              ? 'Previewing your local edits. Export and commit to publish for all visitors.'
              : 'Editing the published list. Save to preview locally.'}
          </p>
        </div>
        <div className="admin-actions">
          <button className="btn btn-solid" type="button" onClick={save}>
            Save preview
          </button>
          <button className="btn btn-line" type="button" onClick={() => setExportOpen((v) => !v)}>
            {exportOpen ? 'Hide export' : 'Export JSON'}
          </button>
          <a className="btn btn-line" href="#/">
            Back to site
          </a>
        </div>
      </header>
      {saved && (
        <p className="sent" role="status">
          Saved in this browser. Export the JSON below and paste it into
          src/data/projects.js to publish.
        </p>
      )}
      {exportOpen && (
        <div className="export-box">
          <textarea readOnly rows="10" value={exportProjectsJSON(list)} />
          <div className="admin-actions">
            <button
              className="btn btn-line btn-small"
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(exportProjectsJSON(list))
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                } catch {
                  /* clipboard unavailable */
                }
              }}
            >
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
            <button
              className="btn btn-line btn-small"
              type="button"
              onClick={() => {
                clearLocalOverride()
                onExit()
              }}
            >
              Discard local edits
            </button>
          </div>
        </div>
      )}
      <div className="admin-body">
        <nav className="admin-list" aria-label="Projects">
          {list.map((p, i) => (
            <button
              key={p.slug + i}
              type="button"
              aria-current={i === selected}
              onClick={() => setSelected(i)}
            >
              {p.name || '(unnamed)'}
            </button>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={() => {
              setList([...list, blankProject()])
              setSelected(list.length)
            }}
          >
            + Add project
          </button>
        </nav>
        {current && (
          <div className="admin-edit">
            <ProjectForm
              project={current}
              onChange={(next) => setList(list.map((p, i) => (i === selected ? next : p)))}
            />
            <button
              type="button"
              className="btn btn-line btn-small danger"
              onClick={() => {
                if (list.length <= 1) return
                setList(list.filter((_, i) => i !== selected))
                setSelected(0)
              }}
            >
              Delete project
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
