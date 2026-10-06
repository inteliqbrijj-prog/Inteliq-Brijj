import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type IndustrySlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  path?: string;
  services?: string[];
};

/**
 * Cyntexa industries-section animation:
 * - Horizontal swiper-wrapper with translate3d(x, 0, 0)
 * - slides aligned flex-end
 * - prev/next controls
 * - synced industries-content panel (active heading + description)
 */
export default function CyntexaIndustriesSlider({
  items,
  sectionTitle = 'Industries We Serve',
  sectionDesc = 'Discover the industries we transform with our solutions for value and growth.',
}: {
  items: IndustrySlide[];
  sectionTitle?: string;
  sectionDesc?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);

  const measure = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const slide = slideRefs.current[index];
      if (!track || !slide) return 0;
      // Center-ish / leading alignment like Cyntexa — shift so active sits in view
      const slideLeft = slide.offsetLeft;
      const pad = 24;
      return Math.max(0, slideLeft - pad);
    },
    []
  );

  const goTo = useCallback(
    (index: number) => {
      const i = Math.max(0, Math.min(items.length - 1, index));
      setAnimating(true);
      setActive(i);
      setOffset(measure(i));
      window.setTimeout(() => setAnimating(false), 450);
    },
    [items.length, measure]
  );

  useEffect(() => {
    const onResize = () => setOffset(measure(active));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active, measure]);

  // Auto-advance carousel
  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % items.length;
        // defer measure to next tick so active index is consistent
        window.requestAnimationFrame(() => {
          setAnimating(true);
          setOffset(measure(next));
          window.setTimeout(() => setAnimating(false), 450);
        });
        return next;
      });
    }, 4500);
    return () => window.clearInterval(id);
  }, [items.length, measure]);

  // Drag / swipe support
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0;
    let startOff = 0;
    let dragging = false;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startOff = offset;
      track.setPointerCapture(e.pointerId);
      setAnimating(false);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = startX - e.clientX;
      setOffset(Math.max(0, startOff + dx));
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      const dx = startX - e.clientX;
      if (Math.abs(dx) > 50) {
        goTo(dx > 0 ? active + 1 : active - 1);
      } else {
        goTo(active);
      }
    };

    track.addEventListener('pointerdown', onDown);
    track.addEventListener('pointermove', onMove);
    track.addEventListener('pointerup', onUp);
    track.addEventListener('pointercancel', onUp);
    return () => {
      track.removeEventListener('pointerdown', onDown);
      track.removeEventListener('pointermove', onMove);
      track.removeEventListener('pointerup', onUp);
      track.removeEventListener('pointercancel', onUp);
    };
  }, [active, offset, goTo]);

  const current = items[active] ?? items[0];

  return (
    <section className="cx-industries">
      <div className="cx-industries-head">
        <h2 className="cx-industries-title" style={{ fontFamily: 'var(--font-display)' }}>
          {sectionTitle}
        </h2>
        <p className="cx-industries-desc">{sectionDesc}</p>
      </div>

      <div className="cx-industry-container">
        <div className="cx-industry-wrapper">
          <div className="cx-swiper">
            <div
              ref={trackRef}
              className="cx-swiper-wrapper"
              style={{
                transform: `translate3d(${-offset}px, 0px, 0px)`,
                transitionDuration: animating ? '450ms' : '0ms',
                transitionDelay: '0ms',
              }}
            >
              {items.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  className={`cx-swiper-slide ${i === active ? 'cx-swiper-slide--active' : ''}`}
                  onClick={() => goTo(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') goTo(i);
                  }}
                >
                  <img src={item.image} alt={item.title} loading="lazy" draggable={false} />
                  <span className="cx-slide-label">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cx-swiper-nav">
            <button
              type="button"
              className="cx-swiper-btn"
              aria-label="Previous"
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="cx-swiper-btn"
              aria-label="Next"
              disabled={active === items.length - 1}
              onClick={() => goTo(active + 1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Synced content panel — industries-content */}
        <div className="cx-industries-content" key={current.id}>
          <h3 className="cx-industries-content-heading" style={{ fontFamily: 'var(--font-display)' }}>
            {current.title}
          </h3>
          <p className="cx-industries-content-body">{current.description}</p>
          {current.services && current.services.length > 0 && (
            <ul className="cx-industries-tags">
              {current.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
          {current.path && (
            <Link to={current.path} className="cx-industries-cta">
              Explore solutions
              <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="cx-industries-dots" role="tablist">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`cx-dot ${i === active ? 'cx-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={item.title}
          />
        ))}
      </div>

      <style>{CSS}</style>
    </section>
  );
}

const CSS = `
.cx-industries {
  background: #fff;
  padding: 4rem 0 3.5rem;
  overflow: hidden;
}
.cx-industries-head {
  max-width: 80rem;
  margin: 0 auto 2rem;
  padding: 0 1.25rem;
}
@media (min-width: 640px) {
  .cx-industries-head { padding: 0 2rem; }
}
@media (min-width: 1024px) {
  .cx-industries-head { padding: 0 2.5rem; }
}
.cx-industries-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.cx-industries-desc {
  font-size: 0.95rem;
  line-height: 1.65;
  color: #64748b;
  max-width: 36rem;
}

/* industry-container grid-like layout */
.cx-industry-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 0 0 1.25rem;
  display: grid;
  gap: 1.75rem;
}
@media (min-width: 640px) {
  .cx-industry-container { padding-left: 2rem; }
}
@media (min-width: 1024px) {
  .cx-industry-container {
    padding-left: 2.5rem;
    grid-template-columns: 1.4fr 1fr;
    align-items: end;
    gap: 2.5rem;
  }
}

.cx-industry-wrapper {
  position: relative;
  min-width: 0;
}

/* Swiper shell */
.cx-swiper {
  overflow: hidden;
  width: 100%;
  position: relative;
  list-style: none;
  padding: 0;
  z-index: 1;
  touch-action: pan-y;
  cursor: grab;
}
.cx-swiper:active { cursor: grabbing; }

/* Exact Cyntexa pattern: flex + align flex-end + translate3d on wrapper */
.cx-swiper-wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: content-box;
  will-change: transform;
  gap: 1rem;
  padding-bottom: 0.25rem;
}

.cx-swiper-slide {
  flex-shrink: 0;
  width: min(72vw, 320px);
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #e2e8f0;
  box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
  opacity: 0.72;
  transform: scale(0.94);
  user-select: none;
}
@media (min-width: 768px) {
  .cx-swiper-slide { width: min(42vw, 380px); }
}
.cx-swiper-slide--active {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 20px 40px -12px rgba(16, 185, 129, 0.25), 0 0 0 2px rgba(16, 185, 129, 0.35);
}
.cx-swiper-slide img {
  display: block;
  width: 100%;
  height: clamp(220px, 36vh, 360px);
  object-fit: cover;
  pointer-events: none;
}
.cx-slide-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2.5rem 1rem 0.85rem;
  background: linear-gradient(transparent, rgba(15, 23, 42, 0.75));
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.cx-swiper-nav {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
.cx-swiper-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #0f172a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.cx-swiper-btn:hover:not(:disabled) {
  background: #ecfdf5;
  border-color: #10b981;
  color: #047857;
}
.cx-swiper-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* industries-content */
.cx-industries-content {
  padding-right: 1.25rem;
  animation: cx-ind-fade 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@media (min-width: 640px) {
  .cx-industries-content { padding-right: 2rem; }
}
@media (min-width: 1024px) {
  .cx-industries-content { padding-right: 2.5rem; padding-bottom: 2rem; }
}
@keyframes cx-ind-fade {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.cx-industries-content-heading {
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #0f172a;
  margin-bottom: 0.75rem;
}
.cx-industries-content-body {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #64748b;
  margin-bottom: 1rem;
}
.cx-industries-tags {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.cx-industries-tags li {
  font-size: 0.75rem;
  font-weight: 500;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
}
.cx-industries-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #059669;
  text-decoration: none;
}
.cx-industries-cta:hover { color: #047857; }

.cx-industries-dots {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
}
.cx-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  border: none;
  background: #cbd5e1;
  padding: 0;
  cursor: pointer;
  transition: width 0.25s ease, background 0.25s ease;
}
.cx-dot--active {
  width: 22px;
  background: #10b981;
}

@media (prefers-reduced-motion: reduce) {
  .cx-swiper-wrapper { transition-duration: 0ms !important; }
  .cx-industries-content { animation: none; }
}
`;
