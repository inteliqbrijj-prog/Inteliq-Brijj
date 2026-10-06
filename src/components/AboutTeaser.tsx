import { useEffect, useId, useMemo, useState } from 'react';
import { ArrowRight, Code2, Palette, TrendingUp, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const MODULES = [
  {
    key: 'design',
    label: 'Design',
    icon: Palette,
    // upper-right
    x: 118,
    y: -78,
    delay: '0s',
    floatDur: '5.5s',
  },
  {
    key: 'engineering',
    label: 'Engineering',
    icon: Code2,
    // lower-right
    x: 98,
    y: 92,
    delay: '0.8s',
    floatDur: '6.2s',
  },
  {
    key: 'growth',
    label: 'Growth',
    icon: TrendingUp,
    // lower-left
    x: -108,
    y: 78,
    delay: '1.4s',
    floatDur: '5.8s',
  },
] as const;

/** Elegant quadratic path from module → core */
function pathToCore(x: number, y: number) {
  // control point bends toward a soft arc
  const cx = x * 0.45;
  const cy = y * 0.35 - 18;
  return `M ${x} ${y} Q ${cx} ${cy} 0 0`;
}

/**
 * Premium “digital product engine” — SVG + CSS, light-only palette.
 * Left copy unchanged; right visual is a calm, continuous system.
 */
function ProductEngine({ reduced }: { reduced: boolean }) {
  const uid = useId().replace(/:/g, '');
  const [hovered, setHovered] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Drive particle offsets without layout thrash
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      setTick(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const paths = useMemo(
    () => MODULES.map((m) => ({ ...m, d: pathToCore(m.x, m.y) })),
    []
  );

  const size = 320;
  const half = size / 2;

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: size, height: size, maxWidth: '100%' }}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-[12%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(167,243,208,0.45) 0%, rgba(236,253,245,0.35) 40%, transparent 72%)',
          filter: reduced ? 'none' : undefined,
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`${-half} ${-half} ${size} ${size}`}
        className="absolute inset-0 overflow-visible"
      >
        <defs>
          <linearGradient id={`ring-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1fae5" stopOpacity="1" />
            <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id={`path-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.2" />
          </linearGradient>
          <filter id={`glow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Path length approx for dash animation */}
          {paths.map((p) => (
            <path key={`def-${p.key}`} id={`track-${uid}-${p.key}`} d={p.d} fill="none" />
          ))}
        </defs>

        {/* Soft concentric rings — independent slow rotation */}
        {[58, 88, 118, 148].map((r, i) => (
          <circle
            key={r}
            cx={0}
            cy={0}
            r={r}
            fill="none"
            stroke={`url(#ring-${uid})`}
            strokeWidth={i === 3 ? 1.1 : 0.9}
            strokeOpacity={0.55 - i * 0.08}
            strokeDasharray={i % 2 === 1 ? '3 10' : i === 2 ? '1 7' : undefined}
            style={{
              transformOrigin: '0 0',
              animation: reduced
                ? 'none'
                : `spin ${28 + i * 9}s linear infinite ${i % 2 ? 'reverse' : ''}`,
            }}
          />
        ))}

        {/* Curved connection paths */}
        {paths.map((p) => {
          const lit = hovered === p.key;
          return (
            <path
              key={p.key}
              d={p.d}
              fill="none"
              stroke={lit ? '#34d399' : `url(#path-${uid})`}
              strokeWidth={lit ? 1.75 : 1.15}
              strokeLinecap="round"
              strokeOpacity={lit ? 0.9 : 0.55}
              filter={lit ? `url(#glow-${uid})` : undefined}
              style={{ transition: 'stroke-opacity 0.5s ease, stroke-width 0.5s ease' }}
            />
          );
        })}

        {/* Traveling particles along paths (approximate via getPointAtLength isn't available without refs;
            use CSS offset-path where supported, fallback to opacity dots on arcs) */}
        {!reduced &&
          paths.map((p, i) =>
            [0, 1, 2].map((j) => {
              const phase = (tick * (0.14 + i * 0.025) + j * 0.33) % 1;
              // Sample quadratic Bezier roughly
              const x0 = p.x;
              const y0 = p.y;
              const cpx = p.x * 0.45;
              const cpy = p.y * 0.35 - 18;
              const t = phase;
              const mt = 1 - t;
              const x = mt * mt * x0 + 2 * mt * t * cpx + t * t * 0;
              const y = mt * mt * y0 + 2 * mt * t * cpy + t * t * 0;
              const bright = phase > 0.15 && phase < 0.85;
              return (
                <circle
                  key={`${p.key}-p${j}`}
                  cx={x}
                  cy={y}
                  r={bright ? 2.2 : 1.4}
                  fill="#34d399"
                  opacity={bright ? 0.85 : 0.25}
                  filter={`url(#glow-${uid})`}
                />
              );
            })
          )}

        {/* Occasional center pulse ring */}
        {!reduced && (
          <circle
            cx={0}
            cy={0}
            r={40}
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="1.15"
            style={{
              transformOrigin: '0px 0px',
              animation: 'engine-pulse-ring 4.8s ease-out infinite',
            }}
          />
        )}
      </svg>

      {/* ONE TEAM core — glass mint */}
      <div
        className="absolute left-1/2 top-1/2 z-20 flex flex-col items-center justify-center"
        style={{
          width: 86,
          height: 86,
          marginLeft: -43,
          marginTop: -43,
          borderRadius: 22,
          background:
            'linear-gradient(145deg, #ffffff 0%, #f0fdf4 45%, #d1fae5 100%)',
          border: '1px solid rgba(110,231,183,0.55)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,1), 0 10px 28px rgba(52,211,153,0.2), 0 2px 8px rgba(15,23,42,0.04), inset 0 1px 0 #fff',
          animation: reduced ? 'none' : 'engine-breathe 3.6s ease-in-out infinite',
        }}
      >
        <div
          className="flex items-center justify-center rounded-xl mb-1"
          style={{
            width: 28,
            height: 28,
            background: 'linear-gradient(145deg, #6ee7b7, #34d399)',
            boxShadow: '0 4px 12px rgba(52,211,153,0.35)',
          }}
        >
          <Hexagon size={14} className="text-white" strokeWidth={2.25} />
        </div>
        <span
          className="text-[8px] font-bold tracking-[0.16em] leading-none"
          style={{ color: '#0f172a' }}
        >
          ONE TEAM
        </span>
      </div>

      {/* Floating modules */}
      {MODULES.map((m) => {
        const Icon = m.icon;
        const isOn = hovered === m.key;
        return (
          <div
            key={m.key}
            className="absolute z-30 flex flex-col items-center"
            style={{
              left: `calc(50% + ${m.x}px)`,
              top: `calc(50% + ${m.y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHovered(m.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              style={{
                animation: reduced
                  ? 'none'
                  : `engine-float ${m.floatDur} ease-in-out infinite`,
                animationDelay: m.delay,
              }}
            >
              <div
                className="flex items-center justify-center rounded-2xl transition-all duration-500"
                style={{
                  width: isOn ? 52 : 48,
                  height: isOn ? 52 : 48,
                  background: isOn
                    ? 'linear-gradient(160deg, #ffffff 0%, #ecfdf5 100%)'
                    : 'linear-gradient(160deg, #ffffff 0%, #f0fdf4 100%)',
                  border: `1px solid ${isOn ? 'rgba(52,211,153,0.7)' : 'rgba(167,243,208,0.9)'}`,
                  boxShadow: isOn
                    ? '0 12px 28px rgba(52,211,153,0.25), 0 2px 8px rgba(15,23,42,0.04), 0 0 0 1px #fff'
                    : '0 6px 16px rgba(15,23,42,0.04), 0 0 0 1px #fff',
                  backdropFilter: 'blur(8px)',
                  transform: isOn ? 'translateY(-3px)' : 'translateY(0)',
                  transition:
                    'transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease, width 0.4s ease, height 0.4s ease, border-color 0.4s ease',
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={1.85}
                  style={{ color: isOn ? '#059669' : '#0f766e' }}
                />
              </div>
            </div>
            <span
              className="mt-2 text-[10px] font-semibold tracking-[0.04em] whitespace-nowrap transition-colors duration-400"
              style={{ color: isOn ? '#0f172a' : '#334155', fontWeight: 600 }}
            >
              {m.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function AboutTeaser() {
  const { ref, inView } = useInView(0.15);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -3, y: px * 4 });
  };

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8faf9 0%, #f0f5f2 100%)' }}
    >
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

      {/* Keyframes local to this system */}
      <style>{`
        @keyframes engine-breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 1px #fff, 0 10px 28px rgba(52,211,153,0.18), 0 2px 8px rgba(15,23,42,0.03), inset 0 1px 0 #fff; }
          50% { transform: scale(1.03); box-shadow: 0 0 0 1px #fff, 0 14px 36px rgba(52,211,153,0.28), 0 2px 8px rgba(15,23,42,0.03), inset 0 1px 0 #fff; }
        }
        @keyframes engine-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes engine-pulse-ring {
          0% { transform: scale(0.9); opacity: 0.45; }
          100% { transform: scale(3.2); opacity: 0; }
        }
      `}</style>

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative">
        <div style={{ perspective: '1800px' }}>
          <div
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className={`relative overflow-hidden rounded-[28px] sm:rounded-[32px] reveal-up ${
              inView ? 'in-view' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f7fcf9 50%, #eef8f3 100%)',
              border: '1px solid rgba(16,185,129,0.12)',
              boxShadow:
                '0 24px 56px rgba(15,23,42,0.06), 0 0 0 1px rgba(255,255,255,0.8), inset 0 1px 0 #fff',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="absolute -top-16 right-0 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)',
              }}
            />

            <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-4 items-center px-7 sm:px-12 lg:px-14 py-12 sm:py-14">
              {/* LEFT — unchanged content */}
              <div style={{ transform: 'translateZ(24px)' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-white border border-emerald-100 shadow-sm">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                    style={{ boxShadow: '0 0 8px rgba(16,185,129,0.6)' }}
                  />
                  <span className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-emerald-700">
                    About Us
                  </span>
                </div>
                <h3
                  className="type-h2 mb-3"
                  style={{ color: '#0a0f0d', fontFamily: 'var(--font-display)' }}
                >
                  Technology and growth for businesses that need both under one roof.
                </h3>
                <p
                  className="text-[14px] sm:text-[15px] leading-[1.75] mb-8 max-w-lg"
                  style={{ color: '#475569' }}
                >
                  Inteliq Brijj is an IT solutions and digital marketing partner based in Jaipur,
                  serving teams across India — web, apps, software and growth connected as one system.
                </p>
                <Link to="/services" className="btn-3d-cta btn-shine inline-flex items-center gap-2.5">
                  Learn More About Us
                  <ArrowRight size={16} className="btn-3d-arrow" />
                </Link>
              </div>

              {/* RIGHT — product engine visual */}
              <div
                className="flex items-center justify-center py-4 lg:py-2"
                style={{ transform: 'translateZ(40px)' }}
              >
                <ProductEngine reduced={reduced} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
