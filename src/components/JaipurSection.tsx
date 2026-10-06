import { useEffect, useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/** Approximate India outline (viewBox 0 0 400 460) — stylized, clean */
const CITIES = [
  { name: 'Delhi', x: 168, y: 118, delay: 0 },
  { name: 'Mumbai', x: 112, y: 268, delay: 0.4 },
  { name: 'Bengaluru', x: 168, y: 348, delay: 0.8 },
  { name: 'Hyderabad', x: 178, y: 298, delay: 1.2 },
  { name: 'Kolkata', x: 268, y: 198, delay: 1.6 },
];

const JAIPUR = { x: 148, y: 168 };

/**
 * India map presence — SVG outline, Jaipur HQ pulse, city nodes + travel arcs
 */
export default function JaipurSection() {
  const { ref, inView } = useInView(0.12);
  const uid = useId().replace(/:/g, '');
  const [tick, setTick] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  useEffect(() => {
    if (reduced || !inView) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setTick((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, inView]);

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(165deg, #eef2f0 0%, #e6ece9 50%, #f4f7f5 100%)' }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          ref={ref}
          className={`grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center reveal-up ${
            inView ? 'in-view' : ''
          }`}
        >
          <div className="min-w-0">
            <p className="type-label text-emerald-600 mb-3">Jaipur + India</p>
            <h2 className="type-h2 text-slate-900 mb-4">
              Based in Jaipur. Building for Businesses Across India.
            </h2>
            <p className="type-body text-slate-500 mb-4 max-w-lg">
              Inteliq Brijj Solutions is a Jaipur-based IT solutions and digital marketing company
              serving businesses in Jaipur and across India.
            </p>
            <p className="type-body text-slate-500 mb-8 max-w-lg">
              From IT services and web development to SEO and digital marketing, we help businesses
              build the technology they need and reach the audiences they want to serve.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn-3d-cta btn-shine inline-flex items-center gap-2">
                Explore Our Jaipur Services
                <ArrowRight size={16} className="btn-3d-arrow" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold border border-slate-200 bg-white text-slate-800 hover:border-emerald-400 hover:text-emerald-700 transition-all"
              >
                Talk to Our Team
              </a>
            </div>
          </div>

          {/* Animated India map card */}
          <div className="relative flex items-center justify-center w-full min-w-0">
            <div
              className="relative w-full max-w-[min(100%,380px)] mx-auto overflow-hidden rounded-[24px] sm:rounded-[28px]"
              style={{
                aspectRatio: '1 / 1.08',
                background: 'linear-gradient(160deg, #ffffff 0%, #f0fdf4 45%, #ecfdf5 100%)',
                border: '1px solid rgba(16,185,129,0.22)',
                boxShadow: '0 24px 48px rgba(15,23,42,0.08), inset 0 1px 0 #fff',
              }}
            >
              <svg
                viewBox="0 0 400 460"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <defs>
                  <linearGradient id={`land-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d1fae5" />
                    <stop offset="55%" stopColor="#a7f3d0" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                  </linearGradient>
                  <filter id={`glow-${uid}`}>
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id={`hq-${uid}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
                  </radialGradient>
                </defs>

                {/* Soft ocean wash */}
                <rect width="400" height="460" fill="url(#hq-bg)" opacity="0" />

                {/* India landmass — simplified silhouette using rounded blob approximating shape */}
                <path
                  d="M210 36c28 8 48 36 52 68 4 22 18 36 40 34 18-2 28 16 22 32-6 18 8 36 28 40 14 2 18 22 6 32-14 12-6 36 12 44 10 4 8 24-4 28-16 6-12 28 4 36 8 4 4 20-6 24-14 6-18 24-8 36 6 8-2 22-16 24-16 2-26 18-18 32 4 10-6 20-20 18-16-2-28 12-22 26 4 10-8 18-20 16-14-2-22-14-16-26 6-10 0-24-12-28-14-6-18-24-6-36 8-8 4-22-6-28-14-6-18-24-6-36 6-8 2-20-8-24-14-6-12-24 2-32 8-4 6-16-2-22-12-8-6-24 8-30 8-4 12-16 6-24-8-12 4-26 20-28 10-2 18-12 14-22-4-12 8-22 20-18 8 2 18-2 22-10 6-12 22-16 36-10z"
                  fill={`url(#land-${uid})`}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeOpacity="0.45"
                  opacity="0.92"
                />

                {/* Connection lines Jaipur → cities */}
                {CITIES.map((c) => (
                  <line
                    key={`line-${c.name}`}
                    x1={JAIPUR.x}
                    y1={JAIPUR.y}
                    x2={c.x}
                    y2={c.y}
                    stroke="#34d399"
                    strokeWidth="1.1"
                    strokeOpacity="0.35"
                    strokeDasharray="4 6"
                  />
                ))}

                {/* Traveling pulses on lines */}
                {!reduced &&
                  inView &&
                  CITIES.map((c, i) => {
                    const t = (tick * 0.22 + i * 0.2) % 1;
                    const x = JAIPUR.x + (c.x - JAIPUR.x) * t;
                    const y = JAIPUR.y + (c.y - JAIPUR.y) * t;
                    return (
                      <circle
                        key={`p-${c.name}`}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#059669"
                        opacity={0.3 + 0.6 * Math.sin(t * Math.PI)}
                        filter={`url(#glow-${uid})`}
                      />
                    );
                  })}

                {/* City nodes */}
                {CITIES.map((c) => (
                  <g key={c.name}>
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="5"
                      fill="#fff"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    <circle cx={c.x} cy={c.y} r="2.2" fill="#059669" />
                    <text
                      x={c.x}
                      y={c.y + 16}
                      textAnchor="middle"
                      fill="#334155"
                      style={{ fontSize: 11, fontWeight: 600, fontFamily: 'system-ui,sans-serif' }}
                    >
                      {c.name}
                    </text>
                  </g>
                ))}

                {/* Jaipur HQ */}
                <g>
                  {!reduced && inView && (
                    <circle
                      cx={JAIPUR.x}
                      cy={JAIPUR.y}
                      r="22"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="1.5"
                      opacity="0.5"
                      style={{
                        transformOrigin: `${JAIPUR.x}px ${JAIPUR.y}px`,
                        animation: 'engine-pulse-ring 3.2s ease-out infinite',
                      }}
                    />
                  )}
                  <circle
                    cx={JAIPUR.x}
                    cy={JAIPUR.y}
                    r="16"
                    fill="#10b981"
                    filter={`url(#glow-${uid})`}
                  />
                  <circle cx={JAIPUR.x} cy={JAIPUR.y} r="16" fill="url(#hq-${uid})" />
                  {/* pin icon simplified */}
                  <path
                    d={`M${JAIPUR.x} ${JAIPUR.y - 5}c-3.5 0-6 2.6-6 6 0 4.5 6 10 6 10s6-5.5 6-10c0-3.4-2.5-6-6-6z`}
                    fill="#fff"
                  />
                  <circle cx={JAIPUR.x} cy={JAIPUR.y + 1} r="1.8" fill="#059669" />
                  <text
                    x={JAIPUR.x}
                    y={JAIPUR.y + 32}
                    textAnchor="middle"
                    fill="#0f172a"
                    style={{ fontSize: 12, fontWeight: 700, fontFamily: 'system-ui,sans-serif' }}
                  >
                    Jaipur
                  </text>
                  <text
                    x={JAIPUR.x}
                    y={JAIPUR.y + 46}
                    textAnchor="middle"
                    fill="#047857"
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      fontFamily: 'system-ui,sans-serif',
                    }}
                  >
                    HQ
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-emerald-800/80">
                  Serving across India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
