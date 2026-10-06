import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Smartphone,
  Server,
  ShoppingCart,
  Target,
  Eye,
  Layers,
  Zap,
  Shield,
  Search,
  Palette,
  Megaphone,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { FloatingOrbs } from '../components/Shared';
import IndustryContainer from '../components/IndustryScrollStory';

const solutionPaths = [
  {
    title: 'I Need a Website',
    stack: 'Web Development + UI/UX + SEO',
    cta: 'Find My Solution',
    path: '/it-solutions#web',
    icon: Code2,
    accent: '#059669',
    glow: 'rgba(5,150,105,0.18)',
  },
  {
    title: 'I Want More Customers',
    stack: 'SEO + Digital Marketing + Social + Ads',
    cta: 'Grow My Business',
    path: '/digital-marketing',
    icon: Target,
    accent: '#0d9488',
    glow: 'rgba(13,148,136,0.18)',
  },
  {
    title: 'I Want to Build an App',
    stack: 'App Development + UI/UX + Software',
    cta: 'Build My App',
    path: '/it-solutions#mobile',
    icon: Smartphone,
    accent: '#0891b2',
    glow: 'rgba(8,145,178,0.18)',
  },
  {
    title: 'I Want to Sell Online',
    stack: 'E-commerce + SEO + Marketing',
    cta: 'Build My Store',
    path: '/it-solutions#ecommerce',
    icon: ShoppingCart,
    accent: '#ea580c',
    glow: 'rgba(234,88,12,0.16)',
  },
  {
    title: 'I Need Custom Software',
    stack: 'Software + UI/UX + API + Automation',
    cta: 'Discuss Requirement',
    path: '/it-solutions#software',
    icon: Server,
    accent: '#7c3aed',
    glow: 'rgba(124,58,237,0.16)',
  },
  {
    title: 'I Need Better Visibility',
    stack: 'SEO + Content + Social + Marketing',
    cta: 'Improve Visibility',
    path: '/digital-marketing#seo',
    icon: Eye,
    accent: '#4f46e5',
    glow: 'rgba(79,70,229,0.16)',
  },
];

const processSteps = [
  { id: '01', title: 'Discover', text: 'Understand your business, audience and objectives.', icon: Search },
  { id: '02', title: 'Define', text: 'Identify the right service, technology and strategy.', icon: Target },
  { id: '03', title: 'Design', text: 'Create the structure and experience.', icon: Palette },
  { id: '04', title: 'Develop', text: 'Build your website, app, software or digital solution.', icon: Code2 },
  { id: '05', title: 'Launch', text: 'Test, refine and prepare for launch.', icon: Zap },
  { id: '06', title: 'Grow', text: 'SEO, marketing and optimisation where required.', icon: Megaphone },
];

const pillars = [
  { icon: Layers, title: 'One Connected Team', text: 'Technology and marketing work together — not in silos.' },
  { icon: Target, title: 'Business First', text: 'We focus on goals and outcomes, not vanity deliverables.' },
  { icon: Zap, title: 'Custom Solutions', text: 'Services shaped around your requirements and stage.' },
  { icon: Shield, title: 'Built to Evolve', text: 'Systems and campaigns that improve as you grow.' },
];

export default function Services() {
  const pathsView = useInView(0.08);
  const processView = useInView(0.08);
  const whyView = useInView(0.08);

  return (
    <div className="bg-[#fbfcfb]">
      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 70% 0%, rgba(16,185,129,0.09), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(13,148,136,0.06), transparent 50%)',
          }}
        />
        <FloatingOrbs />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-100 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-emerald-700">
                Our Services
              </span>
            </div>

            <h1
              className="text-[2.25rem] sm:text-[3rem] lg:text-[3.4rem] font-semibold tracking-[-0.035em] text-slate-900 mb-5 leading-[1.12]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Build Your Digital Presence.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Grow Your Business.
              </span>
            </h1>

            <p className="text-slate-500 text-[16px] sm:text-[17px] leading-[1.75] max-w-2xl mb-8">
              From IT solutions and website development to SEO and digital marketing — technology,
              design and growth under one roof, designed around your goals.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
              >
                Start a Project
                <ArrowRight size={15} />
              </Link>
              <a
                href="#digital-marketing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-emerald-800 border border-emerald-200 bg-white hover:bg-emerald-50 transition-colors"
              >
                Explore Services
                <ArrowUpRight size={15} />
              </a>
            </div>

            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-slate-400">
              Jaipur Based · Serving Businesses Across India
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'BUILD', items: 'Web · Apps · Software · UI/UX · Store', color: '#059669' },
              { label: 'REACH', items: 'SEO · Marketing · Social · Ads', color: '#0d9488' },
              { label: 'OPTIMISE', items: 'Analytics · CRO · Performance', color: '#0891b2' },
              { label: 'GROW', items: 'Visibility · Experience · Revenue', color: '#7c3aed' },
            ].map((col, i) => (
              <div
                key={col.label}
                className="rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-4 sm:p-5 shadow-sm card-3d card-sheen"
                style={{ animation: `service-reveal 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both` }}
              >
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: col.color }}>
                  {col.label}
                </p>
                <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed">{col.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cyntexa-style industry scroll — Inteliq content */}
      <IndustryContainer />


      {/* FIND YOUR PATH — tech animated cards */}
      <section
        ref={pathsView.ref}
        className="relative py-16 sm:py-22 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0b1220 0%, #0f1a2e 50%, #0b1220 100%)' }}
      >
        {/* Tech grid bg */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16,185,129,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)',
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.12), transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mb-10">
            <p className="text-emerald-400/90 text-sm font-semibold tracking-[0.16em] uppercase mb-3">
              Find Your Path
            </p>
            <h2
              className="text-[1.65rem] sm:text-[2rem] font-semibold tracking-[-0.025em] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              What are you trying to build?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutionPaths.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 sm:p-6 overflow-hidden transition-all duration-400 hover:border-emerald-500/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.25)]"
                  style={{
                    animation: pathsView.inView
                      ? `service-reveal 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms both`
                      : undefined,
                  }}
                >
                  {/* Glow orb */}
                  <div
                    className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500 blur-2xl"
                    style={{ background: item.glow }}
                  />
                  {/* Scan line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <span
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:border-emerald-400/30"
                    style={{ background: `linear-gradient(135deg, ${item.accent}33, ${item.accent}11)` }}
                  >
                    <Icon size={20} style={{ color: item.accent }} />
                  </span>

                  <h3 className="relative text-[15px] font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="relative text-[12.5px] text-slate-400 mb-4 leading-relaxed">{item.stack}</p>
                  <span className="relative inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-400">
                    {item.cta}
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS — advanced 3D flow */}
      <section ref={processView.ref} className="relative py-20 sm:py-28 overflow-hidden bg-[#070b14]">
        {/* Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(124,58,237,0.1), transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 15%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mb-14 text-center mx-auto">
            <p className="text-emerald-400/90 text-sm font-semibold tracking-[0.16em] uppercase mb-3">
              Our Process
            </p>
            <h2
              className="text-[1.75rem] sm:text-[2.15rem] font-semibold tracking-[-0.025em] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              From first conversation to growth
            </h2>
            <p className="mt-3 text-[14px] text-slate-400 leading-relaxed">
              A clear path from discovery to launch — built so every step compounds into the next.
            </p>
          </div>

          {/* 3D stage */}
          <div
            className="relative mx-auto"
            style={{ perspective: '1800px', maxWidth: 1100 }}
          >
            {/* Glow floor */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] h-24 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.2), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Connecting energy line — desktop */}
            <div className="hidden lg:block absolute top-[52%] left-[6%] right-[6%] h-[2px] -translate-y-1/2 z-0">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #10b98155, #14b8a655, #8b5cf655, transparent)',
                }}
              />
              <div
                className="absolute inset-y-0 w-24 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #34d399, transparent)',
                  animation: 'process-flow 3.2s linear infinite',
                }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 relative z-10">
              {processSteps.map((s, i) => {
                const Icon = s.icon;
                const depth = i % 2 === 0 ? 0 : 28;
                const rot = (i - 2.5) * 3;
                return (
                  <div
                    key={s.id}
                    className="relative"
                    style={{
                      // @ts-expect-error css var
                      '--ty': `${depth}px`,
                      transform: processView.inView ? undefined : `translateY(${depth}px)`,
                      animation: processView.inView
                        ? `process-float-in 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms both`
                        : undefined,
                    }}
                  >
                    <div
                      className="group relative rounded-2xl p-[1px] transition-transform duration-500 hover:-translate-y-3 hover:scale-[1.03]"
                      style={{
                        background:
                          'linear-gradient(145deg, rgba(52,211,153,0.45), rgba(255,255,255,0.06) 40%, rgba(139,92,246,0.3))',
                        transform: `rotateY(${rot * 0.4}deg)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div
                        className="relative rounded-2xl h-full p-4 sm:p-5 overflow-hidden"
                        style={{
                          background: 'linear-gradient(165deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))',
                          boxShadow: '0 20px 40px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                        }}
                      >
                        {/* Hover glow */}
                        <div
                          className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                          style={{ background: 'rgba(16,185,129,0.35)' }}
                        />

                        {/* Index ring */}
                        <div className="relative flex items-center gap-2.5 mb-4">
                          <span
                            className="relative w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, #10b981, #0d9488)',
                              boxShadow: '0 8px 20px rgba(16,185,129,0.35), 0 0 0 1px rgba(255,255,255,0.1)',
                            }}
                          >
                            <Icon size={16} className="text-white" />
                            <span
                              className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: 'conic-gradient(from 0deg, transparent, rgba(52,211,153,0.5), transparent 40%)',
                                animation: 'spin 3s linear infinite',
                              }}
                            />
                          </span>
                          <span className="text-[11px] font-bold tracking-[0.16em] text-emerald-400/90">
                            {s.id}
                          </span>
                        </div>

                        <h3 className="relative text-[14px] sm:text-[15px] font-semibold text-white mb-1.5">
                          {s.title}
                        </h3>
                        <p className="relative text-[11.5px] sm:text-[12px] text-slate-400 leading-relaxed">
                          {s.text}
                        </p>

                        {/* Bottom accent line */}
                        <div
                          className="absolute bottom-0 left-4 right-4 h-px opacity-60"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Connector dot under card on mobile flow feel */}
                    {i < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-emerald-400/60 z-20 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes process-flow {
            0% { left: -10%; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          @keyframes process-float-in {
            from {
              opacity: 0;
              transform: translateY(40px) rotateX(12deg) scale(0.94);
              filter: blur(6px);
            }
            to {
              opacity: 1;
              transform: translateY(var(--ty, 0px)) rotateX(0) scale(1);
              filter: blur(0);
            }
          }
        `}</style>
      </section>

      {/* WHY */}
      <section
        ref={whyView.ref}
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f4f7f5 0%, #eef2f0 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mb-10">
            <p className="text-emerald-600 text-sm font-semibold tracking-[0.16em] uppercase mb-3">Why Inteliq Brijj</p>
            <h2
              className="text-[1.65rem] sm:text-[2rem] font-semibold tracking-[-0.025em] text-slate-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              One connected digital partner
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm card-3d card-sheen"
                  style={{
                    animation: whyView.inView
                      ? `service-reveal 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms both`
                      : undefined,
                  }}
                >
                  <span className="inline-flex w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center mb-3">
                    <Icon size={17} className="text-emerald-600" />
                  </span>
                  <h3 className="text-[14px] font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
            >
              Start Your Project
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
