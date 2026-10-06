import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Code2, Megaphone, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { industryScrollItems } from '../data';

const industries = industryScrollItems.map((item) => {
  const copy: Record<string, { description: string; focus: string[] }> = {
    startups: {
      description: 'Build your digital foundation with the right website, branding, technology and marketing strategy.',
      focus: ['Website Development', 'UI UX', 'SEO', 'Digital Marketing'],
    },
    'ecommerce-retail': {
      description: 'Create better online shopping experiences and reach customers across digital channels.',
      focus: ['E Commerce', 'Shopify', 'WooCommerce', 'SEO', 'Social Media'],
    },
    education: {
      description: 'Build useful digital platforms and improve visibility for education providers and EdTech businesses.',
      focus: ['Websites', 'Software', 'UI UX', 'SEO', 'Digital Marketing'],
    },
    healthcare: {
      description: 'Create professional digital experiences that help your business connect with its audience online.',
      focus: ['Websites', 'UI UX', 'SEO', 'Digital Marketing', 'Social Media'],
    },
    'real-estate': {
      description: 'Build online visibility and generate relevant enquiries through websites, search and digital advertising.',
      focus: ['Websites', 'SEO', 'Google Ads', 'Lead Generation'],
    },
    finance: {
      description: 'Present your business professionally with user focused digital experiences and targeted marketing.',
      focus: ['Websites', 'Software', 'UI UX', 'SEO', 'Digital Marketing'],
    },
    hospitality: {
      description: 'Help customers discover your business through engaging digital experiences and stronger online visibility.',
      focus: ['Websites', 'SEO', 'Social Media', 'Digital Marketing'],
    },
    manufacturing: {
      description: 'Strengthen your digital presence while supporting business operations through technology and marketing.',
      focus: ['Websites', 'Software', 'SEO', 'Digital Marketing'],
    },
    recruitment: {
      description: 'Build a professional digital presence and connect with relevant audiences through targeted digital solutions.',
      focus: ['Websites', 'SEO', 'Social Media', 'Lead Generation'],
    },
    'local-business': {
      description: 'Build local visibility, attract customers and create a stronger digital presence with practical solutions.',
      focus: ['Local SEO', 'Google Business Profile', 'Websites', 'Social Media'],
    },
  };
  return { ...item, ...copy[item.id] };
});

const goals = [
  { title: 'BUILD A STRONG ONLINE PRESENCE', stack: 'Website Development + UI UX + SEO', path: '/it-solutions' },
  { title: 'GENERATE MORE BUSINESS ENQUIRIES', stack: 'SEO + Google Ads + Social Media + Lead Generation', path: '/digital-marketing' },
  { title: 'SELL ONLINE', stack: 'E Commerce + Shopify + WooCommerce + Digital Marketing', path: '/it-solutions#ecommerce' },
  { title: 'AUTOMATE BUSINESS PROCESSES', stack: 'Custom Software + Business Applications + Automation', path: '/it-solutions#software' },
  { title: 'BUILD A MOBILE PRODUCT', stack: 'Mobile App Development + UI UX + Software', path: '/it-solutions#mobile' },
  { title: 'IMPROVE SEARCH VISIBILITY', stack: 'SEO + Content Marketing + Google Business Profile', path: '/digital-marketing#seo' },
];

const goalImages = [0, 4, 1, 7, 2, 9];

const approachSteps = [
  { count: 'Step 1', title: 'Understand', description: 'Your industry, audience and business requirements shape every recommendation.', cards: [
    { heading: 'Industry Context', body: 'We consider how customers in your sector search, decide and buy.' },
    { heading: 'Business Requirements', body: 'Goals, constraints and success measures are clarified up front.' },
    { heading: 'Digital Baseline', body: 'Your current website, marketing and tools are reviewed for practical next steps.' },
  ] },
  { count: 'Step 2', title: 'Plan', description: 'The right technology and digital marketing approach for your goals.', cards: [
    { heading: 'Solution Map', body: 'Website, app, software, SEO or campaigns are prioritised by impact.' },
    { heading: 'Roadmap', body: 'Phased delivery keeps scope clear and progress visible.' },
    { heading: 'Success Metrics', body: 'We define what good looks like so results can be measured.' },
  ] },
  { count: 'Step 3', title: 'Build', description: 'Websites, apps, software and digital experiences.', cards: [
    { heading: 'Websites and Apps', body: 'Built around your industry needs and the way your customers use them.' },
    { heading: 'Software and E Commerce', body: 'Business applications, online stores and automation that fit your process.' },
    { heading: 'UI UX Design', body: 'Clear, user focused interfaces that make it easy to take the next step.' },
  ] },
  { count: 'Step 4', title: 'Reach', description: 'Customers through SEO, advertising, content and social media.', cards: [
    { heading: 'Search Visibility', body: 'SEO and Google Business Profile help the right customers find you.' },
    { heading: 'Advertising', body: 'Google Ads and lead generation campaigns bring in relevant enquiries.' },
    { heading: 'Content and Social', body: 'Consistent content and social media keep your audience engaged.' },
  ] },
  { count: 'Step 5', title: 'Improve', description: 'Use insights and performance data to refine your digital presence.', cards: [
    { heading: 'Measure', body: 'Traffic, enquiries and product usage show what is working.' },
    { heading: 'Optimise', body: 'UX, content and campaigns are adjusted based on real behaviour.' },
    { heading: 'Grow', body: 'Your digital foundation expands as your business grows.' },
  ] },
];

const connected = [
  { icon: Code2, title: 'IT SOLUTIONS', text: 'Websites · Apps · Software · UI UX · E Commerce' },
  { icon: Megaphone, title: 'DIGITAL MARKETING', text: 'SEO · Google Ads · Content · Social Media · Lead Generation' },
  { icon: Target, title: 'BUSINESS FOCUS', text: 'Solutions shaped around your industry, audience and goals.' },
];

const faqs = [
  ['Which industries does Inteliq Brijj Solutions serve?', 'We provide digital solutions for startups, e commerce, education, healthcare, real estate, professional services, hospitality, manufacturing, recruitment and local businesses.'],
  ['Can you create industry specific websites?', 'Yes. Website structure, design and functionality can be planned around your industry, audience and business requirements.'],
  ['Do you provide both IT and digital marketing services?', 'Yes. Our services include website development, software, mobile apps, UI UX, e commerce, SEO, digital marketing and social media marketing.'],
  ['Do you work with businesses outside Jaipur?', 'Yes. Inteliq Brijj Solutions is based in Jaipur and serves businesses across India.'],
];

function IndustryServe() {
  const [selected, setSelected] = useState(0);
  const selectedIndustry = industries[selected];

  useEffect(() => {
    const timer = window.setTimeout(() => setSelected((current) => (current + 1) % industries.length), 5200);
    return () => window.clearTimeout(timer);
  }, [selected]);

  return (
    <section className="industry-serve section-light" id="industries-we-serve">
      <div className="industry-wrap">
        <div className="industry-heading centered">
          <span className="industry-kicker">INDUSTRIES WE SERVE</span>
          <h2>Technology and Marketing for Modern Businesses</h2>
          <p>Whether you are launching a new business, improving an existing digital presence or looking to reach more customers, our solutions can be adapted to your industry and business goals.</p>
        </div>

        <div className="industry-orbit" aria-label="Industries we serve">
          <div className="industry-orbit-line" aria-hidden="true" />
          <svg className="industry-orbit-spokes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {industries.map((industry, index) => {
              const angle = (index / industries.length) * Math.PI * 2 - Math.PI / 2;
              return <line key={industry.id} className={selected === index ? 'on' : ''} x1="50" y1="50" x2={50 + Math.cos(angle) * 43} y2={50 + Math.sin(angle) * 40} />;
            })}
          </svg>
          <div className="industry-orbit-halo" aria-hidden="true">
            <i className="h1" /><i className="h2" /><i className="h3" />
            <b className="sat a" /><b className="sat b" /><b className="sat c" />
          </div>
          <div className="industry-orbit-center">
            <span>INTELIQ BRIJJ</span>
            <strong>Digital solutions<br />around your industry</strong>
            <em>{String(selected + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}</em>
          </div>
          {industries.map((industry, index) => {
            const angle = (index / industries.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 43;
            const y = 50 + Math.sin(angle) * 40;
            return (
              <button
                key={industry.id}
                type="button"
                className={`industry-orbit-card ${selected === index ? 'active' : ''}`}
                style={{ left: `${x}%`, top: `${y}%`, ['--accent' as string]: industry.accent }}
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
              >
                <span className="industry-number">{String(index + 1).padStart(2, '0')}</span>
                <span>{industry.title}</span>
                {selected === index && <i className="ob" />}
              </button>
            );
          })}
        </div>

        <div className="industry-detail" key={selectedIndustry.id}>
          <div className="industry-detail-image">
            <img src={selectedIndustry.image} alt="" />
            <span>{String(selected + 1).padStart(2, '0')}</span>
          </div>
          <div className="industry-detail-copy">
            <span className="industry-detail-label">SELECTED INDUSTRY</span>
            <h3>{selectedIndustry.title}</h3>
            <p>{selectedIndustry.description}</p>
            <div className="industry-focus">
              {selectedIndustry.focus.map((item) => <span key={item}><Check size={14} /> {item}</span>)}
            </div>
            <div className="industry-actions">
              <Link to={selectedIndustry.path} className="industry-btn dark">Explore Solutions <ArrowRight size={15} /></Link>
              <Link to="/contact" className="industry-btn light">Talk to Our Team</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GoalSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="industry-goals section-white" id="digital-goals">
      <div className="industry-wrap">
        <div className="industry-heading centered">
          <span className="industry-kicker">YOUR INDUSTRY. YOUR DIGITAL GOALS.</span>
          <h2>What Are You Looking to Achieve?</h2>
        </div>
        <div className="goal-layout">
          <div className="goal-list">
            {goals.map((goal, index) => (
              <button key={goal.title} type="button" className={`goal-row ${active === index ? 'active' : ''}`} onClick={() => setActive(index)}>
                <span className="goal-index">0{index + 1}</span>
                <span className="goal-row-title">{goal.title}</span>
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
          <div className="goal-detail" key={active}>
            <img className="goal-detail-img" src={industries[goalImages[active]].image} alt="" />
            <span className="goal-detail-no">0{active + 1}</span>
            <span className="industry-detail-label">DIGITAL GOAL</span>
            <h3>{goals[active].title}</h3>
            <p>{goals[active].stack}</p>
            <Link to={goals[active].path} className="industry-btn dark">Explore Solutions <ArrowRight size={15} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-frame">
        <video src="/industries-hero.mp4" poster="/industries-hero-poster.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      </div>
    </div>
  );
}

const revealStats = [
  { to: industries.length, suffix: '+', label: 'Industries served' },
  { to: 5, suffix: '+', label: 'IT services' },
  { to: 10, suffix: '+', label: 'Marketing channels' },
  { to: 1, suffix: '', label: 'Team, build and reach' },
];

function ImageScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = clamp(-r.top / span);
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--e', (1 - Math.pow(1 - clamp(p * 2.4), 3)).toFixed(4));
      el.style.setProperty('--s', clamp((p - 0.02) * 5).toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const text = 'Every industry buys differently. A clinic, a retail brand and a start-up each need a different website, a different search plan and a different story. We shape technology and digital marketing together around your audience, so the whole experience works as one.';
  const words = text.split(' ');
  const chips = [...industries, ...industries];
  return (
    <section ref={ref} className="scroll-reveal">
      <div className="scroll-reveal-pin">
        <div className="scroll-reveal-img">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&auto=format&fit=crop" alt="" />
          <div className="scroll-reveal-shade" />
          <div className="sr-orb o1" /><div className="sr-orb o2" />
        </div>
        <div className="industry-wrap scroll-reveal-text">
          <span className="industry-kicker sr-kicker">BUILT FOR YOUR SECTOR</span>
          <h2>One Team for Technology and Marketing</h2>
          <p>{words.map((w, n) => <span key={n} className="sr-w" style={{ ['--i' as string]: n / words.length }}>{w} </span>)}</p>
          <Link to="/contact" className="industry-btn white sr-cta">Talk to Our Team <ArrowRight size={15} /></Link>
          <div className="sr-stats">
            {revealStats.map((st, n) => (
              <div className="sr-stat" key={st.label} style={{ ['--k' as string]: n }}>
                <b><CountUp to={st.to} suffix={st.suffix} /></b><span>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sr-marquee" aria-hidden="true">
          <div className="sr-track">
            {chips.map((c, n) => <span key={n}>{c.title}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { setV(0); return; }
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 1200);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

type Step = typeof approachSteps[number];

function StackBlock({ step }: { step: Step }) {
  const block = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const n = step.cards.length;
  useEffect(() => {
    const bl = block.current, fr = frame.current;
    if (!bl || !fr) return;
    const cards = Array.from(fr.querySelectorAll<HTMLElement>('.stack-card'));
    const dots = Array.from(fr.querySelectorAll<HTMLElement>('.stack-dots i'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pin = 88, travel = 1, raf = 0, cur = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const read = () => clamp((pin - bl.getBoundingClientRect().top) / travel) * (n - 1);
    const paint = () => {
      cards.forEach((c, i) => {
        const raw = i === 0 ? 1 : clamp(cur - (i - 1));
        const t = ease(raw);
        const t2 = ease(clamp(raw * 1.6 - 0.6));
        const buried = Math.min(1.6, Math.max(0, cur - i));
        c.style.setProperty('--t', t.toFixed(4));
        c.style.setProperty('--t2', t2.toFixed(4));
        c.style.setProperty('--b', buried.toFixed(3));
        c.style.opacity = String(Math.min(1, raw * 5));
        c.style.transform = `translate3d(0,${((1 - t) * 130).toFixed(1)}px,0) rotateX(${((1 - t) * -18).toFixed(2)}deg) scale(${(1 - Math.max(0, cur - i) * 0.03).toFixed(4)})`;
        c.style.filter = t < 0.995 ? `blur(${((1 - t) * 5).toFixed(2)}px)` : '';
      });
      dots.forEach((d, i) => d.style.setProperty('--f', clamp(cur - i + 1).toFixed(3)));
      bl.dataset.active = String(Math.min(n - 1, Math.round(cur)));
    };
    const loop = () => {
      raf = 0;
      const target = read();
      const d = target - cur;
      cur = reduce || Math.abs(d) < 0.0008 ? target : cur + d * 0.13;
      paint();
      if (cur !== target) raf = requestAnimationFrame(loop);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const measure = () => {
      const fh = fr.offsetHeight;
      pin = window.innerWidth < 680 ? 92 : 112;
      fr.style.top = `${pin}px`;
      travel = (n - 1) * Math.max(240, window.innerHeight * 0.36);
      bl.style.height = `${fh + travel}px`;
      cur = read();
      paint();
    };
    measure();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', measure);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', measure); if (raf) cancelAnimationFrame(raf); };
  }, [n]);
  return (
    <div className="stack-block" ref={block} data-active="0">
      <div className="stack-frame" ref={frame}>
        <div className="stack-left">
          <span className="stack-count">{step.count}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <div className="stack-dots">{step.cards.map((c) => <i key={c.heading} />)}</div>
        </div>
        <div className="stack-cards" style={{ ['--n' as string]: n }}>
          {step.cards.map((card, i) => (
            <article key={card.heading} className="stack-card" data-n={i + 1} style={{ top: `calc(${i} * var(--peek))`, zIndex: i + 1 }}>
              <span className="sheen" aria-hidden="true" />
              <h4>{i + 1}. {card.heading}</h4>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApproachStack() {
  return (
    <section className="approach-stack section-white" id="our-approach">
      <div className="industry-wrap">
        <div className="industry-heading centered">
          <span className="industry-kicker">FROM BUSINESS NEED TO DIGITAL SOLUTION</span>
          <h2>From Understanding to Growth</h2>
          <p>Scroll to watch each stage build on the last, from first conversation to measurable results.</p>
        </div>
        <div className="stack-steps">
          {approachSteps.map((step) => <StackBlock key={step.title} step={step} />)}
        </div>
      </div>
    </section>
  );
}

function ConnectedSection() {
  return (
    <section className="connected section-white">
      <div className="industry-wrap">
        <div className="industry-heading centered">
          <span className="industry-kicker">ONE CONNECTED PARTNER FOR YOUR BUSINESS</span>
          <h2>Technology + Marketing + Growth</h2>
          <p>Your digital presence works best when different parts work together.</p>
        </div>
        <div className="connected-grid">
          {connected.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="connected-card" key={item.title} style={{ ['--delay' as string]: `${index * 100}ms` }}>
                <div className="connected-icon"><Icon size={20} /></div>
                <span className="connected-no">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq section-light">
      <div className="industry-wrap narrow">
        <div className="industry-heading centered">
          <span className="industry-kicker">FREQUENTLY ASKED QUESTIONS</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}>
              <button type="button" onClick={() => setOpen(open === index ? null : index)}>
                <span>{question}</span><ChevronDown size={19} />
              </button>
              <div className="faq-answer"><p>{answer}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="industry-final-cta">
      <div className="industry-final-glow" aria-hidden="true" />
      <div className="industry-wrap narrow centered final-content">
        <span className="industry-kicker">BUILD FOR YOUR INDUSTRY. GROW YOUR BUSINESS.</span>
        <h2>Have a Digital Challenge?</h2>
        <p>Whether you need a website, application, software, e commerce solution, SEO or digital marketing, let's find the right approach for your business.</p>
        <div className="industry-actions centered-actions">
          <Link to="/contact" className="industry-btn white">Start Your Project <ArrowRight size={15} /></Link>
          <Link to="/contact" className="industry-btn outline">Get a Consultation</Link>
        </div>
      </div>
    </section>
  );
}

export default function Industries() {
  const styles = useMemo(() => `
    .industries-page{font-family:'Manrope','Inter',system-ui,sans-serif;background:#f7f9fc;color:#0f172a;overflow-x:clip;--ind-ink:#0f172a;--ind-muted:#5b6b82;--ind-green:#059669;--ind-border:#dfe7ef;--stack-top:6.5rem}
    .industries-page h1,.industries-page h2,.industries-page h3,.industries-page h4{font-family:'Manrope','Inter',system-ui,sans-serif}
    .industry-wrap{width:min(1180px,calc(100% - 64px));margin:0 auto;position:relative;z-index:2}.industry-wrap.narrow{width:min(860px,calc(100% - 64px))}
    .section-light{background:#f7f9fc}.section-white{background:#fff}.section-dark{background:#07101d}
    .industry-kicker{display:inline-block;color:#059669;font-size:11.5px;font-weight:800;letter-spacing:.18em;line-height:1.3;text-transform:uppercase}

    /* HERO: text left, visual right */
    .industry-hero{padding:128px 0 84px;position:relative;overflow:hidden;background:#f7f9fc}
    .hero-aurora{position:absolute;inset:-20% -10%;background:radial-gradient(circle at 15% 25%,rgba(16,185,129,.16),transparent 34%),radial-gradient(circle at 85% 20%,rgba(34,195,238,.15),transparent 30%),radial-gradient(circle at 55% 80%,rgba(139,92,246,.09),transparent 32%);filter:blur(34px);animation:heroDrift 14s ease-in-out infinite alternate}
    .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(15,23,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.04) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(70% 80% at 50% 40%,#000,transparent);-webkit-mask-image:radial-gradient(70% 80% at 50% 40%,#000,transparent)}
    .hero-inner{display:grid;grid-template-columns:minmax(0,1.02fr) minmax(0,.98fr);gap:64px;align-items:center}
    .hero-text{text-align:left;max-width:600px}
    .hero-pill{padding:7px 14px;border:1px solid #bcefdc;border-radius:999px;background:rgba(255,255,255,.85);box-shadow:0 10px 26px rgba(16,185,129,.08)}
    .hero-title{font-size:clamp(2rem,3.5vw,3.25rem);line-height:1.12;letter-spacing:-.03em;font-weight:750;margin:20px 0 18px}
    .hero-title span{background:linear-gradient(100deg,#0d9488,#059669,#6366f1,#3b82f6);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:180% 100%;animation:gradientMove 7s linear infinite}
    .hero-copy{max-width:520px;margin:0;color:#5b6b82;font-size:clamp(15px,1.15vw,17px);line-height:1.7}
    .hero-actions{margin-top:28px;display:flex;gap:12px;flex-wrap:wrap}
    .industry-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 20px;border-radius:999px;font-size:14px;font-weight:700;transition:.25s ease;white-space:nowrap}.industry-btn:hover{transform:translateY(-2px)}.industry-btn.dark{background:#0f172a;color:#fff;box-shadow:0 12px 24px rgba(15,23,42,.15)}.industry-btn.light{background:#fff;color:#0f172a;border:1px solid #dfe7ef}.industry-btn.white{background:#fff;color:#0f172a}.industry-btn.outline{border:1px solid rgba(255,255,255,.24);color:#fff;background:rgba(255,255,255,.06)}
    .hero-visual{position:relative}
    .hero-frame{position:relative;aspect-ratio:16/10;border-radius:24px;overflow:hidden;background:linear-gradient(145deg,#12263a,#0b1424);box-shadow:0 36px 70px -28px rgba(15,23,42,.45),0 0 0 1px rgba(15,23,42,.06)}
    .hero-frame video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
    .hero-frame-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,16,29,0) 60%,rgba(7,16,29,.35));pointer-events:none}
    .hero-chip{position:absolute;display:inline-flex;align-items:center;gap:7px;padding:9px 14px;border-radius:999px;background:rgba(255,255,255,.96);border:1px solid #e2eaf1;box-shadow:0 14px 30px rgba(15,23,42,.12);font-size:12.5px;font-weight:700;color:#0f172a;animation:chipFloat 6s ease-in-out infinite}.hero-chip svg{color:#059669}.hero-chip.c1{left:-22px;top:14%}.hero-chip.c2{right:-18px;top:44%;animation-delay:-3s}
    .hero-stat{position:absolute;right:26px;bottom:0;padding:12px 18px;border-radius:16px;background:#0f172a;color:#fff;box-shadow:0 18px 34px rgba(15,23,42,.28);display:flex;align-items:baseline;gap:10px}.hero-stat b{font-size:22px;letter-spacing:-.02em;color:#6ee7b7}.hero-stat span{font-size:12px;color:#b6c3d4;font-weight:600}

    /* shared section headings */
    .industry-heading{text-align:left;max-width:720px}.industry-heading.centered{text-align:center;margin:0 auto}
    .industry-heading h2{font-size:clamp(1.65rem,2.7vw,2.4rem);line-height:1.15;letter-spacing:-.03em;margin:12px 0 14px;font-weight:750}
    .industry-heading p{color:#5b6b82;font-size:clamp(15px,1.1vw,16.5px);line-height:1.7;max-width:660px;margin:0 auto}

    /* industries orbit */
    .industry-serve{padding:96px 0 104px}
    .industry-orbit{height:700px;max-width:1120px;margin:48px auto 24px;position:relative}.industry-orbit-line{position:absolute;inset:16% 22%;border:1px solid #d9e6ef;border-radius:50%;box-shadow:0 0 0 28px rgba(16,185,129,.018),0 0 0 56px rgba(14,165,233,.018);animation:orbitPulse 5s ease-in-out infinite}.industry-orbit-line:after{content:'';position:absolute;inset:13%;border:1px dashed #dce7ee;border-radius:50%;animation:orbitSpin 30s linear infinite}
    .industry-orbit-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:190px;height:190px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:radial-gradient(circle at 35% 30%,#1b2a3e,#0c1727);color:#fff;box-shadow:0 30px 60px rgba(15,23,42,.2),0 0 0 12px rgba(255,255,255,.6);z-index:2}.industry-orbit-center span{font-size:9.5px;letter-spacing:.2em;color:#7ee7bc;font-weight:800}.industry-orbit-center strong{font-size:16px;line-height:1.3;margin-top:8px;letter-spacing:-.01em}
    .industry-orbit-spokes{position:absolute;inset:0;width:100%;height:100%;overflow:visible;z-index:1}.industry-orbit-spokes line{stroke:#d5e2ec;stroke-width:1;stroke-dasharray:2 6;vector-effect:non-scaling-stroke;transition:stroke .4s}.industry-orbit-spokes line.on{stroke:#10b981;stroke-width:2;stroke-dasharray:7 9;animation:spokeFlow .9s linear infinite}
    .industry-orbit-halo{position:absolute;left:50%;top:50%;width:330px;height:330px;margin:-165px 0 0 -165px;z-index:1;pointer-events:none}.industry-orbit-halo i{position:absolute;border-radius:50%}.industry-orbit-halo .h1{inset:0;border:1px dashed #b9cfdc;animation:orbitSpin 40s linear infinite reverse}.industry-orbit-halo .h2{inset:34px;background:conic-gradient(from 0deg,rgba(16,185,129,0),rgba(16,185,129,.35),rgba(56,189,248,.35),rgba(16,185,129,0) 70%);-webkit-mask:radial-gradient(circle,transparent 62%,#000 63%,#000 66%,transparent 67%);mask:radial-gradient(circle,transparent 62%,#000 63%,#000 66%,transparent 67%);animation:orbitSpin 7s linear infinite}.industry-orbit-halo .h3{inset:62px;border:1px solid rgba(16,185,129,.35);animation:ripple 3.6s ease-out infinite}
    .industry-orbit-halo .sat{position:absolute;left:50%;top:50%;width:0;height:0;animation:orbitSpin 14s linear infinite}.industry-orbit-halo .sat:after{content:'';position:absolute;left:-5px;top:-165px;width:10px;height:10px;border-radius:50%;background:#10b981;box-shadow:0 0 0 4px rgba(16,185,129,.18),0 0 14px #34d399}.industry-orbit-halo .sat.b{animation-duration:22s;animation-direction:reverse}.industry-orbit-halo .sat.b:after{top:-131px;background:#38bdf8;box-shadow:0 0 0 4px rgba(56,189,248,.18),0 0 14px #7dd3fc}.industry-orbit-halo .sat.c{animation-duration:30s}.industry-orbit-halo .sat.c:after{top:-165px;width:7px;height:7px;left:-3.5px;background:#a78bfa;box-shadow:0 0 12px #c4b5fd}
    .industry-orbit-center em{font:700 10.5px ui-monospace,monospace;font-style:normal;color:#7ee7bc;margin-top:10px;letter-spacing:.08em;opacity:.85}
    .industry-orbit-card .ob{position:absolute;left:14px;right:14px;bottom:8px;height:3px;border-radius:3px;background:linear-gradient(90deg,#34d399,#38bdf8);transform-origin:0 50%;animation:itBar 5.2s linear forwards}
    @keyframes spokeFlow{to{stroke-dashoffset:-32}}@keyframes ripple{0%{transform:scale(.8);opacity:.9}100%{transform:scale(1.5);opacity:0}}@keyframes itBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    .industry-orbit-card{position:absolute;transform:translate(-50%,-50%);width:170px;min-height:76px;padding:14px 14px 14px 40px;text-align:left;border:1px solid #dfe8ef;background:rgba(255,255,255,.94);border-radius:18px;color:#334155;font-size:12.5px;font-weight:700;line-height:1.3;box-shadow:0 16px 32px rgba(15,23,42,.08);backdrop-filter:blur(12px);transition:.35s cubic-bezier(.16,1,.3,1);z-index:3}.industry-orbit-card:hover,.industry-orbit-card.active{border-color:#6ee7b7;transform:translate(-50%,-50%) scale(1.05);box-shadow:0 20px 40px rgba(15,23,42,.12),0 0 0 3px rgba(16,185,129,.08)}.industry-number{position:absolute;left:13px;top:14px;color:#94a3b8;font-size:11px;font-family:ui-monospace,monospace}.industry-orbit-card.active .industry-number{color:#059669}
    .industry-detail{display:grid;grid-template-columns:1.05fr .95fr;align-items:stretch;overflow:hidden;height:430px;border:1px solid #dfe7ef;border-radius:26px;background:#fff;box-shadow:0 28px 70px rgba(15,23,42,.08);animation:detailIn .55s both}.industry-detail-image{position:relative;height:100%;overflow:hidden;background:#e6edf4}.industry-detail-image img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.9)}.industry-detail-image>span{position:absolute;left:20px;top:18px;z-index:2;color:#fff;background:rgba(15,23,42,.4);padding:5px 10px;border-radius:999px;font:700 11px ui-monospace,monospace;backdrop-filter:blur(8px)}
    .industry-detail-copy{padding:44px 44px;display:flex;flex-direction:column;justify-content:center}.industry-detail-label{font-size:10.5px;letter-spacing:.18em;font-weight:800;color:#059669}.industry-detail-copy h3{font-size:clamp(1.4rem,2.1vw,1.9rem);line-height:1.15;letter-spacing:-.025em;margin:12px 0 12px;font-weight:750}.industry-detail-copy p{color:#5b6b82;font-size:15px;line-height:1.7;margin:0;max-width:480px}.industry-focus{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 6px}.industry-focus span{display:inline-flex;align-items:center;gap:6px;background:#f1f7f4;border:1px solid #dceee6;border-radius:999px;padding:7px 11px;color:#365168;font-size:12px;font-weight:650}.industry-focus svg{color:#059669}.industry-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}

    /* image + scroll text reveal (centred) */
    .scroll-reveal{position:relative;height:210vh;background:#fff}
    .scroll-reveal-pin{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;perspective:1600px}
    .scroll-reveal-img{position:absolute;inset:0;background:#0f172a;overflow:hidden;opacity:calc(.15 + var(--s,0) * .85);transform:rotateX(calc((1 - var(--e,0)) * 18deg)) scale(calc(.8 + var(--e,0) * .2));border-radius:calc((1 - var(--e,0)) * 36px);will-change:transform}
    .scroll-reveal-img img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.2 - var(--e,0) * .2))}
    .scroll-reveal-shade{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(7,11,20,.6),rgba(7,11,20,.9));opacity:var(--s,0)}
    .sr-orb{position:absolute;border-radius:50%;filter:blur(70px);opacity:calc(var(--s,0) * .55);animation:orbDrift 9s ease-in-out infinite alternate}.sr-orb.o1{width:420px;height:420px;left:-80px;top:-60px;background:#10b981}.sr-orb.o2{width:380px;height:380px;right:-60px;bottom:40px;background:#3b82f6;animation-delay:-4s}
    .scroll-reveal-text{text-align:center;display:flex;flex-direction:column;align-items:center;padding-bottom:56px}
    .scroll-reveal-text>*{max-width:720px}
    .scroll-reveal-text .sr-kicker{color:#34d399;opacity:calc(.35 + var(--s,0) * .65)}
    .scroll-reveal-text h2{font-size:clamp(1.65rem,2.9vw,2.5rem);line-height:1.15;letter-spacing:-.03em;font-weight:750;margin:14px 0 18px;color:rgb(calc(15 + 240 * var(--s,0)),calc(23 + 232 * var(--s,0)),calc(42 + 213 * var(--s,0)))}
    .scroll-reveal-text p{font-size:clamp(15px,1.3vw,17.5px);line-height:1.8;margin:0}
    .sr-w{color:rgb(calc(15 + 240 * var(--s,0)),calc(23 + 232 * var(--s,0)),calc(42 + 213 * var(--s,0)));opacity:clamp(.2,calc((var(--p,0) * 2.2 - var(--i,0)) * 7 + .2),1)}
    .sr-cta{margin-top:24px;opacity:clamp(0,calc((var(--p,0) - .35) * 6),1);transform:translateY(calc((1 - clamp(0,(var(--p,0) - .35) * 6,1)) * 14px))}
    .sr-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:34px;width:100%;max-width:760px}
    .sr-stat{padding:16px 12px;border-radius:16px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(10px);color:#fff;text-align:center;opacity:clamp(0,calc((var(--p,0) - .3 - var(--k,0) * .06) * 7),1);transform:translateY(calc((1 - clamp(0,(var(--p,0) - .3 - var(--k,0) * .06) * 7,1)) * 24px))}
    .sr-stat b{display:block;font-size:clamp(1.3rem,2vw,1.75rem);letter-spacing:-.02em;color:#6ee7b7;font-weight:800}.sr-stat>span{display:block;margin-top:2px;font-size:12px;color:#c5d1e0;font-weight:600}
    .sr-marquee{position:absolute;left:0;right:0;bottom:22px;overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);opacity:clamp(0,calc((var(--p,0) - .2) * 6),1)}
    .sr-track{display:flex;gap:10px;width:max-content;animation:srScroll 38s linear infinite}.sr-track span{padding:7px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.2);color:#dbe5f0;font-size:12px;font-weight:650;white-space:nowrap;background:rgba(255,255,255,.06)}

    /* goals */
    .industry-goals{padding:96px 0 104px}.goal-layout{display:grid;grid-template-columns:1fr .86fr;gap:26px;align-items:stretch;margin-top:44px}.goal-list{display:grid;gap:9px}.goal-row{width:100%;display:grid;grid-template-columns:40px 1fr auto;align-items:center;gap:10px;text-align:left;padding:17px 18px;border:1px solid #e1e8ef;background:#fff;border-radius:16px;color:#42536b;transition:.28s ease}.goal-row:hover,.goal-row.active{border-color:#9ce5c5;box-shadow:0 12px 28px rgba(15,23,42,.06);transform:translateX(4px);color:#0f172a}.goal-row.active{background:#fbfefd}.goal-index{font:700 11px ui-monospace,monospace;color:#94a3b8}.goal-row-title{font-size:12.5px;font-weight:800;letter-spacing:.02em}
    .goal-detail{position:relative;overflow:hidden;border-radius:24px;background:#0f172a;color:#fff;padding:36px;min-height:100%;display:flex;flex-direction:column;justify-content:flex-end;animation:detailIn .5s both}.goal-detail-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.32;animation:imgZoom 6s ease-out both}.goal-detail:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,23,42,.35),rgba(15,23,42,.92) 78%);z-index:1}.goal-detail>*:not(.goal-detail-img){position:relative;z-index:2}
    .goal-detail-no{position:absolute!important;right:24px;top:14px;font-size:72px;line-height:1;font-weight:800;color:rgba(255,255,255,.1)}.goal-detail h3{font-size:clamp(1.25rem,1.8vw,1.6rem);line-height:1.2;letter-spacing:-.025em;max-width:430px;margin:12px 0 10px;font-weight:750}.goal-detail p{color:#b6c4d6;font-size:14.5px;line-height:1.7;max-width:420px;margin:0}.goal-detail .industry-btn{align-self:flex-start;margin-top:18px}

    /* approach: one fixed frame per step, cards slide over each other */
    .approach-stack{padding:88px 0 56px}
    .stack-steps{margin-top:36px}
    .stack-block{position:relative;margin-bottom:28px}
    .stack-frame{--peek:16px;--card-h:9rem;position:sticky;display:grid;grid-template-columns:.8fr 1.2fr;gap:3.5rem;align-items:center}
    .stack-count{display:block;font-size:13px;color:#94a3b8;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
    .stack-left h3{font-size:clamp(1.5rem,2.3vw,2rem);font-weight:750;letter-spacing:-.03em;margin:6px 0 10px;line-height:1.1}
    .stack-left p{color:#5b6b82;font-size:15px;line-height:1.65;max-width:380px;margin:0}
    .stack-dots{display:flex;gap:6px;margin-top:18px}.stack-dots i{position:relative;overflow:hidden;width:38px;height:4px;border-radius:4px;background:#e2e8f0}.stack-dots i:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#34d399,#38bdf8);transform:scaleX(var(--f,0));transform-origin:0 50%}
    .stack-cards{perspective:1100px}
    .stack-card:before{content:'';position:absolute;inset:0;background:#eef2f7;opacity:calc(var(--b,0) * .34);pointer-events:none;z-index:2}
    .stack-card .sheen{position:absolute;top:0;bottom:0;left:-40%;width:40%;background:linear-gradient(100deg,transparent,rgba(52,211,153,.2),transparent);transform:translateX(calc(var(--t,1) * 450%));opacity:calc(var(--t,1) * (1 - var(--t,1)) * 4);pointer-events:none}
    .stack-card h4{transform:translateY(calc((1 - var(--t2,1)) * 16px));opacity:var(--t2,1)}.stack-card p{transform:translateY(calc((1 - var(--t2,1)) * 24px));opacity:var(--t2,1)}
    .stack-cards{position:relative;height:calc(var(--card-h) + (var(--n) - 1) * var(--peek))}
    .stack-card{position:absolute;left:0;right:0;height:var(--card-h);padding:20px 24px;border-radius:20px;border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(120deg,#34d399,#38bdf8,#a78bfa) border-box;box-shadow:0 -6px 18px -10px rgba(15,23,42,.18),0 18px 36px -22px rgba(15,23,42,.4);overflow:hidden;transform-origin:50% 0;will-change:transform,opacity}
    .stack-card:after{content:attr(data-n);position:absolute;right:18px;top:-8px;font-size:4.5rem;font-weight:800;letter-spacing:-.06em;color:rgba(16,185,129,.1)}
    .stack-card h4{font-size:16px;font-weight:700;margin:0 0 6px;letter-spacing:-.01em}.stack-card p{color:#5b6b82;line-height:1.65;max-width:430px;font-size:14.5px;margin:0}

    /* connected */
    .connected{padding:96px 0}.connected-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:44px}.connected-card{position:relative;min-height:210px;padding:28px;border:1px solid #dfe7ef;border-radius:22px;background:#fff;overflow:hidden;transition:.3s;animation:cardIn .7s var(--delay) both}.connected-card:hover{transform:translateY(-6px);box-shadow:0 24px 50px rgba(15,23,42,.09);border-color:#b9e8d3}.connected-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:12px;background:#ecfdf5;color:#059669}.connected-no{position:absolute;right:20px;top:16px;color:#e7edf2;font:700 44px ui-monospace,monospace}.connected-card h3{font-size:16px;margin:30px 0 10px;letter-spacing:-.01em;font-weight:750}.connected-card p{color:#5b6b82;font-size:14px;line-height:1.7;max-width:290px;margin:0}

    /* faq */
    .faq{padding:96px 0 104px}.faq-list{display:grid;gap:10px;margin-top:38px}.faq-item{border:1px solid #dfe7ef;border-radius:16px;background:#fff;overflow:hidden;transition:.25s}.faq-item.open{border-color:#a9e7cc;box-shadow:0 12px 32px rgba(15,23,42,.055)}.faq-item button{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 22px;text-align:left;font-size:15px;font-weight:700;color:#172235}.faq-item button svg{flex:none;color:#059669;transition:transform .3s}.faq-item.open button svg{transform:rotate(180deg)}.faq-answer{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s cubic-bezier(.16,1,.3,1)}.faq-item.open .faq-answer{grid-template-rows:1fr}.faq-answer p{overflow:hidden;padding:0 22px;color:#5b6b82;font-size:14.5px;line-height:1.75;margin:0}.faq-item.open .faq-answer p{padding-bottom:20px}

    /* final cta */
    .industry-final-cta{position:relative;overflow:hidden;padding:104px 0;background:#07101d;color:#fff}.industry-final-glow{position:absolute;inset:-30%;background:radial-gradient(circle at 50% 50%,rgba(16,185,129,.19),transparent 35%),radial-gradient(circle at 80% 25%,rgba(59,130,246,.13),transparent 24%);filter:blur(20px)}.final-content{position:relative}.final-content h2{font-size:clamp(1.8rem,3.2vw,2.75rem);line-height:1.12;letter-spacing:-.03em;margin:14px 0;font-weight:750}.final-content p{color:#9eacbd;max-width:640px;margin:0 auto;font-size:clamp(15px,1.1vw,16.5px);line-height:1.7}.centered-actions{justify-content:center}.centered{text-align:center}

    @keyframes heroDrift{to{transform:translate3d(2%,3%,0) scale(1.06)}}@keyframes gradientMove{to{background-position:180% 0}}@keyframes orbitPulse{50%{transform:scale(1.018);opacity:.8}}@keyframes orbitSpin{to{transform:rotate(360deg)}}@keyframes detailIn{from{opacity:0;transform:translateY(16px) scale(.99)}to{opacity:1;transform:none}}@keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}@keyframes chipFloat{50%{transform:translateY(-8px)}}@keyframes imgZoom{from{transform:scale(1.1)}to{transform:scale(1)}}@keyframes orbDrift{to{transform:translate(40px,30px) scale(1.1)}}@keyframes srScroll{to{transform:translateX(-50%)}}

    @media(max-width:1100px){.hero-inner{gap:40px}.hero-chip.c1{left:-10px}.hero-chip.c2{right:-8px}}
    @media(max-width:980px){.stack-frame{gap:2rem}
      .industry-hero{padding:104px 0 64px}.hero-inner{grid-template-columns:1fr;gap:44px}.hero-text{max-width:640px}.hero-visual{max-width:640px;width:100%}
      .industry-orbit{height:640px}.industry-orbit-card{width:150px}.industry-detail{grid-template-columns:1fr;height:auto}.industry-detail-image{height:260px}
      .goal-layout{grid-template-columns:1fr}.goal-detail{min-height:300px}.connected-grid{grid-template-columns:1fr}
      
    }
    @media(max-width:680px){
      .industry-wrap,.industry-wrap.narrow{width:calc(100% - 32px)}
      .industry-hero{padding:92px 0 52px}.hero-title{font-size:clamp(1.75rem,7.6vw,2.1rem)}.hero-actions .industry-btn{flex:1 1 100%}
      .hero-chip{font-size:11.5px;padding:7px 11px}.hero-chip.c1{left:-4px;top:8%}.hero-chip.c2{right:-4px;top:40%}.hero-stat{right:14px}.hero-frame{border-radius:20px}
      .industry-serve,.industry-goals,.approach-stack,.connected,.faq{padding:64px 0}
      .industry-orbit{height:auto;margin-top:34px;padding:10px 0;display:grid;grid-template-columns:1fr 1fr;gap:10px}.industry-orbit-line,.industry-orbit-spokes,.industry-orbit-halo{display:none}.industry-orbit-center{position:relative;left:auto;top:auto;transform:none;grid-column:1/-1;width:132px;height:132px;margin:0 auto 6px}.industry-orbit-center strong{font-size:12.5px}.industry-orbit-card{position:relative;left:auto!important;top:auto!important;transform:none!important;width:auto;min-height:66px;padding:12px 10px 12px 32px;font-size:12px}.industry-orbit-card:hover,.industry-orbit-card.active{transform:translateY(-2px)!important}
      .industry-detail-image{height:210px}.industry-detail-copy{padding:26px 22px}.goal-detail{padding:26px 22px;min-height:280px}.goal-row{padding:15px 14px}
      .scroll-reveal{height:190vh}.sr-stats{grid-template-columns:repeat(2,1fr);gap:8px;margin-top:24px}.sr-stat{padding:12px 8px}.scroll-reveal-text{padding-bottom:64px}
      .stack-frame{grid-template-columns:1fr;gap:1.25rem;--peek:12px;--card-h:8.25rem}.stack-left p{font-size:14px}.stack-card{padding:16px 18px}.stack-steps{margin-top:28px}.stack-block{margin-bottom:20px}
      .industry-final-cta{padding:72px 0}.faq-item button{padding:17px 16px;font-size:14px}
    }
    @media(prefers-reduced-motion:reduce){.hero-aurora,.hero-title span,.industry-orbit-line,.industry-orbit-line:after,.connected-card,.hero-chip,.goal-detail-img{animation:none!important}.industry-orbit-card,.industry-detail,.goal-detail{transition:none!important}.sr-track,.sr-orb{animation:none!important}}
  `, []);

  return (
    <div className="industries-page">
      <style>{styles}</style>

      <section className="industry-hero">
        <div className="hero-aurora" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" />
        <div className="industry-wrap hero-inner">
          <div className="hero-text">
            <span className="industry-kicker hero-pill">INDUSTRIES</span>
            <h1 className="hero-title">Digital Solutions Built Around Your <span>Industry</span></h1>
            <p className="hero-copy">Different industries need different digital solutions. We combine technology, design and digital marketing to help businesses build stronger digital experiences, reach the right audiences and grow online.</p>
            <div className="hero-actions">
              <Link to="/it-solutions" className="industry-btn dark">Explore Our Solutions <ArrowRight size={15} /></Link>
              <Link to="/contact" className="industry-btn light">Talk to Our Team</Link>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <IndustryServe />
      <ImageScrollReveal />
      <GoalSection />
      <ApproachStack />
      <ConnectedSection />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
