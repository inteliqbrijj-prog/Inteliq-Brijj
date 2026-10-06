import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export type OfferingItem = {
  id: string;
  title: string;
  description: string;
  pointsHead?: string;
  points: string[];
  image: string;
  path: string;
  cta?: string;
  accent?: string;
};

/**
 * Cyntexa-style offering: left nav + right content card.
 * Dense one-frame layout, 3D card surface, slower scroll sync.
 */
export default function CyntexaOfferingScroll({
  items,
  sectionLabel = 'Our Expertise',
  sectionTitle,
  sectionDesc,
}: {
  items: OfferingItem[];
  sectionLabel?: string;
  sectionTitle?: string;
  sectionDesc?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reducedRef = useRef(false);
  const activeRef = useRef(0);

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedRef.current) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      const raw = p * items.length;
      let idx = Math.min(items.length - 1, Math.floor(raw));
      const cur = activeRef.current;
      if (idx !== cur) {
        if (idx > cur && raw < idx + 0.4) idx = cur;
        if (idx < cur && raw > cur + 0.6) idx = cur;
      }
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  const current = items[active] ?? items[0];
  const accent = current?.accent || '#10b981';

  return (
    <section
      ref={sectionRef}
      className="cx-offering"
      style={
        {
          ['--accent' as string]: accent,
          height: reducedRef.current ? 'auto' : `calc(${items.length} * 95vh)`,
        } as React.CSSProperties
      }
    >
      <div
        className={
          reducedRef.current
            ? 'cx-offering-inner cx-offering-inner--static'
            : 'cx-offering-inner'
        }
      >
        {(sectionTitle || sectionLabel) && (
          <div className="cx-offering-intro">
            {sectionLabel && <p className="cx-offering-label">{sectionLabel}</p>}
            {sectionTitle && (
              <h2 className="cx-offering-title" style={{ fontFamily: 'var(--font-display)' }}>
                {sectionTitle}
              </h2>
            )}
            {sectionDesc && <p className="cx-offering-desc">{sectionDesc}</p>}
          </div>
        )}

        <div className="cx-offering-grid">
          <div className="cx-headings">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`cx-heading ${i === active ? 'cx-heading--active' : ''}`}
                onClick={() => {
                  setActive(i);
                  activeRef.current = i;
                  if (!reducedRef.current && sectionRef.current) {
                    const section = sectionRef.current;
                    const scrollable = section.offsetHeight - window.innerHeight;
                    const top =
                      section.getBoundingClientRect().top +
                      window.scrollY +
                      ((i + 0.5) / items.length) * scrollable;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
              >
                <span className="cx-heading-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="cx-heading-text">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="cx-detail">
            <div key={current.id} className="cx-detail-card">
              <div className="cx-detail-image">
                <img src={current.image} alt={current.title} loading="lazy" />
                <div className="cx-detail-image-glow" aria-hidden />
              </div>
              <div className="cx-detail-body-wrap">
                <h3 className="cx-detail-title" style={{ fontFamily: 'var(--font-display)' }}>
                  {current.title}
                </h3>
                <p className="cx-detail-body">{current.description}</p>
                {current.pointsHead && (
                  <p className="cx-detail-points-head">{current.pointsHead}</p>
                )}
                <ul className="cx-detail-list">
                  {current.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link to={current.path} className="cx-btn-ball">
                  <p>{current.cta || "Let's Talk"}</p>
                  <span className="cx-btn-eclipse" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{CX_CSS}</style>
    </section>
  );
}

const CX_CSS = `
.cx-offering {
  position: relative;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #f8fafc 100%);
  width: 100%;
}

.cx-offering-inner {
  position: sticky;
  top: 0;
  height: 100svh;
  max-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4.5rem 0 1.25rem;
  box-sizing: border-box;
  overflow: hidden;
}
.cx-offering-inner--static {
  position: relative;
  height: auto;
  max-height: none;
  padding: 3rem 0;
  overflow: visible;
  justify-content: flex-start;
}

.cx-offering-intro {
  max-width: 80rem;
  margin: 0 auto 1rem;
  padding: 0 1.25rem;
  flex-shrink: 0;
  text-align: center;
}
@media (min-width: 640px) {
  .cx-offering-intro { padding: 0 2rem; }
}
@media (min-width: 1024px) {
  .cx-offering-intro { padding: 0 2.5rem; }
}
.cx-offering-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #059669;
  margin-bottom: 0.35rem;
}
.cx-offering-title {
  font-size: clamp(1.3rem, 2.3vw, 1.85rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin-bottom: 0.35rem;
  line-height: 1.2;
}
.cx-offering-desc {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #64748b;
  max-width: 34rem;
  margin: 0 auto;
}

.cx-offering-grid {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  flex: 1;
  min-height: 0;
  align-items: center;
}
@media (min-width: 640px) {
  .cx-offering-grid { padding: 0 2rem; }
}
@media (min-width: 1024px) {
  .cx-offering-grid {
    grid-template-columns: minmax(200px, 0.8fr) 1.35fr;
    gap: 2rem;
    padding: 0 2.5rem;
  }
}

.cx-headings {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-height: 0;
  max-height: min(70vh, 100%);
  overflow-y: auto;
  scrollbar-width: thin;
  background: #fff;
  border-radius: 14px;
  padding: 0.5rem;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 12px 32px -16px rgba(15, 23, 42, 0.12);
}
.cx-heading {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-align: left;
  background: transparent;
  border: none;
  border-left: 3px solid transparent;
  padding: 0.55rem 0.75rem;
  cursor: pointer;
  color: #94a3b8;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
  border-radius: 0 10px 10px 0;
  flex-shrink: 0;
}
.cx-heading:hover {
  color: #475569;
  background: rgba(16, 185, 129, 0.05);
}
.cx-heading--active {
  color: #0f172a;
  border-left-color: var(--accent, #10b981);
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 12%, transparent), transparent);
  font-weight: 600;
  transform: translateX(2px);
}
.cx-heading-index {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  opacity: 0.65;
  flex-shrink: 0;
}
.cx-heading-text {
  font-size: 0.875rem;
  line-height: 1.3;
}

.cx-detail {
  min-height: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
.cx-detail-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  width: 100%;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow:
    0 2px 4px rgba(15, 23, 42, 0.04),
    0 16px 40px -12px rgba(15, 23, 42, 0.18),
    0 0 0 1px rgba(15, 23, 42, 0.04);
  transform: perspective(1200px) rotateX(1deg);
  transform-style: preserve-3d;
  animation: cx-card-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@media (min-width: 900px) {
  .cx-detail-card {
    grid-template-columns: 1.05fr 1fr;
    min-height: 320px;
    max-height: min(420px, 58vh);
  }
}
@keyframes cx-card-in {
  from {
    opacity: 0;
    transform: perspective(1200px) rotateX(4deg) translateY(14px);
  }
  to {
    opacity: 1;
    transform: perspective(1200px) rotateX(1deg) translateY(0);
  }
}

.cx-detail-image {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #e2e8f0;
}
@media (min-width: 900px) {
  .cx-detail-image {
    height: 100%;
    min-height: 280px;
  }
}
.cx-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.cx-detail-card:hover .cx-detail-image img {
  transform: scale(1.04);
}
.cx-detail-image-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 40%,
    color-mix(in srgb, var(--accent, #10b981) 18%, transparent)
  );
  pointer-events: none;
}

.cx-detail-body-wrap {
  padding: 1.15rem 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}
@media (min-width: 900px) {
  .cx-detail-body-wrap {
    padding: 1.35rem 1.5rem 1.5rem;
  }
}
.cx-detail-title {
  font-size: clamp(1.15rem, 1.8vw, 1.4rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #0f172a;
  margin-bottom: 0.5rem;
  line-height: 1.25;
}
.cx-detail-body {
  font-size: 0.85rem;
  line-height: 1.55;
  color: #64748b;
  margin-bottom: 0.65rem;
}
.cx-detail-points-head {
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.35rem;
}
.cx-detail-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem 0.65rem;
}
@media (max-width: 480px) {
  .cx-detail-list { grid-template-columns: 1fr; }
}
.cx-detail-list li {
  position: relative;
  padding-left: 0.85rem;
  font-size: 0.78rem;
  line-height: 1.4;
  color: #475569;
}
.cx-detail-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.4em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent, #10b981);
}

.cx-btn-ball {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  min-width: 9rem;
  height: 2.7rem;
  padding: 0 1.2rem;
  border-radius: 999px;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  background: #0f172a;
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  transition: color 0.35s ease, box-shadow 0.35s ease;
  box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--accent, #10b981) 50%, #0f172a);
}
.cx-btn-ball p {
  position: relative;
  z-index: 2;
  margin: 0;
}
.cx-btn-eclipse {
  position: absolute;
  z-index: 1;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  background: var(--accent, #10b981);
  right: 0.28rem;
  top: 50%;
  transform: translateY(-50%) scale(1);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), right 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.cx-btn-ball:hover {
  color: #0f172a;
}
.cx-btn-ball:hover .cx-btn-eclipse {
  transform: translateY(-50%) scale(12);
  right: 50%;
  margin-right: -1.15rem;
}

@media (prefers-reduced-motion: reduce) {
  .cx-detail-card { animation: none; transform: none; }
  .cx-detail-card:hover .cx-detail-image img { transform: none; }
}
`;
