import { useEffect, useRef, useState, useCallback } from 'react';
import { Hammer, Radar, BarChart3, TrendingUp } from 'lucide-react';

/**
 * Compact process rail — a single horizontal row of 4 phases connected by an
 * animated signal line, each card with a subtle real-time 3D tilt on hover.
 * Deliberately shallow (no orbit stage) so the section reads as a tight,
 * professional strip rather than a tall centerpiece.
 */
const stages = [
  {
    id: '01',
    title: 'Build',
    signal: 'Websites, apps, software and e-commerce',
    detail: 'Production systems engineered for real business use.',
    icon: Hammer,
    color: '#00e08a',
  },
  {
    id: '02',
    title: 'Reach',
    signal: 'Visibility in front of the right audience',
    detail: 'SEO, content, campaigns and paid media.',
    icon: Radar,
    color: '#2dd4bf',
  },
  {
    id: '03',
    title: 'Measure',
    signal: 'Analytics, tracking and behaviour',
    detail: 'Clarity on what converts — then refine.',
    icon: BarChart3,
    color: '#34d399',
  },
  {
    id: '04',
    title: 'Grow',
    signal: 'Continuous improvement after launch',
    detail: 'Optimisation and strategy driven by real data.',
    icon: TrendingUp,
    color: '#6ee7b7',
  },
];

function StageCard({
  stage,
  isOn,
  onEnter,
  onLeave,
  onClick,
}: {
  stage: (typeof stages)[number];
  isOn: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const Icon = stage.icon;

  const onMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--mx', String(mx));
    el.style.setProperty('--my', String(my));
  }, []);

  const resetTilt = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    }
    onLeave();
  }, [onLeave]);

  return (
    <button
      ref={ref}
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={resetTilt}
      onMouseMove={onMove}
      onClick={onClick}
      className="tilt-3d group relative text-left rounded-2xl p-4 sm:p-5 overflow-hidden transition-[background,border-color,box-shadow] duration-500 w-full"
      style={{
        background: isOn
          ? 'linear-gradient(160deg, rgba(16,185,129,0.18), #ffffff)'
          : 'linear-gradient(160deg, #ffffff, #f4f7f5)',
        border: isOn ? '1.5px solid rgba(5,150,105,0.55)' : '1px solid rgba(15,23,42,0.1)',
        boxShadow: isOn
          ? `0 18px 44px rgba(5,150,105,0.22), 0 0 32px ${stage.color}33`
          : '0 6px 18px rgba(15,23,42,0.06)',
      }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500"
          style={{
            background: isOn
              ? `linear-gradient(135deg, ${stage.color}, #047857)`
              : 'rgba(5,150,105,0.12)',
            boxShadow: isOn ? `0 0 22px ${stage.color}88` : 'none',
            transform: 'translateZ(24px)',
          }}
        >
          <Icon size={16} className={isOn ? 'text-white' : 'text-emerald-600'} strokeWidth={2} />
        </div>
        <div className="flex flex-col leading-none">
          <span
            className="text-[9px] font-mono tracking-[0.2em]"
            style={{ color: isOn ? '#059669' : '#94a3b8' }}
          >
            {stage.id}
          </span>
          <span
            className="text-[15px] font-semibold tracking-[-0.02em] mt-1"
            style={{ color: '#0a0f0d', fontFamily: 'var(--font-display)' }}
          >
            {stage.title}
          </span>
        </div>
      </div>

      <p
        className="text-[12px] font-medium mb-1.5 leading-snug"
        style={{ color: isOn ? '#047857' : '#334155', transition: 'color 0.4s ease' }}
      >
        {stage.signal}
      </p>
      <p
        className="text-[12px] leading-[1.55]"
        style={{ color: '#334155' }}
      >
        {stage.detail}
      </p>

      <div
        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${stage.color}, transparent)`,
          opacity: isOn ? 1 : 0,
          height: '2px',
          boxShadow: isOn ? `0 0 12px ${stage.color}` : 'none',
        }}
      />
    </button>
  );
}

export default function HierarchyFlow() {
  const [active, setActive] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), 5200);
    return () => clearInterval(id);
  }, []);

  const shown = active;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* ========== SIGNAL RAIL — compact connective line with progress dot ========== */}
      <div className="relative hidden lg:block mb-3 px-8">
        <div
          className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.55) 10%, rgba(16,185,129,0.55) 90%, transparent)', height: '2px' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-px transition-all duration-700 ease-out"
          style={{
            left: '2rem',
            width: `calc((100% - 4rem) * ${shown / (stages.length - 1)})`,
            background: 'linear-gradient(90deg, #059669, #34d399, #10b981)',
            boxShadow: '0 0 16px rgba(16,185,129,0.85)',
            height: '2px',
          }}
        />
        <div className="relative grid grid-cols-4">
          {stages.map((s, i) => (
            <div key={s.id} className="flex justify-center">
              <span
                className="w-2 h-2 rounded-full transition-all duration-500"
                style={{
                  background: i <= shown ? '#059669' : 'rgba(16,185,129,0.25)',
                  boxShadow: i === shown ? '0 0 14px rgba(16,185,129,1)' : 'none',
                  transform: i === shown ? 'scale(1.6)' : 'scale(1)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========== COMPACT PHASE CARDS ========== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stages.map((stage, i) => (
          <StageCard
            key={stage.id}
            stage={stage}
            isOn={shown === i}
            onEnter={() => {}}
            onLeave={() => {}}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
