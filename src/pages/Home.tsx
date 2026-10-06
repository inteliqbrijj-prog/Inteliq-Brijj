import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Target,
  Rocket,
  Eye,
  Code2,
  Smartphone,
  Cloud,
  Brain,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BG_VIDEO, pillars, values } from '../data';
import { useInView } from '../hooks/useInView';
import FlowStack3D from '../components/FlowStack3D';
import { CTASection } from '../components/Shared';
import TechMarquee from '../components/TechMarquee';
import PanelTechBG from '../components/PanelTechBG';
import HierarchyFlow from '../components/HierarchyFlow';
import AboutTeaser from '../components/AboutTeaser';
import WhyChooseSection from '../components/WhyChooseSection';
import ProcessGoalsIndustries from '../components/ProcessGoalsIndustries';
import JaipurSection from '../components/JaipurSection';
import Testimonials from '../components/Testimonials';
import ScrollImageRail from '../components/ScrollImageRail';
import VideoTextReveal from '../components/VideoTextReveal';

const principles = [
  {
    icon: Target,
    title: 'Discover before build',
    description:
      'We map goals and challenges first so every sprint serves a real business outcome — not just features.',
  },
  {
    icon: Rocket,
    title: 'Ship, then refine',
    description:
      'Launch with confidence, then improve from data — testing, analytics and continuous optimisation.',
  },
  {
    icon: Eye,
    title: 'Transparent delivery',
    description:
      'Visible roadmaps, clear priorities and weekly progress — you always know what is being built and why.',
  },
  {
    icon: Shield,
    title: 'Ownership that lasts',
    description:
      'Clean systems and documentation your team can extend — support that continues after go-live.',
  },
];

const capabilityHighlights = [
  {
    icon: Code2,
    title: 'Web platforms',
    description: 'SaaS, dashboards and customer-facing applications engineered for speed and scale.',
    tag: 'Full-stack',
    // Developer coding on screen
    video: 'https://videos.pexels.com/video-files/2278095/2278095-hd_1280_720_30fps.mp4',
  },
  {
    icon: Smartphone,
    title: 'Mobile experiences',
    description: 'React Native & Flutter apps that feel native and retain users.',
    tag: 'iOS · Android',
    // Team collaborating on tablets / devices
    video: 'https://videos.pexels.com/video-files/3255274/3255274-uhd_2560_1440_25fps.mp4',
  },
  {
    icon: Brain,
    title: 'AI systems',
    description: 'Practical LLM integrations and automation that create real leverage.',
    tag: 'Intelligence',
    // Network / neural data visualisation
    video: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4',
  },
  {
    icon: Cloud,
    title: 'Cloud & delivery',
    description: 'Infrastructure as code, CI/CD and observability on AWS, GCP and Azure.',
    tag: 'DevOps',
    // Digital infrastructure / data stream
    video: 'https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4',
  },
];

export default function Home() {
  const introView = useInView(0.12);
  const pillarsView = useInView(0.08);
  const servicesTeaseView = useInView(0.08);
  const principlesView = useInView(0.08);
  const bentoView = useInView(0.08);
  const techView = useInView(0.12);

  return (
    <div className="bg-[#fbfcfb]">
      {/* ========== HERO ========== */}
      <section id="home" className="section-frame cursor-glow relative w-full min-h-[100svh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={BG_VIDEO}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/50 via-transparent to-transparent pointer-events-none" />
        {/* Strong top veil so video orb never collides with navbar visually */}
        <div
          className="absolute top-0 left-0 right-0 h-28 sm:h-32 lg:h-36 pointer-events-none z-[15]"
          style={{
            background: 'linear-gradient(180deg, rgba(6,12,10,0.75) 0%, rgba(6,12,10,0.35) 55%, transparent 100%)',
          }}
        />

        {/* Content sits clearly below fixed navbar */}
        <div className="relative z-20 flex min-h-[100svh] items-center">
          <div className="w-full px-5 sm:px-8 lg:px-12 pt-[6.5rem] sm:pt-[7.25rem] lg:pt-[8rem] pb-16 sm:pb-20 max-w-3xl hero-content-enter">

            <h1 className="type-h1 text-white mb-4">
              IT Solutions & Digital Marketing Services That Bridge Technology and Growth

            </h1>
            <p className="text-white/65 text-[14px] sm:text-[15.5px] leading-[1.65] mb-7 max-w-md" style={{ fontFamily: 'var(--font-sans)' }}>
              Inteliq Brijj Solutions is a Jaipur based IT solutions and digital marketing company helping businesses across India build and grow their digital presence. From websites, mobile apps and custom software to SEO, social media and performance marketing, we bring technology and digital growth together under one roof.

            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="btn-primary type-btn px-5 sm:px-6 py-2.5 sm:py-3 rounded-full btn-shine inline-flex items-center gap-2"
              >
                Get a Free Consultation
                <ArrowRight size={15} />
              </a>
              <Link
                to="/services"
                className="btn-ghost-line liquid-glass type-btn px-5 sm:px-6 py-2.5 sm:py-3 rounded-full inline-flex items-center gap-2"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW WE WORK ========== */}
      <section
        className="relative section-pad overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f2f6f4 0%, #f0f3f1 40%, #e8eeea 100%)' }}
      >
        {/* Soft green wash from top — bridges dark hero into light page */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 right-0 h-40"
            style={{ background: 'linear-gradient(180deg, rgba(12,18,16,0.06) 0%, transparent 100%)' }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.35), transparent)',
              boxShadow: '0 0 40px 6px rgba(16,185,129,0.1)',
            }}
          />
          <div
            className="absolute -top-10 left-[10%] w-[40%] h-[40%] rounded-full opacity-40"
            style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.1), transparent 70%)', filter: 'blur(50px)' }}
          />
          <div className="absolute inset-0 grid-pattern opacity-35" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div ref={introView.ref} className={`reveal-up ${introView.inView ? 'in-view' : ''}`}>
              <p className="type-label text-emerald-600 mb-4">Why Inteliq Brijj</p>
              <h2 className="type-h2 text-slate-900 mb-4">
                One Partner. Built Around Your Business.
              </h2>
              <p className="type-body text-slate-500 max-w-md mb-8">
                Technology and growth planned together around your goals — so what you build and how you reach the market move as one system, not separate vendors.
              </p>

              <div ref={pillarsView.ref} className="space-y-3">
                {pillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className={`reveal-3d group relative overflow-hidden rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 transition-all duration-500 hover:-translate-y-1 ${pillarsView.inView ? 'in-view' : ''
                        }`}
                      style={{
                        transitionDelay: `${i * 90}ms`,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f7faf8 100%)',
                        border: '1px solid rgba(15,23,42,0.06)',
                        boxShadow: '0 4px 20px rgba(15,23,42,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
                      }}
                    >
                      <div
                        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'linear-gradient(180deg, transparent, #10b981, transparent)', boxShadow: '0 0 10px rgba(16,185,129,0.4)' }}
                      />
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #0d9488)',
                          boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                        }}
                      >
                        <Icon size={15} className="text-white" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="type-h3 text-slate-900 mb-0.5" style={{ fontSize: '1.125rem' }}>
                          {pillar.title}
                        </h3>
                        <p className="text-[13px] text-slate-500 leading-[1.6]">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dark glass 3D module — contrast piece on light section */}
            <div
              className={`reveal-up flex justify-center lg:justify-end ${pillarsView.inView ? 'in-view' : ''}`}
              style={{ transitionDelay: '120ms' }}
            >
              <div
                className="relative w-full max-w-[380px] rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #0f1a15 0%, #15241c 100%)',
                  border: '1px solid rgba(16,185,129,0.35)',
                  boxShadow:
                    '0 28px 64px rgba(12,18,16,0.28), 0 0 40px rgba(16,185,129,0.15), inset 0 1px 0 rgba(16,185,129,0.2)',
                }}
              >
                <div
                  className="absolute top-0 left-[12%] right-[12%] h-px z-10"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.55), transparent)',
                    boxShadow: '0 0 24px 3px rgba(16,185,129,0.2)',
                  }}
                />
                <div className="p-1">
                  <FlowStack3D />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutTeaser />

      <VideoTextReveal />

      {/* ========== WHAT WE DO ========== */}
      <section id="services" className="section-frame relative section-pad overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f3f1 0%, #e8eeea 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.06) 0%, transparent 100%)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.35), transparent)', boxShadow: '0 0 30px 4px rgba(16,185,129,0.1)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div
            ref={servicesTeaseView.ref}
            className={`max-w-2xl mb-10 sm:mb-12 reveal-up ${servicesTeaseView.inView ? 'in-view' : ''}`}
          >
            <p className="type-label text-emerald-600 mb-3">What We Deliver</p>
            <h2 className="type-h2 text-slate-900 mb-3">Web, Apps, Software &amp; Digital Marketing</h2>
            <p className="type-body text-slate-500 max-w-lg">
              From websites and mobile apps to SEO, campaigns and performance marketing — technology and visibility connected under one roof.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div
              className={`group relative overflow-hidden rounded-2xl flex flex-col reveal-up ${servicesTeaseView.inView ? 'in-view' : ''}`}
              style={{
                transitionDelay: '80ms',
                background: 'linear-gradient(165deg, #ffffff 0%, #f5f9f7 100%)',
                border: '1px solid rgba(15,23,42,0.07)',
                boxShadow: '0 8px 32px rgba(15,23,42,0.05)',
              }}
            >
              <div className="absolute inset-0 opacity-60 pointer-events-none"><PanelTechBG variant="arch" /></div>
              <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
                <span className="type-label text-emerald-600/80 mb-3">01</span>
                <h3 className="type-h3 text-slate-900 mb-2">IT Solutions</h3>
                <p className="text-[14px] sm:text-[15px] text-slate-500 leading-[1.6] mb-4 max-w-sm">
                  Technology that gives your business a strong digital foundation.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['Web Development', 'App Development', 'Software', 'UI/UX', 'E-commerce'].map((tag) => (
                    <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-emerald-100 text-emerald-700/80 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/services" className="inline-flex items-center gap-2 type-btn text-emerald-600 hover:gap-3 transition-all mt-auto">
                  Explore IT Solutions <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div
              className={`group relative overflow-hidden rounded-2xl flex flex-col reveal-up ${servicesTeaseView.inView ? 'in-view' : ''}`}
              style={{
                transitionDelay: '140ms',
                background: 'linear-gradient(165deg, #ffffff 0%, #f5f9f7 100%)',
                border: '1px solid rgba(15,23,42,0.07)',
                boxShadow: '0 8px 32px rgba(15,23,42,0.05)',
              }}
            >
              <div className="absolute inset-0 opacity-60 pointer-events-none"><PanelTechBG variant="growth" /></div>
              <div className="relative z-10 p-6 sm:p-7 flex flex-col h-full">
                <span className="type-label text-emerald-600/80 mb-3">02</span>
                <h3 className="type-h3 text-slate-900 mb-2">Digital Marketing</h3>
                <p className="text-[14px] sm:text-[15px] text-slate-500 leading-[1.6] mb-4 max-w-sm">
                  Strategies that help your business get found, chosen, and grow.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['SEO', 'Social Media', 'Performance Marketing', 'Content'].map((tag) => (
                    <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-emerald-100 text-emerald-700/80 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/services" className="inline-flex items-center gap-2 type-btn text-emerald-600 hover:gap-3 transition-all mt-auto">
                  Explore Digital Marketing <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BUILD · REACH · GROW — COMPACT FRAMEWORK STRIP ========== */}
      <section className="section-frame relative overflow-hidden" style={{ background: 'linear-gradient(165deg, #eef2f0 0%, #e6ece9 55%, #f4f7f5 100%)', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-40" style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(0,224,138,0.14), transparent 70%)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,224,138,0.55), transparent)', boxShadow: '0 0 50px 8px rgba(0,224,138,0.18)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <p className="type-label mb-3 text-emerald-600">The Brijj Model</p>
            <h2 className="type-h2 mb-3 text-slate-900">
              THE BRIJJ MODEL
            </h2>
            <p className="type-body text-slate-500">
              Build · Reach · Measure · Scale — technology, marketing and strategy connected so what you build and how you grow move together.
            </p>
          </div>

          <HierarchyFlow />
        </div>
      </section>

      <WhyChooseSection />

      <ProcessGoalsIndustries />

      <ScrollImageRail />

      {/* ========== CAPABILITIES — tighter 3D cards with visual headers ========== */}
      <section className="section-frame relative section-pad section-glow grid-pattern bg-[#fbfcfb] overflow-hidden">
        <div className="absolute inset-0 light-orbs pointer-events-none overflow-hidden">
          <div className="orb w-96 h-96 bg-emerald-300/20 top-1/4 -right-28" style={{ animationDelay: '1.2s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div
            ref={bentoView.ref}
            className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal-up ${bentoView.inView ? 'in-view' : ''
              }`}
          >
            <div className="max-w-xl">
              <p className="text-emerald-600 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3">Capability Matrix</p>
              <h2 className="type-h2 text-slate-900">
                Full-Lifecycle Engineering for Digital Products
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm hover:gap-3 transition-all shrink-0 group"
            >
              See what we build
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {capabilityHighlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 reveal-up ${bentoView.inView ? 'in-view' : ''
                    }`}
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    boxShadow: '0 4px 20px rgba(15,23,42,0.04), 0 1px 0 rgba(255,255,255,0.8) inset',
                    transform: 'translateZ(0)',
                  }}
                >
                  {/* Video thumbnail matched to capability */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-[#0a1f18]">
                    <video
                      className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      src={item.video}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(6,12,10,0.15) 0%, rgba(6,12,10,0.55) 100%)',
                      }}
                    />
                    <div className="absolute left-3.5 bottom-3.5 flex items-center gap-2 z-10">
                      <div
                        className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur border border-white/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-400"
                        style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }}
                      >
                        <Icon size={15} className="text-emerald-600" strokeWidth={1.75} />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-100 bg-black/45 backdrop-blur px-2.5 py-1 rounded-full border border-emerald-500/25">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 border-t border-slate-100">
                    <h3 className="text-[15px] font-semibold text-slate-900 mb-1 tracking-[-0.02em] group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-[1.6]">{item.description}</p>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== PRINCIPLES — LIGHT ========== */}
      <section className="section-frame relative section-pad overflow-hidden" style={{ background: '#f0f3f1' }}>
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)' }} />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div
            ref={principlesView.ref}
            className={`max-w-2xl mb-14 reveal-up ${principlesView.inView ? 'in-view' : ''}`}
          >
            <p className="text-emerald-600 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3">What We Stand For</p>
            <h2 className="type-h2 text-slate-900">
              Clear Process. Transparent Delivery. Real Ownership.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`reveal-3d group bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 flex gap-5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-1 ${principlesView.inView ? 'in-view' : ''
                    }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                    <Icon size={18} className="text-white" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-slate-900 mb-1.5 tracking-[-0.02em]">{p.title}</h3>
                    <p className="text-slate-500 text-[13px] sm:text-[13.5px] leading-[1.65] tracking-[-0.01em]">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.label}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/80 text-slate-600 text-sm font-medium shadow-sm"
                >
                  <Icon size={14} className="text-emerald-600" />
                  {v.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== TECH WITH LOGOS ========== */}
      <Testimonials />
      <section className="relative section-pad bg-[#fbfcfb] border-y border-slate-200/80 overflow-hidden">
        <div
          ref={techView.ref}
          className={`max-w-6xl mx-auto px-6 mb-12 text-center reveal-up ${techView.inView ? 'in-view' : ''
            }`}
        >
          <p className="text-emerald-600 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-2">Technology Landscape</p>
          <h2 className="type-h2 text-slate-900">
            Battle-Tested Stack for High-Scale Products
          </h2>
        </div>
        <TechMarquee />

        <JaipurSection />
      </section>

      <CTASection />
    </div>
  );
}
