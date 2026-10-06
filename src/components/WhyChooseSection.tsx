import { useEffect, useState } from 'react';
import { Users, Eye, ShieldCheck, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const reasons = [
  {
    icon: Users,
    title: 'Business Focused Solutions',
    description:
      'Every engagement is shaped around your goals, audience and market reality.',
    detail: 'We plan technology and growth around what your business actually needs to move forward.',
  },
  {
    icon: Eye,
    title: 'Technology and Marketing Together',
    description:
      'IT and digital marketing under one team — so build and reach stay aligned.',
    detail: 'One accountable partner for websites, apps, software, SEO and campaigns.',
  },
  {
    icon: ShieldCheck,
    title: 'Clear Process',
    description:
      'Transparent stages from discovery to launch — with ownership at every step.',
    detail: 'You always know what is being built, why, and what comes next.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    description:
      'Systems and strategies designed to grow with your business over time.',
    detail: 'Clean architecture, documentation and continuous optimisation after launch.',
  },
];

/**
 * Professional step carousel — no overlap.
 * Left: numbered list. Right: featured card with smooth crossfade.
 * Slow, deliberate auto-advance (~4.5s).
 */
export default function WhyChooseSection() {
  const { ref, inView } = useInView(0.12);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % reasons.length), 4000);
    return () => clearInterval(id);
  }, [inView]);

  const shown = active;
  const current = reasons[shown];
  const Icon = current.icon;

  return (
    <section
      className="section-frame relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #eef2f0 0%, #e8edeb 40%, #f4f7f5 100%)' }}
    >
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative">
        <div className={`max-w-2xl mx-auto text-center mb-12 sm:mb-14 reveal-up ${inView ? 'in-view' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-5">
            <Sparkles size={12} className="text-emerald-700" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-emerald-800">
              Why Businesses Choose Us
            </span>
          </div>
          <h2
            className="type-h2 mb-4"
            style={{ color: '#0a0f0d', fontFamily: 'var(--font-display)' }}
          >
            Clear Process. Transparent Delivery. Real Ownership.
          </h2>
          <p className="type-body leading-[1.75]" style={{ color: '#334155' }}>
            One partner for technology and growth — planned around your goals, with visible progress
            and ownership that lasts beyond launch.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-[0.95fr_1.15fr] gap-6 lg:gap-10 items-stretch reveal-up ${
            inView ? 'in-view' : ''
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          {/* Left — step list (no overlap) */}
          <div className="flex flex-col gap-2.5">
            {reasons.map((r, i) => {
              const StepIcon = r.icon;
              const isOn = shown === i;
              return (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full text-left rounded-xl px-4 py-3.5 flex items-center gap-3.5 transition-all duration-500 border"
                  style={{
                    background: isOn ? '#ffffff' : 'rgba(255,255,255,0.55)',
                    borderColor: isOn ? 'rgba(5,150,105,0.4)' : 'rgba(15,23,42,0.08)',
                    boxShadow: isOn
                      ? '0 12px 28px -8px rgba(5,150,105,0.18), 0 4px 12px rgba(15,23,42,0.04)'
                      : 'none',
                  }}
                >
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500"
                    style={{
                      background: isOn
                        ? 'linear-gradient(135deg, #059669, #0d9488)'
                        : 'rgba(15,23,42,0.06)',
                      boxShadow: isOn ? '0 6px 14px rgba(5,150,105,0.3)' : 'none',
                    }}
                  >
                    <StepIcon
                      size={16}
                      className={isOn ? 'text-white' : 'text-slate-600'}
                      strokeWidth={1.75}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[13.5px] font-semibold tracking-[-0.015em]"
                      style={{ color: '#0a0f0d' }}
                    >
                      {r.title}
                    </p>
                    <p
                      className="text-[12px] leading-snug mt-0.5 line-clamp-1"
                      style={{ color: isOn ? '#334155' : '#64748b' }}
                    >
                      {r.description}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="shrink-0 transition-opacity duration-300"
                    style={{
                      color: '#059669',
                      opacity: isOn ? 1 : 0,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right — featured panel (single card, crossfade content) */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border min-h-[280px] sm:min-h-[320px]"
            style={{
              background: 'linear-gradient(160deg, #0f1714 0%, #13201b 50%, #0c1411 100%)',
              borderColor: 'rgba(5,150,105,0.25)',
              boxShadow:
                '0 28px 56px -16px rgba(15,23,42,0.25), inset 0 1px 0 rgba(16,185,129,0.12)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div
              className="absolute top-0 left-[15%] right-[15%] h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.55), transparent)',
              }}
            />

            <div className="relative z-10 h-full flex flex-col justify-between p-7 sm:p-9">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] uppercase"
                    style={{ color: '#6ee7b7' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Advantage 0{shown + 1}
                  </span>
                  <span
                    className="text-[11px] font-mono tabular-nums"
                    style={{ color: 'rgba(110,231,183,0.55)' }}
                  >
                    0{shown + 1} / 0{reasons.length}
                  </span>
                </div>

                <div
                  key={shown}
                  className="animate-fade-up"
                  style={{ animationDuration: '0.55s' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      boxShadow: '0 10px 28px rgba(16,185,129,0.35)',
                    }}
                  >
                    <Icon size={22} className="text-white" strokeWidth={1.75} />
                  </div>
                  <h3
                    className="text-[1.35rem] sm:text-[1.5rem] font-semibold tracking-[-0.025em] mb-3"
                    style={{ color: '#f8faf9', fontFamily: 'var(--font-display)' }}
                  >
                    {current.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] leading-[1.7] max-w-md" style={{ color: 'rgba(226,232,240,0.82)' }}>
                    {current.detail}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-8 flex gap-1.5">
                {reasons.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show ${reasons[i].title}`}
                    onClick={() => setActive(i)}
                    className="h-1 rounded-full flex-1 transition-all duration-500"
                    style={{
                      background:
                        i === shown
                          ? 'linear-gradient(90deg, #10b981, #34d399)'
                          : 'rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
