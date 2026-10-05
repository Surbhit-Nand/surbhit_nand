import { useState } from 'react';

export default function Gallery({ gallery, projectName }) {
  const [lead, setLead] = useState(0);
  const [failed, setFailed] = useState({});
  if (!gallery.length) return null;
  const visible = gallery.filter((_, i) => !failed[i]);
  if (!visible.length)
    return <p className="note">Images could not be loaded — check the image URLs.</p>;
  const current = visible[Math.min(lead, visible.length - 1)];
  const currentIndex = gallery.indexOf(current);

  return (
    <div className="gallery">
      <figure className="gallery-lead">
        <img src={current.src} alt={current.alt || `${projectName} screenshot`} loading="lazy" />
        {current.caption && <figcaption>{current.caption}</figcaption>}
      </figure>
      {visible.length > 1 && (
        <div className="thumb-row" role="group" aria-label={`${projectName} screenshots`}>
          {visible.map((g) => {
            const i = gallery.indexOf(g);
            return (
              <button
                key={i}
                type="button"
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
            );
          })}
        </div>
      )}
    </div>
  );
}
