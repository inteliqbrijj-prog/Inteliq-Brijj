import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-driven horizontal case-study style gallery.
 * Larger image panels (similar to professional portfolio cards),
 * technology-focused copy and photography.
 */
const panels = [
  {
    title: 'Cloud-native platforms',
    caption: 'Kubernetes, edge delivery and zero-downtime releases engineered for global scale.',
    tag: 'Infrastructure',
    // Modern data center / server racks
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=85&auto=format&fit=crop',
  },
  {
    title: 'Product engineering',
    caption: 'Full-stack systems with clean APIs, observable pipelines and measurable performance.',
    tag: 'Engineering',
    // Developer workspace / code
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=85&auto=format&fit=crop',
  },
  {
    title: 'Intelligent interfaces',
    caption: 'AI-assisted workflows and precision UX that reduce friction and compound adoption.',
    tag: 'Product design',
    // Abstract tech / UI screens
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85&auto=format&fit=crop',
  },
  {
    title: 'Secure digital products',
    caption: 'Hardened architecture, compliance-ready delivery and long-term ownership.',
    tag: 'Security',
    // Security / digital lock concept
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=85&auto=format&fit=crop',
  },
];

export default function ScrollImageRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      if (reducedRef.current) {
        setProgress(0);
        setActiveIndex(0);
        track.style.transform = 'translate3d(0,0,0)';
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        track.style.transform = 'translate3d(0,0,0)';
        return;
      }

      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
      setActiveIndex(
        Math.min(panels.length - 1, Math.round(p * (panels.length - 1)))
      );

      const shift = p * (panels.length - 1) * window.innerWidth;
      track.style.transform = `translate3d(${-shift}px, 0, 0)`;
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
  }, []);

  const reduced = reducedRef.current;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: '#eef2f0',
        height: reduced ? 'auto' : `min(${panels.length * 85}vh, ${panels.length * 720}px)`,
      }}
      aria-label="Selected Engagements gallery"
    >
      <div
        className={
          reduced
            ? 'relative py-16 sm:py-20'
            : 'sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden'
        }
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-800 mb-1.5">
                Selected Engagements
              </p>
              <h2
                className="text-[1.5rem] sm:text-[1.85rem] lg:text-[2.1rem] font-semibold tracking-[-0.025em]"
                style={{ color: '#0a0f0d', fontFamily: 'var(--font-display)' }}
              >
                Digital Products Engineered for Scale
              </h2>
            </div>
            <div className="flex items-center gap-2 pb-1">
              {panels.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-400"
                  style={{
                    width: i === activeIndex ? 26 : 7,
                    background: i === activeIndex ? '#047857' : 'rgba(15,23,42,0.18)',
                  }}
                />
              ))}
            </div>
          </div>

          {reduced ? (
            <div className="space-y-8">
              {panels.map((panel, i) => (
                <PanelCard key={panel.title} panel={panel} index={i} active />
              ))}
            </div>
          ) : (
            <div className="relative -mx-5 sm:-mx-8 lg:-mx-10 overflow-hidden">
              <div
                ref={trackRef}
                className="flex will-change-transform"
                style={{
                  width: `${panels.length * 100}vw`,
                  transform: 'translate3d(0,0,0)',
                }}
              >
                {panels.map((panel, i) => (
                  <div
                    key={panel.title}
                    className="flex-shrink-0 flex items-center justify-center px-5 sm:px-8 lg:px-10"
                    style={{ width: '100vw' }}
                  >
                    <div className="w-full max-w-7xl mx-auto">
                      <PanelCard
                        panel={panel}
                        index={i}
                        active={i === activeIndex}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!reduced && progress < 0.05 && (
            <p className="mt-6 text-center text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-500">
              Scroll to explore
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function PanelCard({
  panel,
  index,
  active,
}: {
  panel: (typeof panels)[number];
  index: number;
  active: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white"
      style={{
        boxShadow: active
          ? '0 28px 56px -16px rgba(15,23,42,0.14), 0 0 0 1px rgba(5,150,105,0.12)'
          : '0 12px 28px -10px rgba(15,23,42,0.08)',
        transform: active ? 'scale(1)' : 'scale(0.96)',
        opacity: active ? 1 : 0.72,
        transition:
          'transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Split layout like professional case study — large image */}
      <div className="grid lg:grid-cols-[1fr_1.15fr] min-h-0">
        {/* Copy column */}
        <div className="order-2 lg:order-1 flex flex-col justify-center px-6 sm:px-8 lg:px-10 py-7 sm:py-9 bg-white">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-emerald-800 mb-3">
            0{index + 1} — {panel.tag}
          </p>
          <h3
            className="text-[1.35rem] sm:text-[1.55rem] font-semibold tracking-[-0.025em] mb-3"
            style={{ color: '#0a0f0d', fontFamily: 'var(--font-display)' }}
          >
            {panel.title}
          </h3>
          <p className="text-[14px] sm:text-[15px] leading-[1.7] max-w-md" style={{ color: '#334155' }}>
            {panel.caption}
          </p>
          <div className="mt-6 flex items-center gap-4 text-[12px] font-medium" style={{ color: '#0a0f0d' }}>
            <span className="border-r border-slate-200 pr-4">Scalable</span>
            <span className="border-r border-slate-200 pr-4">Secure</span>
            <span>Production-ready</span>
          </div>
        </div>

        {/* Image column — substantial height like reference case study */}
        <div
          className="order-1 lg:order-2 relative overflow-hidden bg-slate-200"
          style={{ minHeight: 'clamp(260px, 42vh, 440px)' }}
        >
          <img
            src={panel.src}
            alt={panel.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            style={{
              transform: active ? 'scale(1)' : 'scale(1.05)',
              transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, transparent 30%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
