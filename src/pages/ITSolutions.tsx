import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight, Check, ChevronDown, Code2, CreditCard, Database, Globe, Layers, MapPin, MessageSquare,
  PenTool, Puzzle, Rocket, Settings2, ShoppingCart, Smartphone, Sparkles, Target, TrendingUp, Workflow,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
type Vars = CSSProperties & Record<string, string | number>;

function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

function Rv({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.14);
  return <div ref={ref} className={`it-rv ${shown ? 'in' : ''} ${className}`} style={{ ['--d' as string]: `${delay}ms` } as Vars}>{children}</div>;
}

function useScrollP<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.82 - r.top) / (r.height * 0.8 + vh * 0.1));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

function Head({ kicker, title, text, center = true, light = false }: { kicker: string; title: string; text?: string; center?: boolean; light?: boolean }) {
  return (
    <Rv className={`it-head ${center ? 'center' : ''} ${light ? 'light' : ''}`}>
      <span className="it-kicker">{kicker}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Rv>
  );
}

/* ------------------------------------------------------------------ */
/* content (from the Inteliq Brijj website content document)          */
/* ------------------------------------------------------------------ */
const services = [
  {
    id: 'web', no: '01', tab: 'Website Development', icon: Globe, scene: 'web',
    headline: 'Websites Designed for Your Business',
    text: 'We build modern, responsive websites that combine strong design, usability and functionality. Whether you need a business website, e commerce platform or custom web solution, we develop around your requirements.',
    head: 'Our Website Development Services',
    items: ['Custom Website Development', 'WordPress Development', 'E Commerce Development', 'Shopify Development', 'WooCommerce Development', 'PHP Development', 'Front End Development', 'Back End Development', 'Full Stack Development', 'CMS Development', 'Website Redesign', 'Website Migration', 'Website Maintenance'],
    cta: 'Explore Website Development',
  },
  {
    id: 'mobile', no: '02', tab: 'Mobile App Development', icon: Smartphone, scene: 'mobile',
    headline: 'Turn Your App Idea Into Reality',
    text: 'We develop mobile applications around your users, features and business requirements, from initial concept to a functional digital product.',
    head: 'Our App Development Services',
    items: ['Android App Development', 'iOS App Development', 'Cross Platform App Development', 'Flutter App Development', 'React Native Development', 'Custom App Development', 'App UI UX Design', 'App Testing', 'App Maintenance and Support'],
    cta: 'Explore Mobile App Development',
  },
  {
    id: 'software', no: '03', tab: 'Software Development', icon: Code2, scene: 'software',
    headline: 'Custom Software for the Way You Work',
    text: 'We develop software solutions around your business processes, operational requirements and long term goals.',
    head: 'Our Software Development Services',
    items: ['Custom Software Development', 'Business Software', 'CRM Development', 'ERP Development', 'SaaS Development', 'Custom Web Applications', 'Enterprise Software', 'API Development', 'Third Party API Integration', 'Business Automation'],
    cta: 'Explore Software Development',
  },
  {
    id: 'design', no: '04', tab: 'UI UX and Design', icon: PenTool, scene: 'design',
    headline: 'Digital Experiences Made Simple',
    text: 'Good design should look right and feel easy to use. We create clear and engaging interfaces for websites, mobile applications and digital products.',
    head: 'Our UI UX and Design Services',
    items: ['UI UX Design', 'Website UI Design', 'Mobile App UI UX', 'UX Research', 'Wireframing', 'Prototyping', 'Landing Page Design', 'Graphic Design', 'Brand Identity Design', 'Logo Design'],
    cta: 'Explore UI UX and Design',
  },
  {
    id: 'ecommerce', no: '05', tab: 'E Commerce Solutions', icon: ShoppingCart, scene: 'shop',
    headline: 'Build an Online Store Ready to Grow',
    text: 'We create e commerce solutions that bring together development, design, usability and the technology needed to support your online business.',
    head: 'Our E Commerce Services',
    items: ['E Commerce Website Development', 'Shopify Development', 'WooCommerce Development', 'Payment Gateway Integration', 'Marketplace Development', 'Product Page Optimisation', 'E Commerce Maintenance', 'E Commerce Platform Development'],
    cta: 'Explore E Commerce Solutions',
  },
];

const why = [
  { tag: 'business-first', icon: Target, title: 'Business First', text: 'We start with your requirements and business goals.' },
  { tag: 'custom-solutions', icon: Puzzle, title: 'Custom Solutions', text: 'We build around your workflows, users and technical needs.' },
  { tag: 'modern-approach', icon: Sparkles, title: 'Modern Approach', text: 'We create practical digital solutions designed for today and ready to evolve.' },
  { tag: 'clear-communication', icon: MessageSquare, title: 'Clear Communication', text: 'We keep requirements and project progress simple and transparent.' },
  { tag: 'built-for-growth', icon: TrendingUp, title: 'Built for Growth', text: 'Your digital solution can adapt as your business grows.' },
];

const modIcon: Record<string, typeof Globe> = {
  'Website Development': Globe, 'UI UX': PenTool, 'Mobile App Development': Smartphone, 'Software Development': Code2,
  API: Workflow, Automation: Settings2, 'E Commerce Development': ShoppingCart, 'Payment Integration': CreditCard,
};
const finder = [
  { q: 'Need a Website?', mods: ['Website Development', 'UI UX'], out: 'Responsive site, designed and built' },
  { q: 'Want to Build an App?', mods: ['Mobile App Development', 'UI UX'], out: 'Android, iOS or cross platform app' },
  { q: 'Need Custom Software?', mods: ['Software Development', 'API', 'Automation'], out: 'Software around your processes' },
  { q: 'Want to Sell Online?', mods: ['E Commerce Development', 'UI UX', 'Payment Integration'], out: 'Online store ready to take orders' },
];

const faqs: [string, string][] = [
  ['What IT solutions does Inteliq Brijj Solutions provide?', 'We provide website development, mobile app development, software development, UI UX and design, and e commerce solutions.'],
  ['Do you provide IT services in Jaipur?', 'Yes. We are based in Jaipur and provide IT solutions for businesses in Jaipur and across India.'],
  ['Do you provide custom software development?', 'Yes. We develop custom software around specific business processes, operational requirements and technical needs.'],
  ['Do you develop mobile applications?', 'Yes. We provide Android, iOS and cross platform mobile app development.'],
  ['Do you provide e commerce development?', 'Yes. We provide e commerce development including Shopify, WooCommerce, payment integration and marketplace solutions.'],
  ['How do I choose the right IT solution?', 'Tell us what you want to build, improve or solve. We can help identify the technology and services that fit your requirements.'],
];

/* ------------------------------------------------------------------ */
/* 1. HERO — code is typed, the site and the app assemble live        */
/* ------------------------------------------------------------------ */
type Tok = [string, string];
const codeLines: Tok[][] = [
  [['import', 'k'], [' { Site } ', 'p'], ['from', 'k'], [" '@inteliq/web'", 's'], [';', 'p']],
  [['const', 'k'], [' app ', 'v'], ['= ', 'p'], ['Site', 'f'], ['({ ', 'p'], ['theme', 'v'], [": 'brand'", 's'], [', ', 'p'], ['responsive', 'v'], [': ', 'p'], ['true', 'k'], [' });', 'p']],
  [['app', 'v'], ['.', 'p'], ['page', 'f'], ["('/', { ", 'p'], ['hero', 'v'], [": 'Technology Built Around Your Business'", 's'], [' });', 'p']],
  [['app', 'v'], ['.', 'p'], ['add', 'f'], ["('cta', { ", 'p'], ['label', 'v'], [": 'Start Your Project'", 's'], [' });', 'p']],
  [['app', 'v'], ['.', 'p'], ['add', 'f'], ["('services', { ", 'p'], ['cards', 'v'], [': ', 'p'], ['3', 'n'], [' });', 'p']],
  [['app', 'v'], ['.', 'p'], ['connect', 'f'], ["('api', { ", 'p'], ['crm', 'v'], [': ', 'p'], ['true', 'k'], [', ', 'p'], ['payments', 'v'], [': ', 'p'], ['true', 'k'], [' });', 'p']],
  [['app', 'v'], ['.', 'p'], ['deploy', 'f'], ["('production')", 'p'], [';', 'p']],
];
const lineLen = codeLines.map((l) => l.reduce((a, t) => a + t[0].length, 0));
const lineStart = lineLen.reduce<number[]>((acc, _n, i) => { acc.push(i === 0 ? 0 : acc[i - 1] + lineLen[i - 1]); return acc; }, []);
const totalChars = lineLen.reduce((a, b) => a + b, 0);

function HeroIDE() {
  const [n, setN] = useState(0);
  const [cycle, setCycle] = useState(0);
  const done = n >= totalChars;
  useEffect(() => {
    if (n < totalChars) {
      const t = window.setTimeout(() => setN((c) => Math.min(totalChars, c + 2)), 26);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => { setN(0); setCycle((c) => c + 1); }, 6500);
    return () => window.clearTimeout(t);
  }, [n]);
  const lineDone = (i: number) => n >= lineStart[i] + lineLen[i];
  const active = codeLines.findIndex((_, i) => n < lineStart[i] + lineLen[i]);

  return (
    <div className="it-ide-wrap" aria-hidden="true">
      <div className="it-ide">
        <div className="it-ide-bar">
          <span className="dots"><i /><i /><i /></span>
          <span className="tab on">app.ts</span><span className="tab">api.ts</span><span className="tab">theme.css</span>
          <span className={`status ${done ? 'ok' : ''}`}><b />{done ? 'Deployed' : 'Building'}</span>
        </div>
        <div className="it-ide-body">
          <div className="it-code">
            {codeLines.map((toks, i) => {
              const from = lineStart[i];
              let left = n - from;
              return (
                <div className={`ln ${active === i ? 'cur' : ''}`} key={i}>
                  <span className="no">{i + 1}</span>
                  <span className="tx">
                    {toks.map(([t, c], k) => {
                      const take = Math.max(0, Math.min(t.length, left)); left -= t.length;
                      return take > 0 ? <span key={k} className={`t-${c}`}>{t.slice(0, take)}</span> : null;
                    })}
                    {active === i && <i className="caret" />}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="it-prev" key={cycle}>
            <div className="chrome"><i /><i /><i /><span>inteliqbrijj.com</span></div>
            <div className="page">
              <div className={`nav ${lineDone(1) ? 'on' : ''}`}><b /><span /><span /><span /></div>
              <div className={`hero ${lineDone(2) ? 'on' : ''}`}><h5>Technology Built Around Your Business</h5><i /><i className="s" /></div>
              <div className={`cta ${lineDone(3) ? 'on' : ''}`}>Start Your Project</div>
              <div className={`cards ${lineDone(4) ? 'on' : ''}`}><div><u /><s /></div><div><u /><s /></div><div><u /><s /></div></div>
              <div className={`api ${lineDone(5) ? 'on' : ''}`}><Database size={11} /> CRM <em /> Payments</div>
            </div>
          </div>
        </div>
        <div className="it-term">
          <div className={`row ${lineDone(5) ? 'on' : ''}`}><span className="p">$</span> npm run build</div>
          <div className={`row ok ${lineDone(6) ? 'on' : ''}`}><Check size={12} /> compiled · 1.2s · 0 errors</div>
          <div className={`row ok ${done ? 'on' : ''}`}><Rocket size={12} /> live on production</div>
          <div className="bar"><i style={{ width: `${Math.min(100, (n / totalChars) * 100)}%` }} /></div>
        </div>
      </div>

      <div className={`it-phone ${lineDone(4) ? 'on' : ''}`}>
        <div className="notch" />
        <div className="scr"><h6>Your App</h6><i /><i className="s" /><div><b /><b /><b /></div><em /></div>
      </div>
      <div className={`it-badge b2 ${done ? 'on' : ''}`}><Check size={13} /> API · 200 OK</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="it-hero">
      <div className="it-bg" aria-hidden="true" /><div className="it-grid" aria-hidden="true" />
      <div className="it-wrap it-hero-in">
        <div className="it-hero-text">
          <span className="it-pill"><i /> IT Solutions</span>
          <h1>Technology Built Around Your <span>Business</span></h1>
          <p>Professional IT solutions for businesses across India, from website development and mobile apps to custom software, UI UX and e commerce.</p>
          <div className="it-actions">
            <Link to="/contact" className="it-btn dark">Start Your Project <ArrowRight size={15} /></Link>
            <Link to="/contact" className="it-btn light">Talk to Our Team</Link>
          </div>
          <div className="it-trust"><MapPin size={14} /> Jaipur Based · Serving Businesses Across India</div>
        </div>
        <HeroIDE />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. IT SOLUTIONS FOR MODERN BUSINESSES — exploded 3D stack          */
/* ------------------------------------------------------------------ */
const plates = [
  { t: 'Interface', s: 'UI UX and design' },
  { t: 'Application', s: 'Business logic' },
  { t: 'Integrations', s: 'APIs and automation' },
  { t: 'Data', s: 'Storage and cloud' },
];

function Wipe({ children, a, b }: { children: ReactNode; a: number; b: number }) {
  return <span className="it-wipe" style={{ ['--a' as string]: a, ['--b' as string]: b } as Vars}>{children}</span>;
}

function Modern() {
  const ref = useScrollP<HTMLElement>();
  return (
    <section className="it-modern" ref={ref}>
      <div className="it-wrap it-modern-in">
        <div className="it-modern-text">
          <span className="it-kicker">IT SOLUTIONS FOR MODERN BUSINESSES</span>
          <h2>The Right Technology Makes Everything Easier</h2>
          <p className="lead"><Wipe a={0.02} b={0.28}>The right technology should make your business easier to build, manage and grow.</Wipe></p>
          <p><Wipe a={0.26} b={0.58}>Inteliq Brijj Solutions provides IT services in Jaipur and across India, helping businesses turn ideas, requirements and everyday challenges into practical digital solutions.</Wipe></p>
          <p><Wipe a={0.56} b={0.88}>From a professional website to a custom business application, we combine technology, design and functionality around your goals.</Wipe></p>
          <Rv delay={100}><Link to="/contact" className="it-btn dark">Discuss Your Requirements <ArrowRight size={15} /></Link></Rv>
        </div>
        <div className="it-stack3d" aria-hidden="true">
          <div className="scene">
            {plates.map((pl, i) => (
              <div className="plate" key={pl.t} style={{ ['--i' as string]: i } as Vars}>
                <div className="face">
                  <span className="lab"><b>{pl.t}</b><em>{pl.s}</em></span>
                  <span className="deco d1" /><span className="deco d2" /><span className="deco d3" />
                </div>
              </div>
            ))}
            <div className="beam" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. OUR IT SOLUTIONS — expanding panels                              */
/* ------------------------------------------------------------------ */
function Scene({ kind }: { kind: string }) {
  if (kind === 'web') return (
    <div className="sc sc-web"><div className="bar"><i /><i /><i /></div><div className="hd" /><div className="row"><b /><b /><b /></div><div className="ln" /><div className="ln s" /></div>
  );
  if (kind === 'mobile') return (
    <div className="sc sc-mobile"><div className="ph"><div className="notch" /><div className="list"><i /><i /><i /><i /><i /></div></div></div>
  );
  if (kind === 'software') return (
    <div className="sc sc-soft"><span className="n n1"><Database size={14} /></span><span className="n n2"><Workflow size={14} /></span><span className="n n3"><Code2 size={14} /></span><span className="n n4"><Settings2 size={14} /></span><i className="l l1" /><i className="l l2" /><i className="l l3" /><i className="pk pk1" /><i className="pk pk2" /></div>
  );
  if (kind === 'design') return (
    <div className="sc sc-design"><div className="frame"><span className="a" /><span className="b" /><span className="c" /></div><i className="cursor" /></div>
  );
  return (
    <div className="sc sc-shop"><div className="prod"><div className="img" /><b /><s /><button type="button" tabIndex={-1}><ShoppingCart size={12} /> Add</button></div><div className="paid"><Check size={13} /> Payment received</div></div>
  );
}

function Services() {
  const [sel, setSel] = useState(0);
  const loc = useLocation();
  useEffect(() => {
    const h = loc.hash.replace('#', '');
    const idx = services.findIndex((s) => s.id === h);
    if (idx >= 0) {
      setSel(idx);
      window.setTimeout(() => document.getElementById('it-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  }, [loc.hash]);
  return (
    <section className="it-services" id="it-services">
      <div className="it-wrap">
        <Head kicker="OUR IT SOLUTIONS" title="Five Ways We Build for Your Business" text="Select a service to explore what we build, from websites and apps to software, design and online stores." />
        <Rv delay={80}>
          <div className="it-acc">
            {services.map((s, n) => {
              const I = s.icon;
              const on = sel === n;
              return (
                <article key={s.id} id={s.id} className={`it-pane ${on ? 'on' : ''}`} onMouseEnter={() => { if (window.matchMedia('(hover: hover) and (min-width: 981px)').matches) setSel(n); }}>
                  <button type="button" className="cap" onClick={() => setSel(n)} aria-expanded={on}>
                    <span className="no">{s.no}</span>
                    <span className="ic"><I size={18} /></span>
                    <span className="nm">{s.tab}</span>
                    <ChevronDown size={18} className="chev" />
                  </button>
                  <div className="body-wrap">
                    <div className="body">
                      <div className="left">
                        <span className="big">{s.no}</span>
                        <h3>{s.headline}</h3>
                        <p>{s.text}</p>
                        <span className="listhead">{s.head}</span>
                        <ul>{s.items.map((it, k) => <li key={it} style={{ ['--i' as string]: k } as Vars}><Check size={12} />{it}</li>)}</ul>
                        <Link to="/contact" className="it-btn white">{s.cta} <ArrowRight size={15} /></Link>
                      </div>
                      <div className="right" aria-hidden="true">{on && <Scene kind={s.scene} />}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. WHY CHOOSE — dark, modules that boot up                          */
/* ------------------------------------------------------------------ */
function Why() {
  const { ref, shown } = useInView<HTMLDivElement>(0.2);
  return (
    <section className="it-why">
      <div className="it-bg dark" aria-hidden="true" />
      <div className="it-wrap">
        <Head light kicker="WHY CHOOSE INTELIQ BRIJJ" title="One Connected Technology Partner" text="Bring development, design and digital technology together through one connected approach." />
        <div ref={ref} className={`it-why-grid ${shown ? 'in' : ''}`}>
          {why.map((w, n) => {
            const I = w.icon;
            return (
              <article className="it-why-card" key={w.title} style={{ ['--i' as string]: n } as Vars}>
                <span className="tag">{'//'} {w.tag}</span>
                <span className="ic"><I size={20} /></span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <span className="ok"><Check size={12} /> ready</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. FIND THE RIGHT IT SOLUTION — solution builder                    */
/* ------------------------------------------------------------------ */
function Finder() {
  const [sel, setSel] = useState(0);
  const [tick, setTick] = useState(0);
  const [slow, setSlow] = useState(false);
  const { ref, shown } = useInView<HTMLDivElement>(0.25);
  const DUR = slow ? 9000 : 5200;
  useEffect(() => {
    if (!shown) return;
    const t = window.setTimeout(() => { setSlow(false); setSel((c) => (c + 1) % finder.length); setTick((x) => x + 1); }, DUR);
    return () => window.clearTimeout(t);
  }, [shown, sel, tick, DUR]);
  const f = finder[sel];
  return (
    <section className="it-finder">
      <div className="it-wrap">
        <Head kicker="FIND THE RIGHT IT SOLUTION" title="Tell Us the Goal, See the Build" text="Pick what you need and watch the right services connect into one solution." />
        <div className="it-fd" ref={ref}>
          <div className="it-fd-q" role="tablist">
            {finder.map((x, n) => (
              <button key={x.q} type="button" role="tab" aria-selected={sel === n} className={sel === n ? 'on' : ''} onClick={() => { setSel(n); setSlow(true); setTick((x) => x + 1); }}>
                <span className="no">0{n + 1}</span><span className="t">{x.q}</span><ArrowRight size={16} />
                {sel === n && <i className="bar" key={`${sel}-${tick}`} style={{ animationDuration: `${DUR}ms` }} />}
              </button>
            ))}
          </div>
          <div className="it-fd-out" key={sel}>
            <div className="node goal"><span>Goal</span><b>{f.q}</b></div>
            <div className="wires">
              {f.mods.map((m, k) => <i key={m} style={{ ['--k' as string]: k } as Vars} />)}
            </div>
            <div className="mods">
              {f.mods.map((m, k) => {
                const I = modIcon[m] ?? Layers;
                return <div className="mod" key={m} style={{ ['--k' as string]: k } as Vars}><span className="ic"><I size={16} /></span>{m}<Check size={14} className="ck" /></div>;
              })}
            </div>
            <div className="wires out"><i /></div>
            <div className="node result"><span>Result</span><b>{f.out}</b><Link to="/contact" className="go">Talk to Our Team <ArrowRight size={13} /></Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. JAIPUR AND ACROSS INDIA — route with data packets                */
/* ------------------------------------------------------------------ */
function Jaipur() {
  const { ref, shown } = useInView<HTMLDivElement>(0.25);
  const dots: [number, number][] = [[250, 52], [300, 108], [255, 182], [196, 214], [118, 244], [338, 176], [90, 120], [310, 40]];
  return (
    <section className="it-jaipur">
      <div className="it-wrap">
        <div className="it-jaipur-card" ref={ref}>
          <div className="txt">
            <span className="it-kicker">IT SOLUTIONS IN JAIPUR AND ACROSS INDIA</span>
            <h2>Based in Jaipur. Building for Businesses Across India.</h2>
            <p>Inteliq Brijj Solutions provides IT solutions and development services for businesses in Jaipur and across India.</p>
            <p>Whether you are building a new digital product or improving an existing one, we help you choose and develop technology around your business requirements.</p>
            <div className="route"><span>Jaipur</span><ArrowRight size={14} /><span>Rajasthan</span><ArrowRight size={14} /><span>India</span></div>
            <Link to="/contact" className="it-btn white">Talk to Our Team <ArrowRight size={15} /></Link>
          </div>
          <div className={`map ${shown ? 'in' : ''}`} aria-hidden="true">
            <svg viewBox="0 0 400 290">
              <defs>
                <linearGradient id="itRt" x1="0" x2="1"><stop offset="0" stopColor="#34d399" /><stop offset="1" stopColor="#38bdf8" /></linearGradient>
              </defs>
              {[60, 120, 180, 240].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} className="gl" />)}
              {[80, 160, 240, 320].map((x) => <line key={x} y1="0" y2="290" x1={x} x2={x} className="gl" />)}
              {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" className="cd" style={{ animationDelay: `${i * 0.45}s` }} />)}
              <path id="itRoute" d="M84,214 C130,200 150,150 196,138 S280,96 322,58" className="route-bg" />
              <path d="M84,214 C130,200 150,150 196,138 S280,96 322,58" className="route" pathLength={1} />
              <circle r="4.5" className="pk"><animateMotion dur="3.2s" repeatCount="indefinite" begin="1.4s"><mpath href="#itRoute" /></animateMotion></circle>
              <circle r="3" className="pk b"><animateMotion dur="3.2s" repeatCount="indefinite" begin="2.2s"><mpath href="#itRoute" /></animateMotion></circle>
              {([[84, 214, 'Jaipur'], [196, 138, 'Rajasthan'], [322, 58, 'India']] as [number, number, string][]).map(([x, y, l], i) => (
                <g key={l} className="nd" style={{ animationDelay: `${0.3 + i * 0.5}s` }}>
                  <circle cx={x} cy={y} r="16" className="halo" />
                  <circle cx={x} cy={y} r="7" className="core" />
                  <text x={x} y={y - 24} textAnchor="middle">{l}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. FAQ                                                              */
/* ------------------------------------------------------------------ */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="it-faq">
      <div className="it-wrap narrow">
        <Head kicker="FREQUENTLY ASKED QUESTIONS" title="Questions, Answered" />
        <div className="it-faq-list">
          {faqs.map(([q, a], n) => (
            <Rv key={q} delay={n * 50}>
              <div className={`it-faq-item ${open === n ? 'open' : ''}`}>
                <button type="button" aria-expanded={open === n} onClick={() => setOpen(open === n ? null : n)}>
                  <span className="pr">?</span><span className="q">{q}</span><ChevronDown size={18} />
                </button>
                <div className="ans"><div className="in"><p key={open === n ? 'o' : 'c'}>{a}</p></div></div>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. FINAL CTA                                                        */
/* ------------------------------------------------------------------ */
const glyphs = ['</>', '{ }', '01', '()', '=>', '[ ]', '10', '</>', '{ }', '01', '=>', '( )'];
function FinalCta() {
  return (
    <section className="it-cta">
      <div className="it-bg dark" aria-hidden="true" />
      <div className="it-glyphs" aria-hidden="true">
        {glyphs.map((g, n) => <span key={n} style={{ ['--x' as string]: `${(n * 8.7 + 4) % 96}%`, ['--t' as string]: `${7 + (n % 5)}s`, ['--dl' as string]: `${(n * 0.7) % 5}s` } as Vars}>{g}</span>)}
      </div>
      <div className="it-wrap narrow center">
        <Rv>
          <span className="it-kicker">BUILD YOUR NEXT DIGITAL SOLUTION</span>
          <h2>Have an Idea, a Requirement or a Product to Improve?</h2>
          <p>Have an idea, a business requirement or a digital product you want to improve?</p>
          <strong>Let's build the right solution for your business.</strong>
          <div className="it-actions center">
            <Link to="/contact" className="it-btn white">Start Your Project <ArrowRight size={15} /></Link>
            <Link to="/contact" className="it-btn outline">Get a Consultation</Link>
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export default function ITSolutions() {
  return (
    <div className="it-page">
      <style>{IT_CSS}</style>
      <Hero />
      <Modern />
      <Services />
      <Why />
      <Finder />
      <Jaipur />
      <Faq />
      <FinalCta />
    </div>
  );
}

const IT_CSS = `.it-page{font-family:'Inter',system-ui,-apple-system,sans-serif;color:#0f172a;background:#fff;overflow-x:clip;-webkit-font-smoothing:antialiased}
:where(.it-page) *{font-family:'Inter',system-ui,-apple-system,sans-serif}
:where(.it-page) :is(h1,h2,h3,h4,h5,h6,p){margin:0}
:where(.it-page) :is(h1,h2,h3,h4,h5,h6){color:inherit}
.it-wrap{width:min(1180px,calc(100% - 64px));margin:0 auto;position:relative;z-index:2}.it-wrap.narrow{width:min(840px,calc(100% - 64px))}.it-wrap.center{text-align:center}
.it-kicker{display:inline-block;color:#0d9488;font-size:11.5px;font-weight:600;letter-spacing:.14em;line-height:1.4;text-transform:uppercase}
section[class^="it-"]{position:relative}
.it-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 20px;border-radius:999px;font-size:14px;font-weight:600;transition:transform .25s ease,box-shadow .25s ease;white-space:nowrap}
.it-btn:hover{transform:translateY(-2px)}.it-btn svg{transition:transform .25s}.it-btn:hover svg{transform:translateX(3px)}
.it-btn.dark{background:#0f172a;color:#fff;box-shadow:0 12px 24px -10px rgba(15,23,42,.45)}.it-btn.light{background:#fff;color:#0f172a;border:1px solid #dfe7ef}.it-btn.white{background:#fff;color:#0f172a;box-shadow:0 12px 24px -12px rgba(0,0,0,.5)}.it-btn.outline{border:1px solid rgba(255,255,255,.28);color:#fff;background:rgba(255,255,255,.06)}
.it-actions{display:flex;gap:12px;flex-wrap:wrap}.it-actions.center{justify-content:center}
.it-rv{opacity:0;transform:translateY(26px);transition:opacity .8s ease var(--d,0ms),transform .8s cubic-bezier(.16,1,.3,1) var(--d,0ms)}.it-rv.in{opacity:1;transform:none}
.it-head{max-width:720px;margin-bottom:44px}.it-head.center{margin-left:auto;margin-right:auto;text-align:center}
.it-head h2,.it-modern h2,.it-jaipur h2,.it-cta h2{font-size:clamp(1.5rem,2.5vw,2.25rem);line-height:1.18;letter-spacing:-.025em;font-weight:700;margin:12px 0 14px}
.it-head p{color:#5b6b82;font-size:clamp(15px,1.1vw,16.5px);line-height:1.7}.it-head.light h2{color:#fff}.it-head.light p{color:#9db0c6}.it-head.light .it-kicker{color:#5eead4}
.it-bg{position:absolute;inset:-20% -10%;background:radial-gradient(circle at 10% 20%,rgba(20,184,166,.16),transparent 34%),radial-gradient(circle at 90% 15%,rgba(99,102,241,.16),transparent 30%),radial-gradient(circle at 60% 90%,rgba(14,165,233,.1),transparent 34%);filter:blur(34px);animation:itDrift 14s ease-in-out infinite alternate;pointer-events:none}
.it-bg.dark{background:radial-gradient(circle at 15% 30%,rgba(20,184,166,.22),transparent 32%),radial-gradient(circle at 85% 25%,rgba(99,102,241,.22),transparent 30%)}

/* ============ HERO ============ */
.it-hero{padding:124px 0 84px;background:#f6f8fc;overflow:hidden}
.it-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(15,23,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.04) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(70% 80% at 50% 40%,#000,transparent);mask-image:radial-gradient(70% 80% at 50% 40%,#000,transparent)}
.it-hero-in{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.1fr);gap:56px;align-items:center}
.it-hero-text{max-width:540px;text-align:left}
.it-pill{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border:1px solid #b9ece5;border-radius:999px;background:rgba(255,255,255,.88);color:#0f766e;font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;box-shadow:0 10px 24px -12px rgba(20,184,166,.45)}.it-pill i{width:7px;height:7px;border-radius:50%;background:#14b8a6;animation:itPing 2s infinite}
.it-hero h1{text-wrap:balance;font-size:clamp(2rem,3.4vw,3.1rem);line-height:1.12;letter-spacing:-.032em;font-weight:700;margin:20px 0 16px}
.it-hero h1 span{background:linear-gradient(100deg,#14b8a6,#6366f1,#0ea5e9);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% 100%;animation:itGrad 8s linear infinite}
.it-hero-text>p{color:#5b6b82;font-size:clamp(15px,1.15vw,17px);line-height:1.7;max-width:500px}
.it-hero .it-actions{margin-top:26px}
.it-trust{display:inline-flex;align-items:center;gap:7px;margin-top:22px;color:#64748b;font-size:13px;font-weight:500}.it-trust svg{color:#0d9488}

.it-ide-wrap{position:relative;padding:14px 0 28px}
.it-ide{border-radius:18px;background:#0b1220;border:1px solid #1d2a3f;box-shadow:0 44px 80px -34px rgba(8,15,30,.7),0 0 0 6px rgba(255,255,255,.5);overflow:hidden;color:#cbd5e1}
.it-ide-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;background:#0f1a2d;border-bottom:1px solid #1b2a42}
.it-ide-bar .dots{display:flex;gap:6px;margin-right:10px}.it-ide-bar .dots i{width:9px;height:9px;border-radius:50%;background:#334155}.it-ide-bar .dots i:first-child{background:#f87171}.it-ide-bar .dots i:nth-child(2){background:#fbbf24}.it-ide-bar .dots i:nth-child(3){background:#34d399}
.it-ide-bar .tab{font-size:11.5px;color:#7184a0;padding:5px 10px;border-radius:7px}.it-ide-bar .tab.on{background:#16233a;color:#e2e8f0}
.it-ide-bar .status{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:#fbbf24}.it-ide-bar .status b{width:7px;height:7px;border-radius:50%;background:currentColor;animation:itPing 1.4s infinite}.it-ide-bar .status.ok{color:#34d399}
.it-ide-body{display:grid;grid-template-columns:1.05fr .95fr;min-height:236px}
.it-code{padding:14px 0;font-family:ui-monospace,'SF Mono','JetBrains Mono',Menlo,monospace!important;font-size:11.5px;line-height:1.85;border-right:1px solid #1b2a42;overflow:hidden}
.it-code *{font-family:ui-monospace,'SF Mono','JetBrains Mono',Menlo,monospace!important}
.it-code .ln{display:flex;gap:12px;padding:0 12px;min-height:21px;border-left:2px solid transparent}.it-code .ln.cur{background:rgba(99,102,241,.1);border-left-color:#6366f1}
.it-code .no{width:14px;text-align:right;color:#3d4f6b;flex:none}.it-code .tx{white-space:pre-wrap;word-break:break-word}
.t-k{color:#c792ea}.t-s{color:#a5e8a0}.t-v{color:#82aaff}.t-f{color:#ffcb6b}.t-n{color:#f78c6c}.t-p{color:#9fb0c8}
.caret{display:inline-block;width:6px;height:13px;margin-left:1px;background:#5eead4;vertical-align:-2px;animation:itBlink 1s steps(1) infinite}
.it-prev{padding:12px;display:flex;flex-direction:column}
.it-prev .chrome{display:flex;align-items:center;gap:5px;padding:7px 10px;border-radius:9px 9px 0 0;background:#16233a}.it-prev .chrome i{width:6px;height:6px;border-radius:50%;background:#3b4d68}.it-prev .chrome span{margin-left:8px;flex:1;font-size:10px;color:#7f93ae;background:#0f1a2d;padding:2px 8px;border-radius:5px}
.it-prev .page{flex:1;background:#fff;border-radius:0 0 9px 9px;padding:10px;display:flex;flex-direction:column;gap:8px;color:#0f172a;overflow:hidden}
.it-prev .page>*{opacity:0;transform:translateY(10px);transition:opacity .5s,transform .6s cubic-bezier(.16,1,.3,1)}.it-prev .page>.on{opacity:1;transform:none}
.it-prev .nav{display:flex;align-items:center;gap:8px}.it-prev .nav b{width:14px;height:14px;border-radius:5px;background:linear-gradient(135deg,#14b8a6,#6366f1)}.it-prev .nav span{width:22px;height:4px;border-radius:3px;background:#dfe6ee}.it-prev .nav span:nth-child(2){margin-left:auto}
.it-prev .hero h5{font-size:12.5px;line-height:1.25;font-weight:700;letter-spacing:-.02em;max-width:150px}.it-prev .hero i{display:block;height:4px;width:90%;border-radius:3px;background:#e2e8f0;margin-top:6px}.it-prev .hero i.s{width:60%}
.it-prev .cta{align-self:flex-start;padding:5px 10px;border-radius:99px;background:#0f172a;color:#fff;font-size:9.5px;font-weight:600}
.it-prev .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.it-prev .cards div{padding:7px;border-radius:8px;background:#f1f5f9}.it-prev .cards u{display:block;width:14px;height:14px;border-radius:5px;background:linear-gradient(135deg,#5eead4,#818cf8)}.it-prev .cards s{display:block;margin-top:6px;height:4px;border-radius:3px;background:#cfd8e3}
.it-prev .api{display:inline-flex;align-items:center;gap:5px;align-self:flex-start;font-size:9.5px;font-weight:600;color:#0f766e;background:#ecfdf5;padding:4px 8px;border-radius:99px}.it-prev .api em{width:3px;height:3px;border-radius:50%;background:#99f6e4}
.it-term{padding:10px 14px 12px;border-top:1px solid #1b2a42;background:#09101d;font-family:ui-monospace,Menlo,monospace!important;font-size:11px;position:relative}
.it-term *{font-family:ui-monospace,Menlo,monospace!important}
.it-term .row{display:flex;align-items:center;gap:7px;min-height:19px;opacity:0;transform:translateX(-8px);transition:all .45s}.it-term .row.on{opacity:1;transform:none}.it-term .p{color:#6366f1}.it-term .ok{color:#34d399}
.it-term .bar{position:absolute;left:0;right:0;bottom:0;height:2px;background:#13213a}.it-term .bar i{display:block;height:100%;background:linear-gradient(90deg,#14b8a6,#6366f1);transition:width .1s linear}
.it-phone{position:absolute;right:-18px;bottom:-4px;width:98px;height:178px;border-radius:20px;background:#0f172a;padding:5px;border:2px solid #25344d;box-shadow:0 30px 50px -20px rgba(8,15,30,.7);opacity:0;transform:translateY(24px) rotate(4deg);transition:all .8s cubic-bezier(.16,1,.3,1)}.it-phone.on{opacity:1;transform:rotate(4deg);animation:itFloat 7s ease-in-out 1s infinite}
.it-phone .notch{position:absolute;left:50%;top:6px;width:30px;height:6px;margin-left:-15px;border-radius:6px;background:#0b1220;z-index:2}
.it-phone .scr{height:100%;border-radius:15px;background:#fff;padding:20px 8px 8px;display:flex;flex-direction:column;gap:6px}.it-phone h6{font-size:9.5px;font-weight:700;color:#0f172a}.it-phone .scr>i{display:block;height:20px;border-radius:7px;background:linear-gradient(135deg,#99f6e4,#c7d2fe)}.it-phone .scr>i.s{height:8px;width:70%;background:#e2e8f0}
.it-phone .scr>div{display:flex;align-items:flex-end;gap:4px;height:40px}.it-phone .scr b{flex:1;border-radius:3px 3px 1px 1px;background:linear-gradient(#14b8a6,#6366f1);transform-origin:bottom;animation:itBar 2.6s ease-in-out infinite}.it-phone .scr b:nth-child(1){height:50%}.it-phone .scr b:nth-child(2){height:90%;animation-delay:.3s}.it-phone .scr b:nth-child(3){height:65%;animation-delay:.6s}
.it-phone .scr em{margin-top:auto;height:12px;border-radius:99px;background:#0f172a}
.it-badge{position:absolute;display:inline-flex;align-items:center;gap:7px;padding:8px 13px;border-radius:12px;background:rgba(255,255,255,.97);border:1px solid #e1e9f2;box-shadow:0 20px 36px -18px rgba(15,23,42,.45);font-size:11.5px;font-weight:600;color:#0f172a}.it-badge svg{color:#0d9488}
.it-badge.b1{left:-22px;top:0;animation:itFloat 7s ease-in-out infinite}.it-badge.b2{left:26px;bottom:0;opacity:0;transform:translateY(12px);transition:all .6s}.it-badge.b2.on{opacity:1;transform:none}

/* ============ MODERN — exploded 3D stack ============ */
.it-modern{padding:100px 0;background:#fff}
.it-modern-in{display:grid;grid-template-columns:minmax(0,1.02fr) minmax(0,.98fr);gap:60px;align-items:center}
.it-modern-text p{color:#5b6b82;font-size:clamp(15px,1.15vw,17px);line-height:1.8;margin-bottom:14px;max-width:560px}.it-modern-text p.lead{color:#0f172a;font-size:clamp(16px,1.3vw,18.5px);font-weight:500}.it-modern-text .it-btn{margin-top:14px}
.it-wipe{opacity:calc(.18 + clamp(0,(var(--p,0) - var(--a)) / max(var(--b) - var(--a),.001),1) * .82);filter:blur(calc((1 - clamp(0,(var(--p,0) - var(--a)) / max(var(--b) - var(--a),.001),1)) * 2.5px))}
.it-stack3d{perspective:1400px;height:440px;display:grid;place-items:center}
.it-stack3d .scene{position:relative;width:min(330px,80%);height:210px;transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(calc(-38deg + var(--p,0) * 16deg));transition:transform .2s linear}
.it-stack3d .plate{position:absolute;inset:0;transform-style:preserve-3d;transform:translateZ(calc((3 - var(--i)) * (8px + var(--p,0) * 62px)))}
.it-stack3d .face{position:absolute;inset:0;border-radius:18px;border:1.5px solid rgba(20,184,166,.55);background:linear-gradient(135deg,rgba(255,255,255,.92),rgba(236,253,250,.82));box-shadow:0 24px 40px -18px rgba(15,23,42,.45);overflow:hidden}
.it-stack3d .plate:nth-child(2) .face{border-color:rgba(99,102,241,.55);background:linear-gradient(135deg,rgba(255,255,255,.92),rgba(238,242,255,.85))}.it-stack3d .plate:nth-child(3) .face{border-color:rgba(14,165,233,.55);background:linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,249,255,.85))}.it-stack3d .plate:nth-child(4) .face{border-color:rgba(15,23,42,.45);background:linear-gradient(135deg,#1e293b,#0f172a)}
.it-stack3d .lab{position:absolute;left:16px;bottom:12px;display:flex;flex-direction:column;gap:1px}.it-stack3d .lab b{font-size:13px;font-weight:700;letter-spacing:-.01em;color:#0f172a}.it-stack3d .lab em{font-style:normal;font-size:10.5px;color:#64748b}.it-stack3d .plate:nth-child(4) .lab b{color:#fff}.it-stack3d .plate:nth-child(4) .lab em{color:#94a3b8}
.it-stack3d .deco{position:absolute;border-radius:6px;background:rgba(20,184,166,.22)}.it-stack3d .d1{left:16px;top:16px;width:34%;height:12px}.it-stack3d .d2{left:16px;top:36px;width:52%;height:8px;opacity:.7}.it-stack3d .d3{right:16px;top:16px;width:22%;height:34px;border-radius:10px;background:linear-gradient(135deg,rgba(20,184,166,.5),rgba(99,102,241,.45))}
.it-stack3d .plate:nth-child(2) .deco{background:rgba(99,102,241,.22)}.it-stack3d .plate:nth-child(3) .deco{background:rgba(14,165,233,.24)}.it-stack3d .plate:nth-child(4) .deco{background:rgba(148,163,184,.25)}
.it-stack3d .beam{position:absolute;left:50%;top:50%;width:2px;height:calc(60px + var(--p,0) * 190px);margin-left:-1px;background:linear-gradient(#14b8a6,transparent);transform:translateZ(0) rotateX(-90deg) translateY(-50%);transform-origin:50% 0;opacity:.7;display:none}

/* ============ SERVICES — expanding panels ============ */
.it-services{padding:96px 0 104px;background:#f6f8fc;scroll-margin-top:70px}
.it-acc{--cw:112px;--gap:10px;--ew:calc(min(1180px,100vw - 64px) - 4 * (var(--cw) + var(--gap)));display:flex;gap:var(--gap);height:600px}
.it-pane{position:relative;flex:0 0 var(--cw);border-radius:22px;overflow:hidden;background:#fff;border:1px solid #e1e8ef;transition:flex-basis .7s cubic-bezier(.16,1,.3,1),background .5s,border-color .5s,box-shadow .5s}
.it-pane:hover:not(.on){border-color:#7dd8cd;background:#fbfffe}
.it-pane.on{flex:1 1 var(--ew);background:linear-gradient(150deg,#0b1220,#101d33 65%,#0f2f3b);border-color:#0b1220;box-shadow:0 36px 70px -34px rgba(8,15,30,.8);color:#fff}
.it-pane .cap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:14px;padding:20px 10px;color:#475569;transition:opacity .35s}
.it-pane.on .cap{opacity:0;pointer-events:none}
.it-pane .cap .no{font-size:12px;font-weight:600;color:#94a3b8;font-variant-numeric:tabular-nums}.it-pane .cap .ic{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#ecfdf5;color:#0d9488;transition:all .3s}.it-pane:hover .cap .ic{background:#0d9488;color:#fff;transform:rotate(-8deg)}
.it-pane .cap .nm{font-size:13.5px;line-height:1.35;font-weight:600;letter-spacing:0;text-align:center;color:#334155;margin-top:2px;text-wrap:balance}
.it-pane .cap .chev{display:none}
.it-pane .body-wrap{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .4s}
.it-pane.on .body-wrap{opacity:1;pointer-events:auto;transition:opacity .5s .3s}
.it-pane .body{position:absolute;left:0;top:0;bottom:0;width:var(--ew);display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,.6fr);gap:16px;padding:32px 26px 28px 34px}
.it-pane .left{display:flex;flex-direction:column;min-width:0}
.it-pane .big{position:absolute;right:26px;top:14px;font-size:84px;line-height:1;font-weight:700;letter-spacing:-.05em;color:rgba(255,255,255,.06)}
.it-pane h3{font-size:clamp(1.25rem,1.9vw,1.6rem);line-height:1.2;letter-spacing:-.02em;font-weight:700;max-width:480px}
.it-pane .left>p{margin-top:10px;color:#a9b8ca;font-size:14.5px;line-height:1.7;max-width:500px}
.it-pane .listhead{display:block;margin:20px 0 11px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5eead4;font-weight:600}
.it-pane ul{list-style:none;margin:0 0 20px;padding:0;display:flex;flex-wrap:wrap;gap:7px}
.it-pane li{display:inline-flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);font-size:12px;font-weight:500;color:#e2e8f0;opacity:0;transform:translateY(8px) scale(.95);transition:background .25s,border-color .25s}
.it-pane.on li{animation:itChip .5s cubic-bezier(.16,1,.3,1) calc(.45s + var(--i) * 35ms) forwards}
.it-pane li svg{color:#5eead4}.it-pane li:hover{background:rgba(94,234,212,.16);border-color:rgba(94,234,212,.5)}
.it-pane .left .it-btn{margin-top:auto;align-self:flex-start}
.it-pane .right{display:grid;place-items:center;min-width:0}

/* mini scenes */
.sc{position:relative;width:100%;max-width:230px;aspect-ratio:1;display:grid;place-items:center}
.sc-web{display:flex;flex-direction:column;gap:7px;padding:10px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);height:auto;aspect-ratio:auto;align-items:stretch;place-items:unset}
.sc-web .bar{display:flex;gap:5px}.sc-web .bar i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.3)}
.sc-web .hd{height:46px;border-radius:9px;background:linear-gradient(135deg,#14b8a6,#6366f1);animation:itSlideIn 4s ease-in-out infinite}
.sc-web .row{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.sc-web .row b{height:40px;border-radius:8px;background:rgba(255,255,255,.12);animation:itSlideIn 4s ease-in-out infinite}.sc-web .row b:nth-child(2){animation-delay:.2s}.sc-web .row b:nth-child(3){animation-delay:.4s}
.sc-web .ln{height:6px;border-radius:4px;background:rgba(255,255,255,.16);animation:itSlideIn 4s ease-in-out .6s infinite}.sc-web .ln.s{width:60%;animation-delay:.8s}
.sc-mobile .ph{width:96px;height:190px;border-radius:20px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.05);padding:18px 8px 8px;position:relative;overflow:hidden;transform:rotate(-5deg)}
.sc-mobile .notch{position:absolute;left:50%;top:6px;width:28px;height:5px;margin-left:-14px;border-radius:5px;background:rgba(255,255,255,.35)}
.sc-mobile .list{display:flex;flex-direction:column;gap:7px;animation:itScroll 5s ease-in-out infinite}.sc-mobile .list i{height:34px;border-radius:9px;background:linear-gradient(135deg,rgba(20,184,166,.5),rgba(99,102,241,.4))}.sc-mobile .list i:nth-child(even){background:rgba(255,255,255,.12)}
.sc-soft .n{position:absolute;width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);color:#5eead4;z-index:2}
.sc-soft .n1{left:6%;top:8%}.sc-soft .n2{right:6%;top:8%}.sc-soft .n3{left:6%;bottom:8%}.sc-soft .n4{right:6%;bottom:8%}
.sc-soft .l{position:absolute;height:2px;background:rgba(94,234,212,.35);transform-origin:left}.sc-soft .l1{left:20%;top:19%;width:60%}.sc-soft .l2{left:20%;bottom:19%;width:60%}.sc-soft .l3{left:50%;top:22%;width:2px;height:56%;transform-origin:top}
.sc-soft .pk{position:absolute;width:8px;height:8px;border-radius:50%;background:#5eead4;box-shadow:0 0 12px #5eead4;z-index:3}.sc-soft .pk1{animation:itPk1 3.4s ease-in-out infinite}.sc-soft .pk2{animation:itPk2 3.4s ease-in-out 1.7s infinite}
.sc-design .frame{position:relative;width:170px;height:130px;border-radius:14px;border:1.5px dashed rgba(255,255,255,.35);background:rgba(255,255,255,.04)}
.sc-design .frame span{position:absolute;border-radius:7px;background:rgba(255,255,255,.14);animation:itColor 5s ease-in-out infinite}.sc-design .a{left:12px;top:12px;width:60%;height:28px}.sc-design .b{left:12px;top:50px;width:40%;height:56px;animation-delay:.5s}.sc-design .c{right:12px;top:50px;width:34%;height:56px;animation-delay:1s}
.sc-design .cursor{position:absolute;left:30%;top:30%;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-bottom:14px solid #fff;transform:rotate(-25deg);filter:drop-shadow(0 4px 6px rgba(0,0,0,.4));animation:itCursor 5s ease-in-out infinite}
.sc-shop{gap:12px;align-content:center}
.sc-shop .prod{width:132px;padding:10px;border-radius:14px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);display:flex;flex-direction:column;gap:7px}
.sc-shop .img{height:64px;border-radius:9px;background:linear-gradient(135deg,#14b8a6,#6366f1)}.sc-shop b{display:block;height:6px;width:80%;border-radius:4px;background:rgba(255,255,255,.3)}.sc-shop s{display:block;height:6px;width:40%;border-radius:4px;background:rgba(255,255,255,.18)}
.sc-shop button{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:6px;border-radius:99px;background:#fff;color:#0f172a;font-size:11px;font-weight:600;animation:itPress 4s ease-in-out infinite}
.sc-shop .paid{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:99px;background:rgba(52,211,153,.18);border:1px solid rgba(52,211,153,.5);color:#6ee7b7;font-size:11px;font-weight:600;animation:itPaid 4s ease-in-out infinite}

/* ============ WHY ============ */
.it-why{padding:96px 0 104px;background:#070d18;color:#fff;overflow:hidden}
.it-why-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
.it-why-card{grid-column:span 2;position:relative;padding:26px 24px 22px;border-radius:20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);overflow:hidden;opacity:0;transform:translateY(28px) scale(.97);transition:opacity .7s ease calc(var(--i) * 120ms),transform .8s cubic-bezier(.16,1,.3,1) calc(var(--i) * 120ms),border-color .3s,background .3s}
.it-why-card:nth-child(n+4){grid-column:span 3}
.it-why-grid.in .it-why-card{opacity:1;transform:none}
.it-why-card:hover{background:rgba(255,255,255,.07);border-color:rgba(94,234,212,.4)}
.it-why-card:before{content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:conic-gradient(from var(--ang,0deg),transparent 0 70%,#5eead4 85%,#818cf8 95%,transparent);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:itSpin 6s linear infinite;opacity:.9;pointer-events:none}
.it-why-card .tag{display:block;font-family:ui-monospace,Menlo,monospace!important;font-size:11.5px;color:#5eead4;margin-bottom:18px;opacity:.85}
.it-why-card .ic{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:rgba(94,234,212,.12);color:#5eead4;margin-bottom:16px;transition:all .35s}.it-why-card:hover .ic{background:#14b8a6;color:#fff;transform:rotate(-8deg) scale(1.06)}
.it-why-card h3{font-size:17px;font-weight:600;letter-spacing:-.015em}.it-why-card p{margin-top:7px;color:#9db0c6;font-size:14px;line-height:1.65;max-width:360px}
.it-why-card .ok{position:absolute;right:16px;top:18px;display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#34d399;opacity:0;transform:scale(.8);transition:all .5s calc(.6s + var(--i) * .12s)}.it-why-grid.in .ok{opacity:1;transform:none}

/* ============ FINDER ============ */
.it-finder{padding:96px 0 104px;background:#fff}
.it-fd{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.5fr);gap:22px;align-items:stretch}
.it-fd-q{display:flex;flex-direction:column;gap:10px}
.it-fd-q button{display:grid;grid-template-columns:30px 1fr auto;align-items:center;gap:10px;text-align:left;padding:22px 18px;border-radius:16px;background:#fff;border:1px solid #e1e8ef;color:#334155;transition:all .35s cubic-bezier(.16,1,.3,1)}
.it-fd-q .no{font-size:12px;font-weight:600;color:#94a3b8}.it-fd-q .t{font-size:15px;font-weight:600}.it-fd-q svg{color:#94a3b8;transition:transform .3s}
.it-fd-q button:hover{border-color:#7dd8cd;transform:translateX(4px)}
.it-fd-q button{position:relative;overflow:hidden}.it-fd-q .bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:linear-gradient(90deg,#34d399,#38bdf8);transform-origin:0 50%;animation:itBar linear forwards}@keyframes itBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.it-fd-q button.on{background:#0f172a;border-color:#0f172a;color:#fff;transform:translateX(8px);box-shadow:0 22px 40px -22px rgba(15,23,42,.7)}.it-fd-q button.on .no,.it-fd-q button.on svg{color:#5eead4}
.it-fd-out{position:relative;display:grid;grid-template-columns:auto 1fr auto 1fr auto;align-items:center;gap:0;padding:30px 26px;border-radius:24px;background:linear-gradient(160deg,#f6f8fc,#eef3f9);border:1px solid #e1e8ef;overflow:hidden;animation:itPanel .6s cubic-bezier(.16,1,.3,1) both}
.it-fd-out:before{content:'';position:absolute;inset:0;background-image:radial-gradient(#cbd5e1 1px,transparent 1px);background-size:18px 18px;opacity:.5;-webkit-mask-image:radial-gradient(70% 80% at 50% 50%,#000,transparent);mask-image:radial-gradient(70% 80% at 50% 50%,#000,transparent)}
.it-fd-out>*{position:relative}
.it-fd .node{width:150px;padding:16px;border-radius:16px;background:#0f172a;color:#fff;box-shadow:0 22px 40px -22px rgba(15,23,42,.7)}
.it-fd .node span{display:block;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#5eead4;font-weight:600;margin-bottom:6px}.it-fd .node b{display:block;font-size:14px;line-height:1.35;font-weight:600}
.it-fd .node.result{background:linear-gradient(145deg,#0d9488,#4f46e5);animation:itPop .6s cubic-bezier(.16,1,.3,1) 1.5s both}.it-fd .node.result span{color:#ccfbf1}.it-fd .node.result .go{display:inline-flex;align-items:center;gap:5px;margin-top:10px;font-size:11.5px;font-weight:600;color:#fff;opacity:.9}
.it-fd .wires{display:flex;flex-direction:column;gap:10px;align-self:center;min-width:40px}
.it-fd .wires i{position:relative;display:block;height:52px;overflow:hidden}
.it-fd .wires i:before{content:'';position:absolute;left:0;right:0;top:calc(50% - 1px);height:2px;background:rgba(15,23,42,.14);border-radius:2px}
.it-fd .wires i:after{content:'';position:absolute;top:calc(50% - 1px);left:-40%;width:40%;height:2px;background:linear-gradient(90deg,transparent,#14b8a6,transparent);animation:itWire 1.8s linear calc(.2s + var(--k,0) * .25s) infinite}
.it-fd .mods{display:flex;flex-direction:column;gap:10px}
.it-fd .mod{display:flex;align-items:center;gap:9px;padding:11px 14px;border-radius:13px;background:#fff;border:1px solid #dce6ee;font-size:13px;font-weight:600;color:#0f172a;box-shadow:0 14px 26px -18px rgba(15,23,42,.35);animation:itSnap .6s cubic-bezier(.16,1,.3,1) calc(.5s + var(--k,0) * .25s) both}
.it-fd .mod .ic{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;background:#ecfdf5;color:#0d9488;flex:none}.it-fd .mod .ck{margin-left:auto;color:#10b981;opacity:0;animation:itFadeIn .4s ease calc(1.1s + var(--k,0) * .25s) forwards}

/* ============ JAIPUR ============ */
.it-jaipur{padding:24px 0 96px;background:#fff}
.it-jaipur-card{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:30px;align-items:center;padding:52px;border-radius:28px;color:#fff;overflow:hidden;background:linear-gradient(135deg,#0a1120,#111d36 60%,#0c2f3a);box-shadow:0 40px 80px -40px rgba(8,15,30,.75)}
.it-jaipur-card:before{content:'';position:absolute;inset:-40%;background:radial-gradient(circle at 82% 50%,rgba(99,102,241,.24),transparent 36%);pointer-events:none}
.it-jaipur .txt{position:relative}.it-jaipur .it-kicker{color:#5eead4}.it-jaipur h2{color:#fff}
.it-jaipur .txt p{color:#a5b4c8;font-size:15.5px;line-height:1.75;margin-bottom:12px;max-width:520px}
.it-jaipur .route{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin:18px 0 24px;color:#5eead4}.it-jaipur .route span{padding:7px 14px;border-radius:99px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);font-size:13px;font-weight:600;color:#fff}
.it-jaipur .map{position:relative}.it-jaipur .map svg{width:100%;height:auto;display:block;overflow:visible}
.it-jaipur .gl{stroke:rgba(255,255,255,.06);stroke-width:1}
.it-jaipur .cd{fill:#38bdf8;opacity:.15;animation:itDot 4s ease-in-out infinite}
.it-jaipur .route-bg{fill:none;stroke:rgba(255,255,255,.12);stroke-width:2;stroke-dasharray:4 6}
.it-jaipur .route{fill:none}
.it-jaipur path.route{stroke:url(#itRt);stroke-width:3;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1}.it-jaipur .map.in path.route{animation:itDraw 2s cubic-bezier(.4,0,.2,1) .4s forwards}
.it-jaipur .pk{fill:#fff;filter:drop-shadow(0 0 6px #5eead4)}.it-jaipur .pk.b{fill:#a5b4fc}
.it-jaipur .nd{opacity:0;transform-box:fill-box}.it-jaipur .map.in .nd{animation:itFadeIn .6s ease both}
.it-jaipur .halo{fill:rgba(94,234,212,.15);animation:itHalo 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}.it-jaipur .core{fill:#5eead4;stroke:#0a1120;stroke-width:3}
.it-jaipur .nd text{fill:#fff;font-size:12px;font-weight:600}

/* ============ FAQ ============ */
.it-faq{padding:88px 0 96px;background:#f6f8fc}
.it-faq-list{display:grid;gap:10px}
.it-faq-item{border:1px solid #e1e8ef;border-radius:16px;background:#fff;overflow:hidden;transition:border-color .3s,box-shadow .3s}.it-faq-item.open{border-color:#8adbd0;box-shadow:0 16px 34px -22px rgba(15,23,42,.35)}
.it-faq-item button{width:100%;display:flex;align-items:center;gap:14px;padding:18px 22px;text-align:left;font-size:15px;font-weight:600;color:#172235}
.it-faq-item .pr{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:#f1f5f9;color:#64748b;font-family:ui-monospace,Menlo,monospace!important;font-size:12px;transition:all .3s}.it-faq-item.open .pr{background:#0f172a;color:#5eead4}
.it-faq-item .q{flex:1}.it-faq-item button>svg{flex:none;color:#0d9488;transition:transform .4s cubic-bezier(.16,1,.3,1)}.it-faq-item.open button>svg{transform:rotate(180deg)}
.it-faq-item .ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.16,1,.3,1)}.it-faq-item.open .ans{grid-template-rows:1fr}
.it-faq-item .ans .in{overflow:hidden}
.it-faq-item .ans p{margin:0 22px 20px 60px;padding:12px 14px;border-radius:12px;background:#0b1220;color:#cbd5e1;font-size:14px;line-height:1.7}
.it-faq-item.open .ans p{animation:itType 1.1s steps(46,end) both;border-right:2px solid #5eead4;animation-name:itType,itCaretOff;animation-duration:1.1s,.2s;animation-delay:.1s,1.3s;animation-fill-mode:both,forwards}

/* ============ CTA ============ */
.it-cta{padding:104px 0;background:#070d18;color:#fff;overflow:hidden}
.it-cta h2{color:#fff;max-width:640px;margin-left:auto;margin-right:auto}.it-cta .it-kicker{color:#5eead4}
.it-cta p{color:#9db0c6;max-width:560px;margin:0 auto;font-size:clamp(15px,1.1vw,16.5px);line-height:1.7}
.it-cta strong{display:block;margin:14px 0 24px;font-size:17px;font-weight:600;color:#fff}
.it-glyphs{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.it-glyphs span{position:absolute;left:var(--x);bottom:-40px;font-family:ui-monospace,Menlo,monospace!important;font-size:18px;color:rgba(94,234,212,.28);animation:itRise var(--t) linear var(--dl) infinite}

/* ============ KEYFRAMES ============ */
@keyframes itDrift{to{transform:translate3d(2%,3%,0) scale(1.06)}}
@keyframes itGrad{to{background-position:200% 0}}
@keyframes itPing{0%{box-shadow:0 0 0 0 rgba(20,184,166,.55)}80%,100%{box-shadow:0 0 0 8px rgba(20,184,166,0)}}
@keyframes itBlink{50%{opacity:0}}
@keyframes itFloat{50%{transform:translateY(-9px) rotate(4deg)}}
@keyframes itBar{0%,100%{transform:scaleY(.6)}50%{transform:scaleY(1)}}
@keyframes itChip{to{opacity:1;transform:none}}
@keyframes itSlideIn{0%{opacity:0;transform:translateY(10px)}18%,80%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-4px)}}
@keyframes itScroll{0%,100%{transform:translateY(0)}50%{transform:translateY(-62px)}}
@keyframes itPk1{0%{left:20%;top:19%}50%{left:76%;top:19%}100%{left:76%;top:76%}}
@keyframes itPk2{0%{left:76%;top:76%}50%{left:20%;top:76%}100%{left:20%;top:19%}}
@keyframes itColor{0%,20%{background:rgba(255,255,255,.14)}50%,80%{background:linear-gradient(135deg,#14b8a6,#6366f1)}100%{background:rgba(255,255,255,.14)}}
@keyframes itCursor{0%{left:20%;top:20%}25%{left:35%;top:55%}50%{left:62%;top:60%}75%{left:45%;top:25%}100%{left:20%;top:20%}}
@keyframes itPress{0%,40%,100%{transform:none}46%{transform:scale(.9);background:#5eead4}54%{transform:none}}
@keyframes itPaid{0%,55%{opacity:0;transform:translateY(8px)}65%,92%{opacity:1;transform:none}100%{opacity:0}}
@keyframes itSpin{to{--ang:360deg}}
@keyframes itPanel{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes itPop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
@keyframes itSnap{from{opacity:0;transform:translateX(-24px) scale(.94)}to{opacity:1;transform:none}}
@keyframes itFadeIn{to{opacity:1}}
@keyframes itWire{to{left:100%}}
@keyframes itDraw{to{stroke-dashoffset:0}}
@keyframes itDot{0%,100%{opacity:.12}50%{opacity:.9}}
@keyframes itHalo{50%{transform:scale(1.5);opacity:.4}}
@keyframes itType{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes itCaretOff{to{border-right-color:transparent}}
@keyframes itRise{0%{transform:translateY(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateY(-110vh);opacity:0}}
@property --ang{syntax:'<angle>';initial-value:0deg;inherits:false}

/* ============ RESPONSIVE ============ */
@media(max-width:1100px){.it-hero-in{gap:36px}.it-phone{right:-8px}.it-badge.b1{left:-8px}}
@media(max-width:980px){
  .it-wrap,.it-wrap.narrow{width:calc(100% - 48px)}
  .it-hero{padding:104px 0 64px}.it-hero-in{grid-template-columns:1fr;gap:44px}.it-ide-wrap{max-width:640px;width:100%;margin:0 auto}
  .it-modern{padding:76px 0}.it-modern-in{grid-template-columns:1fr;gap:20px}.it-stack3d{height:380px}
  .it-acc{flex-direction:column;height:auto;--gap:10px}
  .it-pane,.it-pane.on{flex:none}
  .it-pane .cap{position:relative;inset:auto;flex-direction:row;align-items:center;gap:12px;padding:16px 18px;width:100%;text-align:left}
  .it-pane.on .cap{opacity:1;pointer-events:auto;color:#fff}.it-pane.on .cap .no{color:#5eead4}.it-pane.on .cap .ic{background:rgba(94,234,212,.15);color:#5eead4}
  .it-pane .cap .nm{writing-mode:horizontal-tb;transform:none;margin:0;flex:1;text-align:left;font-size:14.5px}.it-pane.on .cap .nm{color:#fff}
  .it-pane .cap .chev{display:block;color:#94a3b8;transition:transform .4s}.it-pane.on .cap .chev{transform:rotate(180deg);color:#5eead4}
  .it-pane .body-wrap{position:relative;inset:auto;display:grid;grid-template-rows:0fr;opacity:1;overflow:hidden;pointer-events:auto;transition:grid-template-rows .55s cubic-bezier(.16,1,.3,1)}
  .it-pane.on .body-wrap{grid-template-rows:1fr;transition:grid-template-rows .55s cubic-bezier(.16,1,.3,1)}
  .it-pane .body{position:relative;width:auto;grid-template-columns:1fr;padding:0 22px;overflow:hidden;min-height:0;transition:padding .55s}.it-pane.on .body{padding:2px 22px 24px}
  .it-pane .body-wrap>.body{min-height:0}
  .it-pane .right{display:none}.it-pane .big{display:none}
  .it-why-grid{grid-template-columns:1fr 1fr}.it-why-card,.it-why-card:nth-child(n+4){grid-column:span 1}.it-why-card:nth-child(5){grid-column:1/-1}
  .it-fd{grid-template-columns:1fr}.it-fd-q{flex-direction:row;overflow-x:auto;scrollbar-width:none}.it-fd-q::-webkit-scrollbar{display:none}.it-fd-q button{flex:none;min-width:230px}.it-fd-q button:hover,.it-fd-q button.on{transform:none}
  .it-jaipur-card{grid-template-columns:1fr;padding:38px 30px}.it-jaipur .map{max-width:420px;margin:0 auto;width:100%}
}
@media(max-width:680px){
  .it-wrap,.it-wrap.narrow{width:calc(100% - 32px)}
  .it-hero{padding:92px 0 52px}.it-hero h1{font-size:clamp(1.75rem,7.6vw,2.05rem)}.it-hero .it-actions .it-btn{flex:1 1 100%}
  .it-ide-body{grid-template-columns:1fr}.it-code{border-right:0;border-bottom:1px solid #1b2a42;font-size:10.5px}.it-prev{display:none}
  .it-phone{width:78px;height:142px;right:-4px;bottom:-14px;border-radius:16px}.it-phone .scr{padding:16px 6px 6px}.it-badge.b1{left:-4px;top:-4px;font-size:10.5px}.it-badge.b2{display:none}
  .it-modern,.it-services,.it-why,.it-finder,.it-faq{padding-top:68px;padding-bottom:68px}.it-cta{padding:76px 0}
  .it-head{margin-bottom:32px}.it-stack3d{height:320px}.it-stack3d .scene{width:78%;height:170px}
  .it-why-grid{grid-template-columns:1fr}.it-why-card:nth-child(5){grid-column:auto}
  .it-fd-out{grid-template-columns:1fr;gap:0;padding:22px 18px}.it-fd .node{width:100%}.it-fd .wires{flex-direction:row;gap:0;min-height:30px;min-width:0;padding:0 24px;justify-content:space-around;align-self:stretch}.it-fd .wires i{width:2px;height:30px}.it-fd .wires i:before{display:none}.it-fd .wires i{background:rgba(15,23,42,.14);border-radius:2px}.it-fd .wires i:after{left:0;top:-40%;width:100%;height:40%;background:linear-gradient(transparent,#14b8a6,transparent);animation-name:itWireV}
  .it-jaipur{padding-bottom:68px}.it-jaipur-card{padding:30px 22px;border-radius:22px}
  .it-faq-item button{padding:16px;font-size:14px}.it-faq-item .ans p{margin:0 16px 16px 16px}
}
@keyframes itWireV{to{top:100%}}
@media(prefers-reduced-motion:reduce){
  .it-bg,.it-hero h1 span,.it-pill i,.caret,.it-phone.on,.it-badge.b1,.it-why-card:before,.it-glyphs span,.it-fd .wires i:after,.sc *,.it-jaipur .halo,.it-jaipur .cd{animation:none!important}
  .it-rv{opacity:1;transform:none;transition:none}.it-why-card{opacity:1;transform:none}.it-pane li{opacity:1;transform:none;animation:none!important}
}
`;
