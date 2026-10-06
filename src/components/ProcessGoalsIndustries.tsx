import { useEffect, useState } from 'react';
import {
  Search,
  Map,
  Hammer,
  Rocket,
  LineChart,
  Building2,
  Eye,
  ShoppingCart,
  Code2,
  GraduationCap,
  HeartPulse,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const processSteps = [
  {
    id: '01',
    title: 'Discover',
    text: 'Understand your business, audience, goals and challenges.',
    icon: Search,
  },
  {
    id: '02',
    title: 'Plan',
    text: 'Create the right technology, strategy and roadmap.',
    icon: Map,
  },
  {
    id: '03',
    title: 'Design & Build',
    text: 'Turn the plan into your website, app, software or digital campaign.',
    icon: Hammer,
  },
  {
    id: '04',
    title: 'Launch',
    text: 'Test, refine and launch the solution.',
    icon: Rocket,
  },
  {
    id: '05',
    title: 'Optimise & Grow',
    text: 'Monitor performance and improve based on data.',
    icon: LineChart,
  },
];

const goals = [
  {
    title: 'Starting a New Business?',
    text: 'Build your digital foundation with a website, UI/UX, SEO and digital marketing.',
    icon: Building2,
  },
  {
    title: 'Need More Visibility?',
    text: 'Improve your presence across search engines and social platforms.',
    icon: Eye,
  },
  {
    title: 'Want to Sell Online?',
    text: 'Launch an e-commerce store supported by SEO, social media and performance marketing.',
    icon: ShoppingCart,
  },
  {
    title: 'Need Custom Technology?',
    text: 'Develop custom software, applications and internal business tools.',
    icon: Code2,
  },
];

const industries = [
  {
    title: 'Startups',
    text: 'Digital foundations for businesses building their first online presence.',
    icon: Sparkles,
  },
  {
    title: 'Small & Medium Businesses',
    text: 'Practical IT and digital marketing solutions designed around growth.',
    icon: Building2,
  },
  {
    title: 'E-commerce Brands',
    text: 'Technology and marketing designed to support online sales.',
    icon: ShoppingCart,
  },
  {
    title: 'Professional Services',
    text: 'Websites and SEO designed to build credibility and generate enquiries.',
    icon: Eye,
  },
  {
    title: 'Education',
    text: 'Digital experiences focused on clarity, accessibility and trust.',
    icon: GraduationCap,
  },
  {
    title: 'Healthcare',
    text: 'Technology solutions designed around clear communication and compliance-aware content.',
    icon: HeartPulse,
  },
];

type Panel = 'process' | 'goals' | 'industries';

/**
 * Auto-rotating trio: Process → Goals → Industries
 */
export default function ProcessGoalsIndustries() {
  const { ref, inView } = useInView(0.1);
  const [panel, setPanel] = useState<Panel>('process');
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const order: Panel[] = ['process', 'goals', 'industries'];
    const id = setInterval(() => {
      setPanel((cur) => {
        const i = order.indexOf(cur);
        return order[(i + 1) % order.length];
      });
    }, 9000);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    if (!inView || panel !== 'process') return;
    const id = setInterval(() => setStep((s) => (s + 1) % processSteps.length), 2800);
    return () => clearInterval(id);
  }, [inView, panel]);

  const tabs: { id: Panel; label: string }[] = [
    { id: 'process', label: 'Our Process' },
    { id: 'goals', label: 'What We Achieve' },
    { id: 'industries', label: 'Industries' },
  ];

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f4f7f5 0%, #eef2f0 100%)' }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setPanel(t.id)}
              className="px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-semibold tracking-wide transition-all duration-400 border"
              style={{
                background: panel === t.id ? 'linear-gradient(135deg, #10b981, #059669)' : '#fff',
                color: panel === t.id ? '#fff' : '#334155',
                borderColor: panel === t.id ? 'transparent' : 'rgba(15,23,42,0.08)',
                boxShadow:
                  panel === t.id
                    ? '0 8px 20px rgba(16,185,129,0.25)'
                    : '0 2px 8px rgba(15,23,42,0.04)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* PROCESS */}
        {panel === 'process' && (
          <div className="animate-fade-up" key="process">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="type-label text-emerald-600 mb-3">Our Process</p>
              <h2 className="type-h2 text-slate-900 mb-3">From Idea to Growth</h2>
              <p className="type-body text-slate-500">
                A clear path from discovery to continuous improvement — so every stage stays accountable.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
              {processSteps.map((s, i) => {
                const Icon = s.icon;
                const on = step === i;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStep(i)}
                    className="text-left rounded-2xl p-4 border transition-all duration-500"
                    style={{
                      background: on
                        ? 'linear-gradient(160deg, rgba(16,185,129,0.12), #fff)'
                        : '#fff',
                      borderColor: on ? 'rgba(5,150,105,0.45)' : 'rgba(15,23,42,0.08)',
                      boxShadow: on
                        ? '0 14px 32px rgba(5,150,105,0.15)'
                        : '0 4px 14px rgba(15,23,42,0.04)',
                      transform: on ? 'translateY(-4px)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: on
                            ? 'linear-gradient(135deg, #10b981, #059669)'
                            : 'rgba(16,185,129,0.1)',
                        }}
                      >
                        <Icon size={14} className={on ? 'text-white' : 'text-emerald-600'} />
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700">{s.id}</span>
                    </div>
                    <p className="text-[14px] font-semibold text-slate-900 mb-1">{s.title}</p>
                    <p className="text-[12px] leading-snug text-slate-500">{s.text}</p>
                  </button>
                );
              })}
            </div>
            <div className="text-center">
              <a href="#contact" className="btn-3d-cta btn-shine inline-flex items-center gap-2">
                Start Your Project
                <ArrowRight size={16} className="btn-3d-arrow" />
              </a>
            </div>
          </div>
        )}

        {/* GOALS */}
        {panel === 'goals' && (
          <div className="animate-fade-up" key="goals">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="type-label text-emerald-600 mb-3">What Can We Help You Achieve?</p>
              <h2 className="type-h2 text-slate-900 mb-3">Solutions for Different Business Goals</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {goals.map((g) => {
                const Icon = g.icon;
                return (
                  <div
                    key={g.title}
                    className="rounded-2xl p-5 sm:p-6 border bg-white transition-all duration-400 hover:-translate-y-1"
                    style={{
                      borderColor: 'rgba(15,23,42,0.08)',
                      boxShadow: '0 8px 24px rgba(15,23,42,0.05)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                        border: '1px solid rgba(16,185,129,0.25)',
                      }}
                    >
                      <Icon size={18} className="text-emerald-700" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5">{g.title}</h3>
                    <p className="text-[13px] leading-relaxed text-slate-500">{g.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <a href="#contact" className="btn-3d-cta btn-shine inline-flex items-center gap-2">
                Explore Business Solutions
                <ArrowRight size={16} className="btn-3d-arrow" />
              </a>
            </div>
          </div>
        )}

        {/* INDUSTRIES */}
        {panel === 'industries' && (
          <div className="animate-fade-up" key="industries">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="type-label text-emerald-600 mb-3">Industries We Serve</p>
              <h2 className="type-h2 text-slate-900 mb-3">Digital Solutions Across Industries</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={ind.title}
                    className="rounded-2xl p-5 border bg-white transition-all duration-400 hover:-translate-y-1"
                    style={{
                      borderColor: 'rgba(15,23,42,0.08)',
                      boxShadow: '0 8px 24px rgba(15,23,42,0.05)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        boxShadow: '0 6px 14px rgba(5,150,105,0.25)',
                      }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5">{ind.title}</h3>
                    <p className="text-[13px] leading-relaxed text-slate-500">{ind.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
