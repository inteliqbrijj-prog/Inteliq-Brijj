import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, GitBranch, Terminal, Rocket, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const stages = [
  {
    tag: 'STAGE_01',
    title: 'Discover & Align',
    description: 'Deep discovery workshops to map goals, constraints and success metrics before a single line of code.',
    icon: Search,
  },
  {
    tag: 'STAGE_02',
    title: 'Architect & Prototype',
    description: 'Scalable system design, interactive prototypes and technical spikes that de-risk the path forward.',
    icon: GitBranch,
  },
  {
    tag: 'STAGE_03',
    title: 'Build & Iterate',
    description: 'Agile delivery with continuous feedback loops, clean code and weekly demos.',
    icon: Terminal,
  },
  {
    tag: 'STAGE_04',
    title: 'Launch & Optimize',
    description: 'Production-grade deployment, performance tuning, monitoring and ongoing growth partnership.',
    icon: Rocket,
  },
];

export default function TechPipeline() {
  const { ref, inView } = useInView(0.1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), 2800);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      className="section-frame relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #e8eeea 0%, #e2e8e5 45%, #eef2f0 100%)' }}
    >
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(16,185,129,0.1), transparent 70%)' }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.45), transparent)',
          boxShadow: '0 0 40px 6px rgba(16,185,129,0.12)',
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative">
        <div className={`max-w-2xl mb-16 sm:mb-20 reveal-up ${inView ? 'in-view' : ''}`}>
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white border border-emerald-100 shadow-sm"
          >
            <span className="font-mono text-[11px] text-emerald-600">pipeline</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] text-slate-400">v2.0</span>
          </div>
          <h2 className="type-h2 mb-4" style={{ color: '#0a0f0d' }}>From Discovery to Production — A Disciplined Delivery Arc</h2>
          <p className="type-body leading-relaxed" style={{ color: '#334155' }}>
            Four deliberate stages. No ambiguity. Every engagement follows the same disciplined arc so you always know what happens next.
          </p>
        </div>

        {/* Progress rail */}
        <div className="relative mb-10 hidden sm:block">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-emerald-100" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-px transition-all duration-700 ease-out"
            style={{
              width: `${((active + 1) / stages.length) * 100}%`,
              background: 'linear-gradient(90deg, #10b981, #34d399)',
              boxShadow: '0 0 12px rgba(16,185,129,0.5)',
            }}
          />
          <div className="relative flex justify-between">
            {stages.map((_, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border-2 transition-all duration-500"
                style={{
                  background: i <= active ? '#10b981' : '#fff',
                  borderColor: i <= active ? '#10b981' : '#a7f3d0',
                  boxShadow: i === active ? '0 0 12px rgba(16,185,129,0.6)' : 'none',
                  transform: i === active ? 'scale(1.25)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isOn = active === i;
            return (
              <div
                key={stage.tag}
                className={`reveal-up rounded-2xl p-5 transition-all duration-500 ${inView ? 'in-view' : ''}`}
                style={{
                  background: isOn
                    ? 'linear-gradient(160deg, rgba(16,185,129,0.1) 0%, #ffffff 100%)'
                    : '#ffffff',
                  border: isOn ? '1px solid rgba(5,150,105,0.4)' : '1px solid rgba(15,23,42,0.1)',
                  boxShadow: isOn
                    ? '0 16px 40px rgba(16,185,129,0.12)'
                    : '0 4px 16px rgba(15,23,42,0.04)',
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                    style={{
                      background: isOn
                        ? 'linear-gradient(135deg, #10b981, #0d9488)'
                        : 'rgba(16,185,129,0.08)',
                      border: isOn ? 'none' : '1px solid rgba(16,185,129,0.2)',
                      boxShadow: isOn ? '0 6px 20px rgba(16,185,129,0.35)' : 'none',
                    }}
                  >
                    <Icon size={16} className={isOn ? 'text-white' : 'text-emerald-600'} strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[10px] tracking-wide text-emerald-600/70">{stage.tag}</span>
                </div>
                <h3
                  className="text-[14.5px] font-semibold mb-2 tracking-[-0.02em] text-slate-900"
                  style={{ fontFamily: 'var(--font-display)', color: '#0a0f0d' }}
                >
                  {stage.title}
                </h3>
                <p className="text-[12.5px] leading-[1.65]" style={{ color: '#334155' }}>{stage.description}</p>
                {isOn && (
                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-600">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                      style={{ animation: 'pulse-glow 1.6s ease-in-out infinite' }}
                    />
                    status: active
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/process" className="btn-3d-cta btn-shine inline-flex items-center gap-2.5">
            View the Full Engineering Process
            <ArrowUpRight size={16} className="btn-3d-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
