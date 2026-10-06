import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { detailedServices } from '../data';

export type ScrollItem = {
  id: string;
  title: string;
  headline: string;
  description: string;
  services: string[];
  path: string;
  image: string;
  accent?: string;
  cta?: string;
  metaLabel?: string;
};

type Service = ScrollItem;

/**
 * Cyntexa-style scroll: alternating content / image panels,
 * fixed-attachment parallax, 3D text reveal, professional 3D CTA.
 * Pass `items` for page-specific content; defaults to detailedServices.
 */
export default function IndustryContainer({
  items,
  metaLabel = 'Service',
}: {
  items?: ScrollItem[];
  metaLabel?: string;
}) {
  const list = items ?? (detailedServices as ScrollItem[]);
  return (
    <section className="ib-industry-container">
      {list.map((svc, i) => (
        <IndustryBlock
          key={svc.id}
          service={svc}
          imageFirst={i % 2 === 1}
          index={i}
          metaLabel={metaLabel}
        />
      ))}
      <style>{INDUSTRY_CSS}</style>
    </section>
  );
}

function IndustryBlock({
  service,
  imageFirst,
  index,
  metaLabel,
}: {
  service: Service;
  imageFirst: boolean;
  index: number;
  metaLabel: string;
}) {
  return (
    <div className={`ib-industry ${imageFirst ? 'ib-industry--image-first' : ''}`} id={service.id}>
      {imageFirst ? (
        <>
          <ImageSide service={service} />
          <ContentSide service={service} index={index} metaLabel={metaLabel} />
        </>
      ) : (
        <>
          <ContentSide service={service} index={index} metaLabel={metaLabel} />
          <ImageSide service={service} />
        </>
      )}
    </div>
  );
}

function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ContentSide({
  service,
  index,
  metaLabel,
}: {
  service: Service;
  index: number;
  metaLabel: string;
}) {
  const { ref, inView } = useReveal(0.15);
  const accent = service.accent || '#10b981';

  return (
    <div className={`ib-content ${inView ? 'ib-content--in' : ''}`} ref={ref}>
      <div className="ib-meta" style={{ ['--accent' as string]: accent }}>
        <span className="ib-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="ib-meta-line" />
        <span className="ib-meta-label">{metaLabel}</span>
      </div>

      <h2 className="ib-heading" style={{ ['--accent' as string]: accent }}>
        <span className="ib-heading-depth" aria-hidden>
          {service.title}
        </span>
        <span className="ib-heading-face">{service.title}</span>
      </h2>

      <ExploreButton service={service} />

      <div className="ib-desc">
        <p className="ib-desc-body">{service.description}</p>
        <p className="ib-headline" style={{ color: accent }}>
          {service.headline}
        </p>
        <ul className="ib-list">
          {service.services.slice(0, 10).map((item, i) => (
            <li
              key={item}
              style={{
                transitionDelay: inView ? `${180 + i * 40}ms` : '0ms',
              }}
            >
              <span className="ib-list-dot" style={{ background: accent }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExploreButton({ service }: { service: Service }) {
  const to = service.path.startsWith('/') ? service.path : '/contact';
  const accent = service.accent || '#10b981';
  const label = service.cta || 'Explore Now';
  return (
    <div className="ib-explore-wrap">
      <Link to={to} className="ib-btn-3d" style={{ ['--btn-accent' as string]: accent }}>
        <span className="ib-btn-3d-face">
          <span className="ib-btn-3d-label">{label}</span>
          <span className="ib-btn-3d-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        <span className="ib-btn-3d-edge" aria-hidden />
        <span className="ib-btn-3d-glow" aria-hidden />
      </Link>
    </div>
  );
}

function ImageSide({ service }: { service: Service }) {
  return (
    <div className="ib-image">
      <div className="ib-image-frame">
        <div
          className="ib-parallax"
          style={{ backgroundImage: `url(${service.image})` }}
          role="img"
          aria-label={service.title}
        />
        <div className="ib-image-vignette" aria-hidden />
      </div>
      <div className="ib-caption">
        <Link to={service.path.startsWith('/') ? service.path : '/contact'}>
          <u>{service.headline}</u>
        </Link>
      </div>
    </div>
  );
}

const INDUSTRY_CSS = `
.ib-industry-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
  background: #fff;
}
.ib-industry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 4rem 5rem;
  background: #fff;
}
.ib-industry--image-first { direction: rtl; }
.ib-industry--image-first > * { direction: ltr; }

.ib-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 36rem;
  z-index: 2;
  opacity: 0;
  transform: translateY(28px) rotateX(8deg);
  transform-origin: left center;
  filter: blur(4px);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.6s ease;
}
.ib-content--in {
  opacity: 1;
  transform: translateY(0) rotateX(0);
  filter: blur(0);
}

.ib-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.5s ease 0.05s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
}
.ib-content--in .ib-meta {
  opacity: 1;
  transform: translateX(0);
}
.ib-index {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--accent, #10b981);
  font-variant-numeric: tabular-nums;
}
.ib-meta-line {
  width: 2rem;
  height: 1px;
  background: linear-gradient(90deg, var(--accent, #10b981), transparent);
}
.ib-meta-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #94a3b8;
}

.ib-heading {
  position: relative;
  font-size: clamp(1.75rem, 2.8vw, 2.45rem);
  font-weight: 600;
  font-family: var(--font-display), system-ui, sans-serif;
  line-height: 1.2;
  margin-bottom: 1.25rem;
  letter-spacing: -0.025em;
  perspective: 800px;
  transform-style: preserve-3d;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.12s,
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s;
}
.ib-content--in .ib-heading {
  opacity: 1;
  transform: translateY(0);
}
.ib-heading-face {
  position: relative;
  z-index: 2;
  display: block;
  color: #0f172a;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, var(--accent, #10b981) 160%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.ib-heading-depth {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  color: transparent;
  -webkit-text-stroke: 1px rgba(15, 23, 42, 0.06);
  transform: translate3d(3px, 4px, -12px);
  filter: blur(0.4px);
  pointer-events: none;
  user-select: none;
}

.ib-explore-wrap {
  margin-bottom: 1.75rem;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s ease 0.22s, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
}
.ib-content--in .ib-explore-wrap {
  opacity: 1;
  transform: translateY(0);
}

.ib-btn-3d {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  text-decoration: none;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  transform-style: preserve-3d;
  perspective: 600px;
  isolation: isolate;
}
.ib-btn-3d-face {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.35rem 0.7rem 1.45rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #fff;
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--btn-accent, #10b981) 92%, #fff) 0%,
    var(--btn-accent, #10b981) 45%,
    color-mix(in srgb, var(--btn-accent, #10b981) 75%, #0f172a) 100%
  );
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.28) inset,
    0 -1px 0 rgba(0, 0, 0, 0.12) inset,
    0 4px 0 color-mix(in srgb, var(--btn-accent, #10b981) 55%, #0f172a),
    0 8px 20px -4px color-mix(in srgb, var(--btn-accent, #10b981) 45%, transparent),
    0 2px 6px rgba(15, 23, 42, 0.12);
  transform: translateY(0);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, filter 0.2s ease;
}
.ib-btn-3d-label { line-height: 1; }
.ib-btn-3d-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.ib-btn-3d-edge {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 999px;
  background: color-mix(in srgb, var(--btn-accent, #10b981) 40%, #0f172a);
  transform: translateY(4px);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.ib-btn-3d-glow {
  position: absolute;
  inset: -4px;
  z-index: 0;
  border-radius: 999px;
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, var(--btn-accent, #10b981) 35%, transparent),
    transparent 70%
  );
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.ib-btn-3d:hover .ib-btn-3d-face {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.32) inset,
    0 -1px 0 rgba(0, 0, 0, 0.1) inset,
    0 6px 0 color-mix(in srgb, var(--btn-accent, #10b981) 50%, #0f172a),
    0 14px 28px -6px color-mix(in srgb, var(--btn-accent, #10b981) 50%, transparent),
    0 4px 10px rgba(15, 23, 42, 0.14);
}
.ib-btn-3d:hover .ib-btn-3d-edge { transform: translateY(6px); }
.ib-btn-3d:hover .ib-btn-3d-glow { opacity: 1; }
.ib-btn-3d:hover .ib-btn-3d-icon { transform: translateX(3px); }
.ib-btn-3d:active .ib-btn-3d-face {
  transform: translateY(2px);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.2) inset,
    0 2px 0 color-mix(in srgb, var(--btn-accent, #10b981) 55%, #0f172a),
    0 4px 12px -4px color-mix(in srgb, var(--btn-accent, #10b981) 40%, transparent);
}
.ib-btn-3d:active .ib-btn-3d-edge { transform: translateY(2px); }
.ib-btn-3d:focus-visible {
  outline: 2px solid var(--btn-accent, #10b981);
  outline-offset: 4px;
  border-radius: 999px;
}

.ib-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #64748b;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease 0.28s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.28s;
}
.ib-content--in .ib-desc {
  opacity: 1;
  transform: translateY(0);
}
.ib-desc-body { margin-bottom: 1rem; }
.ib-headline {
  font-weight: 600;
  margin-bottom: 0.25rem;
  letter-spacing: -0.01em;
}
.ib-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem 1rem;
}
.ib-list li {
  position: relative;
  padding-left: 1.05rem;
  font-size: 0.85rem;
  color: #475569;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.ib-content--in .ib-list li {
  opacity: 1;
  transform: translateX(0);
}
.ib-list-dot {
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15);
}

.ib-image {
  width: 100%;
  position: relative;
  max-width: 100%;
}
.ib-image-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: min(48vh, 400px);
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 24px 48px -16px rgba(15, 23, 42, 0.18),
    0 0 0 1px rgba(15, 23, 42, 0.04);
  background: #e2e8f0;
}
.ib-parallax {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.ib-image-frame:hover .ib-parallax { transform: scale(1.03); }
.ib-image-vignette {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 55%, rgba(15, 23, 42, 0.06) 100%);
  z-index: 1;
}
.ib-caption {
  font-size: 0.95rem;
  color: #1e1b2e;
  padding: 1.1rem 1.35rem;
  background: #fff;
  margin-top: -2.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  line-height: 1.45;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  z-index: 2;
  font-weight: 500;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.ib-caption:hover {
  box-shadow: 4px 8px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
.ib-caption a { color: inherit; text-decoration: none; }
.ib-caption a:hover u { color: #059669; }

@media (max-width: 1024px) {
  .ib-industry {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 3rem 1.5rem;
    gap: 1.5rem;
  }
  .ib-industry--image-first { direction: ltr; }
  .ib-image-frame {
    max-height: 280px;
    aspect-ratio: 16 / 10;
  }
  .ib-parallax { background-attachment: scroll; }
  .ib-list { grid-template-columns: 1fr; }
  .ib-content { transform: translateY(20px); }
  .ib-heading-depth { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ib-parallax { background-attachment: scroll; }
  .ib-content,
  .ib-meta,
  .ib-heading,
  .ib-explore-wrap,
  .ib-desc,
  .ib-list li {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
}
`;
