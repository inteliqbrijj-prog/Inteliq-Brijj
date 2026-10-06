import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight, BarChart3, Building2, Check, ChevronDown, Compass, FileText, Gauge, Globe, Layers, LineChart,
  Mail, MapPin, Megaphone, MessageSquare, MousePointerClick, Rocket, Search, Share2, Sparkles, Store, Target,
  TrendingUp, Users, Zap, Briefcase,
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

function Rv({ children, delay = 0, className = '', as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.14);
  const Tag = as as 'div';
  return <Tag ref={ref} className={`dm-rv ${shown ? 'in' : ''} ${className}`} style={{ ['--d' as string]: `${delay}ms` } as Vars}>{children}</Tag>;
}

/** writes --p (0..1) on the element while it travels through the viewport */
function useScrollP<T extends HTMLElement>(onStep?: (p: number) => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.82 - r.top) / (r.height * 0.85 + vh * 0.1));
      el.style.setProperty('--p', p.toFixed(4));
      onStep?.(p);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

function Count({ to, prefix = '', suffix = '', decimals = 0, ms = 1100 }: { to: number; prefix?: string; suffix?: string; decimals?: number; ms?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = clamp((t - t0) / ms);
      setV(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return <>{prefix}{v.toFixed(decimals)}{suffix}</>;
}

function Head({ kicker, title, text, center = true, light = false }: { kicker: string; title: string; text?: string; center?: boolean; light?: boolean }) {
  return (
    <Rv className={`dm-head ${center ? 'center' : ''} ${light ? 'light' : ''}`}>
      <span className="dm-kicker">{kicker}</span>
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
    id: 'digital-marketing', no: '01', tab: 'Digital Marketing Services', icon: Megaphone,
    headline: 'Build Visibility. Reach the Right Audience.',
    text: 'Our digital marketing strategies bring together paid advertising, content, search and conversion focused marketing to help businesses connect with potential customers across relevant digital channels.',
    head: 'Our Digital Marketing Services',
    items: ['Search Engine Marketing', 'PPC', 'Google Ads', 'Meta Ads', 'Content Marketing', 'Email Marketing', 'Affiliate Marketing', 'Conversion Rate Optimisation', 'Online Reputation Management', 'Lead Generation', 'Marketing Automation'],
    cta: 'Explore Digital Marketing', path: '/digital-marketing#digital-marketing',
  },
  {
    id: 'seo', no: '02', tab: 'SEO Services', icon: Search,
    headline: 'Get Found When Your Customers Search',
    text: 'Our SEO services focus on improving organic search visibility through technical optimisation, useful content, website improvements and search focused strategies.',
    head: 'Our SEO Services',
    items: ['Local SEO', 'Technical SEO', 'On Page SEO', 'Off Page SEO', 'E Commerce SEO', 'International SEO', 'Enterprise SEO', 'SEO Audit', 'Keyword Research', 'Link Building', 'Competitor SEO Analysis', 'Google Business Profile Optimisation'],
    cta: 'Explore SEO Services', path: '/digital-marketing#seo',
  },
  {
    id: 'social', no: '03', tab: 'Social Media Marketing', icon: Share2,
    headline: 'Turn Social Attention Into Brand Growth',
    text: 'We help businesses build a consistent social presence through strategy, creative content, paid campaigns and audience focused social media marketing.',
    head: 'Our Social Media Services',
    items: ['Social Media Management', 'Social Media Marketing', 'Instagram Marketing', 'Facebook Marketing', 'LinkedIn Marketing', 'YouTube Marketing', 'Social Media Advertising', 'Social Media Strategy', 'Content Creation', 'Reels and Short Form Video Marketing', 'Influencer Marketing', 'Social Media Analytics'],
    cta: 'Explore Social Media Marketing', path: '/digital-marketing#social',
  },
];

const practices = [
  { title: 'Audience Research', short: 'Know who you reach.', detail: 'We study who you need to reach, what they search for and where they make decisions.', tags: ['Audience', 'Intent', 'Market'] },
  { title: 'Keyword Strategy', short: 'Target real search intent.', detail: 'Keywords are mapped to pages and business goals so you appear for searches that matter.', tags: ['SEO', 'Content'] },
  { title: 'Technical SEO', short: 'Crawlable, fast, indexed.', detail: 'Clean structure, speed and indexing give search engines a solid foundation to rank you.', tags: ['Crawl', 'Speed', 'Index'] },
  { title: 'Content Calendar', short: 'Consistent, useful content.', detail: 'Content is planned around audience questions and search demand, then published on a steady rhythm.', tags: ['Blogs', 'Social', 'Email'] },
  { title: 'Paid Campaigns', short: 'Budget on what converts.', detail: 'Google Ads and Meta Ads budgets are focused on the audiences and keywords that bring results.', tags: ['Google Ads', 'Meta Ads'] },
  { title: 'Social Presence', short: 'Engage and build trust.', detail: 'Consistent posting, creative and community activity keep your brand visible and credible.', tags: ['Instagram', 'LinkedIn', 'YouTube'] },
  { title: 'Conversion Tracking', short: 'Every lead measured.', detail: 'Forms, calls and sales are tracked so you can see which channels create real enquiries.', tags: ['Analytics', 'Leads'] },
  { title: 'A/B Testing', short: 'Decisions from data.', detail: 'Headlines, creatives and landing pages are tested so improvements come from evidence.', tags: ['CRO', 'Landing pages'] },
  { title: 'Monthly Reporting', short: 'Plain-language progress.', detail: 'Clear reports on performance, learnings and next steps, without jargon.', tags: ['Reports', 'Insights'] },
  { title: 'Continuous Optimisation', short: 'Always improving.', detail: 'Insights refine channels, budgets and content so results keep improving over time.', tags: ['Review', 'Refine', 'Scale'] },
];

const together = [
  { icon: Search, title: 'SEO', text: 'Builds organic search visibility.' },
  { icon: Megaphone, title: 'Paid Advertising', text: 'Helps reach targeted audiences quickly.' },
  { icon: FileText, title: 'Content Marketing', text: 'Supports awareness, trust and search visibility.' },
  { icon: Share2, title: 'Social Media', text: 'Builds audience engagement and brand presence.' },
  { icon: BarChart3, title: 'CRO and Analytics', text: 'Help understand performance and improve conversions.' },
];

const goals = [
  { icon: Search, title: 'Want Better Search Visibility?', stack: ['SEO', 'Content Marketing', 'Google Business Profile'], path: '/digital-marketing#seo' },
  { icon: Target, title: 'Need More Qualified Leads?', stack: ['SEO', 'Google Ads', 'Meta Ads', 'Lead Generation'], path: '/digital-marketing#digital-marketing' },
  { icon: Share2, title: 'Want to Grow Your Social Presence?', stack: ['Social Media', 'Content', 'Paid Advertising'], path: '/digital-marketing#social' },
  { icon: Megaphone, title: 'Building Stronger Brand Awareness?', stack: ['Content Marketing', 'Social Media', 'Digital Advertising'], path: '/contact' },
  { icon: MousePointerClick, title: 'Want to Improve Conversions?', stack: ['CRO', 'Analytics', 'SEO', 'Paid Advertising'], path: '/contact' },
  { icon: Store, title: 'Growing an E Commerce Business?', stack: ['E Commerce SEO', 'Google Ads', 'Social Media Marketing'], path: '/it-solutions#ecommerce' },
];

const whoWeHelp = [
  { icon: Rocket, t: 'Startups' }, { icon: Building2, t: 'Small and Medium Businesses' }, { icon: Store, t: 'E Commerce Businesses' },
  { icon: MapPin, t: 'Local Businesses' }, { icon: Briefcase, t: 'Professional Services' }, { icon: TrendingUp, t: 'Growing Businesses' },
  { icon: Globe, t: 'Businesses Building a New Online Presence' },
];

const why = [
  { icon: Target, title: 'Business Focused Strategy', text: 'Marketing activities aligned with your business goals.' },
  { icon: Users, title: 'Audience First Approach', text: 'Strategies built around the people you want to reach.' },
  { icon: Layers, title: 'Multiple Digital Capabilities', text: 'SEO, advertising, content, social media and conversion focused services under one team.' },
  { icon: MessageSquare, title: 'Clear Communication', text: 'A straightforward approach to strategy, execution and communication.' },
  { icon: LineChart, title: 'Continuous Optimisation', text: 'Digital marketing can be measured, reviewed and improved over time.' },
];

const process = [
  { icon: Compass, title: 'Understand', text: 'We learn about your business, audience, objectives and current digital presence.' },
  { icon: Target, title: 'Strategise', text: 'We identify relevant channels and create a focused digital marketing approach.' },
  { icon: Rocket, title: 'Launch', text: 'Campaigns, content and optimisation activities are implemented according to the strategy.' },
  { icon: Gauge, title: 'Measure', text: 'Performance is reviewed using relevant marketing and website data.' },
  { icon: Sparkles, title: 'Optimise', text: 'Insights are used to refine the approach and improve future performance.' },
];

const faqs: [string, string][] = [
  ['What Is Digital Marketing?', 'Digital marketing uses online channels such as search engines, websites, social media, advertising, email and content to reach and engage relevant audiences.'],
  ['What Digital Marketing Services Do You Provide?', 'We provide digital marketing, SEO, Google Ads, PPC, Meta Ads, social media marketing, content marketing, lead generation, CRO and related services.'],
  ['How Is SEO Different From Paid Advertising?', 'SEO focuses on improving organic search visibility, while paid advertising uses advertising platforms to reach selected audiences through paid campaigns.'],
  ['Is Digital Marketing Suitable for Small Businesses?', 'Yes. Digital marketing can help small businesses build online visibility, reach relevant audiences and compete for attention across digital channels. The right approach depends on the business, audience and goals.'],
  ['How Long Does SEO Take?', 'SEO is generally a longer term activity. The timeline can vary depending on the website, competition, industry, existing visibility and the work being implemented.'],
  ['Can SEO and Google Ads Work Together?', 'Yes. SEO and Google Ads can support different parts of a digital marketing strategy. SEO focuses on organic visibility while Google Ads provides paid search visibility.'],
];

/* ------------------------------------------------------------------ */
/* 1. HERO — copy left, animated growth dashboard right               */
/* ------------------------------------------------------------------ */
const dashTabs = [
  { k: 'SEO', color: '#10b981', data: [14, 18, 17, 26, 31, 42, 58, 78], kpi: [{ l: 'Organic traffic', to: 128, p: '+', s: '%' }, { l: 'Keywords in top 10', to: 86, p: '', s: '' }, { l: 'Avg. position', to: 3.2, p: '', s: '', d: 1 }], rank: 1, toast: 'Page 1 ranking · "digital marketing jaipur"' },
  { k: 'Google Ads', color: '#3b82f6', data: [20, 24, 30, 28, 40, 52, 61, 74], kpi: [{ l: 'Qualified leads', to: 412, p: '', s: '' }, { l: 'Cost per lead', to: 38, p: '-', s: '%' }, { l: 'ROAS', to: 4.8, p: '', s: 'x', d: 1 }], rank: 2, toast: 'New enquiry · Google Ads campaign' },
  { k: 'Social', color: '#8b5cf6', data: [10, 15, 22, 21, 33, 40, 55, 70], kpi: [{ l: 'Engagement rate', to: 6.4, p: '', s: '%', d: 1 }, { l: 'Followers growth', to: 212, p: '+', s: '%' }, { l: 'Video views', to: 48, p: '', s: 'K' }], rank: 1, toast: 'Reel reached 48K people this week' },
  { k: 'CRO', color: '#f59e0b', data: [16, 17, 21, 26, 30, 38, 49, 66], kpi: [{ l: 'Conversion rate', to: 3.9, p: '', s: '%', d: 1 }, { l: 'Form completions', to: 164, p: '+', s: '%' }, { l: 'Bounce rate', to: 31, p: '-', s: '%' }], rank: 3, toast: 'Landing page test won · +24% leads' },
];

function curve(data: number[], w: number, h: number, max: number) {
  const pts = data.map((v, i) => [(i * w) / (data.length - 1), h - 14 - (v / max) * (h - 34)] as const);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]; const [x1, y1] = pts[i]; const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return { line: d, area: `${d} L${w},${h} L0,${h} Z`, end: pts[pts.length - 1] };
}

function HeroDash() {
  const [i, setI] = useState(0);
  const [rank, setRank] = useState(9);
  useEffect(() => { const t = window.setInterval(() => setI((c) => (c + 1) % dashTabs.length), 4800); return () => window.clearInterval(t); }, []);
  useEffect(() => {
    setRank(9);
    const target = dashTabs[i].rank;
    const t = window.setInterval(() => setRank((r) => (r > target ? r - 1 : r)), 260);
    return () => window.clearInterval(t);
  }, [i]);
  const tab = dashTabs[i];
  const g = curve(tab.data, 400, 170, 90);
  return (
    <div className="dm-dash-wrap" aria-hidden="true">
      <div className="dm-dash" style={{ ['--c' as string]: tab.color } as Vars}>
        <div className="dm-dash-bar">
          <span className="dots"><i /><i /><i /></span>
          <span className="ttl">Growth dashboard</span>
          <span className="live"><b /> Live</span>
        </div>
        <div className="dm-dash-tabs">
          {dashTabs.map((t, n) => <button key={t.k} type="button" tabIndex={-1} className={n === i ? 'on' : ''} onClick={() => setI(n)}>{t.k}</button>)}
        </div>
        <div className="dm-kpis" key={`k${i}`}>
          {tab.kpi.map((k, n) => (
            <div className="dm-kpi" key={k.l} style={{ ['--d' as string]: `${n * 90}ms` } as Vars}>
              <span>{k.l}</span>
              <b><Count to={k.to} prefix={k.p} suffix={k.s} decimals={k.d ?? 0} /></b>
            </div>
          ))}
        </div>
        <div className="dm-chart">
          <svg viewBox="0 0 400 170" preserveAspectRatio="none" key={`c${i}`}>
            <defs>
              <linearGradient id="dmArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={tab.color} stopOpacity=".28" /><stop offset="1" stopColor={tab.color} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((n) => <line key={n} x1="0" x2="400" y1={20 + n * 42} y2={20 + n * 42} className="grid" />)}
            <path d={g.area} fill="url(#dmArea)" className="area" />
            <path d={g.line} pathLength={1} className="line" stroke={tab.color} />
          </svg>
          <span className="dm-dot" style={{ left: `${(g.end[0] / 400) * 100}%`, top: `${(g.end[1] / 170) * 100}%` }} key={`d${i}`} />
        </div>
      </div>

      <div className="dm-float serp">
        <span className="lab"><Search size={12} /> Google · digital marketing jaipur</span>
        <div className="row"><b className={rank === tab.rank ? 'top' : ''}>#{rank}</b><i style={{ width: `${100 - rank * 7}%` }} /></div>
      </div>
      <div className="dm-float toast" key={`t${i}`}>
        <span className="ic"><Zap size={13} /></span>
        <span>{tab.toast}</span>
      </div>
      <div className="dm-float bars">
        <span className="lab">Spend vs revenue</span>
        <div>{[40, 55, 48, 70, 62, 88].map((h, n) => <i key={n} style={{ ['--h' as string]: `${h}%`, ['--i' as string]: n } as Vars} />)}</div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="dm-hero">
      <div className="dm-aurora" aria-hidden="true" /><div className="dm-grid" aria-hidden="true" />
      <div className="dm-wrap dm-hero-in">
        <div className="dm-hero-text">
          <span className="dm-pill"><i /> Digital Marketing</span>
          <h1>Digital Marketing That Helps Your Business <span>Grow</span></h1>
          <p>Professional digital marketing services for businesses across India, combining SEO, Google Ads, social media, content and conversion focused strategies to improve online visibility and generate meaningful business opportunities.</p>
          <div className="dm-actions">
            <Link to="/contact" className="dm-btn dark">Start Your Project <ArrowRight size={15} /></Link>
            <Link to="/contact" className="dm-btn light">Talk to Our Team</Link>
          </div>
          <div className="dm-trust"><MapPin size={14} /> Jaipur Based · Serving Businesses Across India</div>
        </div>
        <HeroDash />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. DIGITAL MARKETING SERVICES FOR MODERN BUSINESSES                */
/* ------------------------------------------------------------------ */
const orbitNodes = [
  { icon: Search, t: 'SEO' }, { icon: Megaphone, t: 'Google Ads' }, { icon: Share2, t: 'Social' },
  { icon: FileText, t: 'Content' }, { icon: Mail, t: 'Email' }, { icon: Target, t: 'Leads' },
];

function LitWords({ text, from, to }: { text: string; from: number; to: number }) {
  const words = text.split(' ');
  return <>{words.map((w, n) => <span key={n} className="dm-lw" style={{ ['--a' as string]: from + (to - from) * (n / words.length), ['--b' as string]: from + (to - from) * ((n + 1) / words.length) } as Vars}>{w} </span>)}</>;
}

function Modern() {
  const ref = useScrollP<HTMLElement>();
  return (
    <section className="dm-modern" ref={ref}>
      <div className="dm-wrap dm-modern-in">
        <div className="dm-modern-text">
          <span className="dm-kicker">DIGITAL MARKETING SERVICES FOR MODERN BUSINESSES</span>
          <h2>Being Online Is Only the Beginning</h2>
          <p className="lead"><LitWords text="Your business needs to reach the right audience, appear where customers are searching and create a digital experience that supports your business goals." from={0.02} to={0.34} /></p>
          <p><LitWords text="Inteliq Brijj Solutions provides digital marketing services in Jaipur and across India, helping businesses build visibility, attract relevant audiences and improve their online presence." from={0.34} to={0.68} /></p>
          <p><LitWords text="From SEO and Google Ads to social media marketing, content and lead generation, we connect different digital channels around your business objectives." from={0.68} to={0.96} /></p>
          <Rv delay={120}><Link to="/contact" className="dm-btn dark">Plan My Marketing <ArrowRight size={15} /></Link></Rv>
        </div>
        <div className="dm-orbit" aria-hidden="true">
          <div className="dm-orbit-ring r1" /><div className="dm-orbit-ring r2" />
          <div className="dm-orbit-core"><Sparkles size={18} /><b>Your Business</b><span>Goals</span></div>
          <div className="dm-orbit-spin">
            {orbitNodes.map((n, k) => {
              const I = n.icon;
              return (
                <div className="dm-orbit-node" key={n.t} style={{ ['--a' as string]: `${k * 60}deg` } as Vars}>
                  <span className="beam" />
                  <div className="chip"><I size={14} /> {n.t}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. OUR DIGITAL MARKETING SERVICES                                   */
/* ------------------------------------------------------------------ */
function Services() {
  const [sel, setSel] = useState(0);
  const [paused, setPaused] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const h = loc.hash.replace('#', '');
    const idx = services.findIndex((s) => s.id === h || (h === 'social-media' && s.id === 'social'));
    if (idx >= 0) {
      setSel(idx); setPaused(true);
      window.setTimeout(() => document.getElementById('dm-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  }, [loc.hash]);
  const s = services[sel];
  const Icon = s.icon;
  return (
    <section className="dm-services" id="dm-services">
      <div className="dm-wrap">
        <Head kicker="OUR DIGITAL MARKETING SERVICES" title="Everything You Need to Grow Online" text="Three connected service areas, planned around your audience and business goals." />
        <Rv className="dm-svc" delay={80}>
          <div className="dm-svc-tabs" role="tablist" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {services.map((x, n) => {
              const I = x.icon;
              return (
                <button key={x.id} type="button" role="tab" aria-selected={sel === n} className={`dm-svc-tab ${sel === n ? 'on' : ''}`} onClick={() => setSel(n)}>
                  <span className="no">{x.no}</span>
                  <span className="nm">{x.tab}</span>
                  <I size={17} />
                  <span className="bar"><i key={`${sel}-${n}`} style={{ animationPlayState: paused ? 'paused' : 'running' }} onAnimationEnd={() => { if (sel === n) setSel((c) => (c + 1) % services.length); }} /></span>
                </button>
              );
            })}
          </div>
          <div className="dm-svc-panel" key={s.id} id={s.id} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <span className="big">{s.no}</span>
            <span className="ico"><Icon size={20} /></span>
            <h3>{s.headline}</h3>
            <p>{s.text}</p>
            <span className="listhead">{s.head}</span>
            <ul>
              {s.items.map((it, n) => <li key={it} style={{ ['--i' as string]: n } as Vars}><Check size={13} />{it}</li>)}
            </ul>
            <Link to={s.path} className="dm-btn white">{s.cta} <ArrowRight size={15} /></Link>
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. TEN PRACTICES — 3D tile wave, hover reveals content              */
/* ------------------------------------------------------------------ */
function Practices() {
  const { ref, shown } = useInView<HTMLDivElement>(0.12);
  const [active, setActive] = useState(0);
  const [hl, setHl] = useState<number | null>(null);
  const per = 2;
  const cols = Math.ceil(practices.length / per);
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const g = e.currentTarget.firstElementChild as HTMLElement;
    g.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
    g.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
  };
  const leave = (e: MouseEvent<HTMLDivElement>) => {
    const g = e.currentTarget.firstElementChild as HTMLElement;
    g.style.setProperty('--ry', '0deg'); g.style.setProperty('--rx', '0deg');
    if (window.matchMedia('(hover: hover)').matches) setHl(null);
  };
  const cur = practices[active];
  return (
    <section className="dm-practices">
      <div className="dm-wrap">
        <Head kicker="HOW WE GROW YOU" title="Ten Practices Behind Every Campaign" text="Move your mouse across the board. Each practice keeps campaigns focused and measurable." />
        <div ref={ref} className={`dm-wave ${shown ? 'in' : ''}`} onMouseMove={move} onMouseLeave={leave}>
          <div className="dm-wave-grid">
            {Array.from({ length: cols }).map((_, c) => (
              <div key={c} className="dm-wave-col" style={{ ['--off' as string]: `${Math.abs(c - (cols - 1) / 2) * 2.6}rem` } as Vars}>
                {practices.slice(c * per, c * per + per).map((t, k) => {
                  const n = c * per + k;
                  return (
                    <button key={t.title} type="button" className={`dm-tile ${hl === n ? 'on' : ''}`}
                      style={{ ['--i' as string]: n, ['--h' as string]: 150 + c * 22 } as Vars}
                      onMouseEnter={() => { setActive(n); setHl(n); }} onFocus={() => { setActive(n); setHl(n); }} onClick={() => { setActive(n); setHl(n); }}>
                      <b>{n + 1}</b>
                      <div className="base"><h4>{t.title}</h4><p>{t.short}</p></div>
                      <div className="more">
                        <h4>{t.title}</h4>
                        <p>{t.detail}</p>
                        <span className="tags">{t.tags.map((x) => <em key={x}>{x}</em>)}</span>
                      </div>
                      <span className="shine" />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="dm-peek" aria-live="polite">
          <div className="dm-peek-in" key={active}>
            <span className="n">{String(active + 1).padStart(2, '0')}</span>
            <div><h4>{cur.title}</h4><p>{cur.detail}</p></div>
            <span className="tags">{cur.tags.map((x) => <em key={x}>{x}</em>)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. HOW OUR SERVICES WORK TOGETHER                                   */
/* ------------------------------------------------------------------ */
function Together() {
  const [lit, setLit] = useState(0);
  const [hold, setHold] = useState(false);
  const { ref, shown } = useInView<HTMLElement>(0.25);
  useEffect(() => {
    if (!shown || hold) return;
    const t = window.setInterval(() => setLit((c) => (c + 1) % together.length), 1900);
    return () => window.clearInterval(t);
  }, [shown, hold]);
  return (
    <section className="dm-together" ref={ref}>
      <div className="dm-glow" aria-hidden="true" />
      <div className="dm-wrap">
        <Head light kicker="HOW OUR DIGITAL MARKETING SERVICES WORK TOGETHER" title="Search + Paid Ads + Content + Social + Conversion" text="Different digital channels support different stages of the customer journey. Instead of treating every channel separately, we connect them around your business goals." />
        <div className={`dm-flow ${shown ? 'in' : ''}`} onMouseLeave={() => setHold(false)} style={{ ['--lit' as string]: lit } as Vars}>
          <div className="dm-flow-line"><i style={{ width: `${(lit / (together.length - 1)) * 100}%` }} /><b style={{ left: `${(lit / (together.length - 1)) * 100}%` }} /></div>
          {together.map((t, n) => {
            const I = t.icon;
            return (
              <button type="button" key={t.title} className={`dm-flow-node ${n <= lit ? 'done' : ''} ${n === lit ? 'cur' : ''}`} style={{ ['--i' as string]: n } as Vars}
                onMouseEnter={() => { setHold(true); setLit(n); }} onClick={() => { setHold(true); setLit(n); }}>
                <span className="ic"><I size={20} /></span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. SOLUTIONS FOR DIFFERENT BUSINESS GOALS                           */
/* ------------------------------------------------------------------ */
function Goals() {
  return (
    <section className="dm-goals">
      <div className="dm-wrap">
        <Head kicker="DIGITAL MARKETING SOLUTIONS FOR DIFFERENT BUSINESS GOALS" title="Pick a Goal, See the Right Mix" text="Every business goal calls for a different combination of channels." />
        <div className="dm-goal-grid">
          {goals.map((g, n) => {
            const I = g.icon;
            return (
              <Rv key={g.title} delay={n * 70}>
                <Link to={g.path} className="dm-goal">
                  <span className="ic"><I size={19} /></span>
                  <h3>{g.title}</h3>
                  <div className="stack">{g.stack.map((x, k) => <em key={x} style={{ ['--i' as string]: k } as Vars}>{x}</em>)}</div>
                  <span className="go">Explore <ArrowRight size={14} /></span>
                </Link>
              </Rv>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. WHO WE HELP                                                      */
/* ------------------------------------------------------------------ */
function Who() {
  const row = [...whoWeHelp, ...whoWeHelp];
  return (
    <section className="dm-who">
      <div className="dm-wrap">
        <Head kicker="WHO WE HELP" title="Built for Growing Businesses" text="Our digital marketing services can support different types of businesses, including:" />
      </div>
      <div className="dm-marq" aria-label="Businesses we help">
        <div className="track a">{row.map((w, n) => { const I = w.icon; return <span key={n}><I size={16} />{w.t}</span>; })}</div>
        <div className="track b">{[...row].reverse().map((w, n) => { const I = w.icon; return <span key={n}><I size={16} />{w.t}</span>; })}</div>
      </div>
      <div className="dm-wrap"><Rv><p className="dm-note">Our approach is based on your business objectives, audience, industry and current digital presence.</p></Rv></div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. WHY CHOOSE                                                       */
/* ------------------------------------------------------------------ */
function Why() {
  return (
    <section className="dm-why">
      <div className="dm-wrap dm-why-in">
        <div className="dm-why-left">
          <Rv>
            <span className="dm-kicker">WHY CHOOSE INTELIQ BRIJJ FOR DIGITAL MARKETING?</span>
            <h2>One Connected Digital Marketing Partner</h2>
            <p>Your marketing channels should support the same business objective. We bring search, advertising, content and social media together into a focused digital marketing approach.</p>
          </Rv>
        </div>
        <div className="dm-why-grid">
          {why.map((w, n) => {
            const I = w.icon;
            return (
              <Rv key={w.title} delay={n * 80} className={n === 4 ? 'span' : ''}>
                <article className="dm-why-card">
                  <span className="ic"><I size={19} /></span>
                  <div><h3>{w.title}</h3><p>{w.text}</p></div>
                  <span className="no">0{n + 1}</span>
                </article>
              </Rv>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. HOW WE WORK — timeline that fills as you scroll                  */
/* ------------------------------------------------------------------ */
function HowWork() {
  const [lit, setLit] = useState(0);
  const ref = useScrollP<HTMLElement>((p) => {
    const n = Math.min(process.length - 1, Math.floor(p * 1.12 * process.length));
    setLit((c) => (c === n ? c : n));
  });
  return (
    <section className="dm-work" ref={ref}>
      <div className="dm-wrap">
        <Head kicker="HOW WE WORK" title="A Simple Process Built Around Your Goals" text="Five clear stages, from the first conversation to continuous improvement." />
        <div className="dm-steps" style={{ ['--lit' as string]: lit } as Vars}>
          <div className="dm-steps-line"><i /></div>
          {process.map((s, n) => {
            const I = s.icon;
            return (
              <div key={s.title} className={`dm-step ${n <= lit ? 'on' : ''} ${n === lit ? 'cur' : ''}`}>
                <span className="dot"><I size={18} /></span>
                <span className="num">0{n + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 10. JAIPUR AND ACROSS INDIA                                         */
/* ------------------------------------------------------------------ */
function Jaipur() {
  const { ref, shown } = useInView<HTMLDivElement>(0.25);
  return (
    <section className="dm-jaipur">
      <div className="dm-wrap">
        <div className="dm-jaipur-card" ref={ref}>
          <div className="dm-jaipur-text">
            <span className="dm-kicker">DIGITAL MARKETING IN JAIPUR AND ACROSS INDIA</span>
            <h2>Based in Jaipur. Helping Businesses Grow Online.</h2>
            <p>Inteliq Brijj Solutions provides digital marketing services in Jaipur for businesses across India.</p>
            <p>From SEO services and Google Ads to social media marketing, content marketing and lead generation, we help businesses build a stronger online presence and connect with relevant audiences.</p>
            <div className="route"><span>Jaipur</span><ArrowRight size={14} /><span>Rajasthan</span><ArrowRight size={14} /><span>India</span></div>
            <Link to="/contact" className="dm-btn white">Talk to Our Team <ArrowRight size={15} /></Link>
          </div>
          <div className={`dm-reach ${shown ? 'in' : ''}`} aria-hidden="true">
            <div className="ring r3"><em>India</em></div>
            <div className="ring r2"><em>Rajasthan</em></div>
            <div className="ring r1"><em>Jaipur</em></div>
            <div className="pin"><MapPin size={20} /></div>
            <i className="ping p1" /><i className="ping p2" /><i className="ping p3" /><i className="ping p4" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 11. FAQ                                                             */
/* ------------------------------------------------------------------ */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="dm-faq">
      <div className="dm-wrap narrow">
        <Head kicker="DIGITAL MARKETING QUESTIONS" title="Frequently Asked Questions" />
        <div className="dm-faq-list">
          {faqs.map(([q, a], n) => (
            <Rv key={q} delay={n * 50}>
              <div className={`dm-faq-item ${open === n ? 'open' : ''}`}>
                <button type="button" aria-expanded={open === n} onClick={() => setOpen(open === n ? null : n)}><span>{q}</span><ChevronDown size={18} /></button>
                <div className="ans"><p>{a}</p></div>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 12. FINAL CTA                                                       */
/* ------------------------------------------------------------------ */
function FinalCta() {
  return (
    <section className="dm-cta">
      <div className="dm-glow" aria-hidden="true" />
      <div className="dm-cta-bars" aria-hidden="true">{Array.from({ length: 14 }).map((_, n) => <i key={n} style={{ ['--i' as string]: n } as Vars} />)}</div>
      <div className="dm-wrap narrow center">
        <Rv>
          <span className="dm-kicker">GROW YOUR DIGITAL PRESENCE</span>
          <h2>Better Visibility Starts With the Right Strategy</h2>
          <p>Whether you need SEO, paid advertising, social media marketing, content or a complete digital marketing solution, we can build an approach around your business goals.</p>
          <strong>Ready to Grow Online?</strong>
          <div className="dm-actions center">
            <Link to="/contact" className="dm-btn white">Start Your Project <ArrowRight size={15} /></Link>
            <Link to="/contact" className="dm-btn outline">Get a Consultation</Link>
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export default function DigitalMarketing() {
  return (
    <div className="dm-page">
      <style>{DM_CSS}</style>
      <Hero />
      <Modern />
      <Services />
      <Practices />
      <Together />
      <Goals />
      <Who />
      <Why />
      <HowWork />
      <Jaipur />
      <Faq />
      <FinalCta />
    </div>
  );
}

const DM_CSS = `.dm-page{font-family:'Inter',system-ui,-apple-system,sans-serif;color:#0f172a;background:#fff;overflow-x:clip;-webkit-font-smoothing:antialiased}
:where(.dm-page) *{font-family:'Inter',system-ui,-apple-system,sans-serif}
:where(.dm-page) :is(h1,h2,h3,h4,p){margin:0}
:where(.dm-page) :is(h1,h2,h3,h4){color:inherit}
.dm-wrap{width:min(1180px,calc(100% - 64px));margin:0 auto;position:relative;z-index:2}.dm-wrap.narrow{width:min(840px,calc(100% - 64px))}.dm-wrap.center{text-align:center}
.dm-kicker{display:inline-block;color:#059669;font-size:11.5px;font-weight:600;letter-spacing:.14em;line-height:1.4;text-transform:uppercase}
section[class^="dm-"]{position:relative}
.dm-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 20px;border-radius:999px;font-size:14px;font-weight:600;transition:transform .25s ease,box-shadow .25s ease,background .25s;white-space:nowrap}
.dm-btn:hover{transform:translateY(-2px)}.dm-btn svg{transition:transform .25s}.dm-btn:hover svg{transform:translateX(3px)}
.dm-btn.dark{background:#0f172a;color:#fff;box-shadow:0 12px 24px -10px rgba(15,23,42,.45)}.dm-btn.light{background:#fff;color:#0f172a;border:1px solid #dfe7ef}.dm-btn.white{background:#fff;color:#0f172a;box-shadow:0 12px 24px -12px rgba(0,0,0,.5)}.dm-btn.outline{border:1px solid rgba(255,255,255,.28);color:#fff;background:rgba(255,255,255,.06)}
.dm-actions{display:flex;gap:12px;flex-wrap:wrap}.dm-actions.center{justify-content:center}

/* reveal */
.dm-rv{opacity:0;transform:translateY(26px);transition:opacity .8s ease var(--d,0ms),transform .8s cubic-bezier(.16,1,.3,1) var(--d,0ms)}.dm-rv.in{opacity:1;transform:none}
.dm-head{max-width:720px;margin-bottom:44px}.dm-head.center{margin-left:auto;margin-right:auto;text-align:center}
.dm-head h2,.dm-modern h2,.dm-why h2,.dm-jaipur h2,.dm-cta h2{font-size:clamp(1.5rem,2.5vw,2.25rem);line-height:1.18;letter-spacing:-.025em;font-weight:700;margin:12px 0 14px}
.dm-head p{color:#5b6b82;font-size:clamp(15px,1.1vw,16.5px);line-height:1.7}.dm-head.light h2{color:#fff}.dm-head.light p{color:#a3b2c6}.dm-head.light .dm-kicker{color:#34d399}
.dm-glow{position:absolute;inset:-30%;background:radial-gradient(circle at 20% 40%,rgba(16,185,129,.22),transparent 32%),radial-gradient(circle at 82% 30%,rgba(59,130,246,.2),transparent 30%);filter:blur(24px);animation:dmDrift 14s ease-in-out infinite alternate;pointer-events:none}

/* ============ HERO ============ */
.dm-hero{padding:124px 0 84px;background:#f7f9fc;overflow:hidden}
.dm-aurora{position:absolute;inset:-20% -10%;background:radial-gradient(circle at 12% 25%,rgba(16,185,129,.17),transparent 34%),radial-gradient(circle at 88% 18%,rgba(59,130,246,.16),transparent 30%),radial-gradient(circle at 55% 85%,rgba(139,92,246,.09),transparent 32%);filter:blur(34px);animation:dmDrift 14s ease-in-out infinite alternate}
.dm-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(15,23,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.04) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(70% 80% at 50% 40%,#000,transparent);mask-image:radial-gradient(70% 80% at 50% 40%,#000,transparent)}
.dm-hero-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:60px;align-items:center}
.dm-hero-text{max-width:560px;text-align:left}
.dm-pill{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border:1px solid #bcefdc;border-radius:999px;background:rgba(255,255,255,.88);color:#047857;font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;box-shadow:0 10px 24px -12px rgba(16,185,129,.4)}.dm-pill i{width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 0 0 rgba(16,185,129,.6);animation:dmPing 2s infinite}
.dm-hero h1{text-wrap:balance;font-size:clamp(2rem,3.4vw,3.1rem);line-height:1.12;letter-spacing:-.032em;font-weight:700;margin:20px 0 16px}
.dm-hero h1 span{background:linear-gradient(100deg,#10b981,#3b82f6,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% 100%;animation:dmGrad 8s linear infinite}
.dm-hero-text>p{color:#5b6b82;font-size:clamp(15px,1.15vw,17px);line-height:1.7;max-width:520px}
.dm-hero .dm-actions{margin-top:26px}
.dm-trust{display:inline-flex;align-items:center;gap:7px;margin-top:22px;color:#64748b;font-size:13px;font-weight:500}.dm-trust svg{color:#059669}

.dm-dash-wrap{position:relative;padding:18px 0 26px}
.dm-dash{position:relative;border-radius:20px;background:#fff;border:1px solid #e3eaf2;box-shadow:0 40px 80px -36px rgba(15,23,42,.45),0 0 0 6px rgba(255,255,255,.55);overflow:hidden;--c:#10b981}
.dm-dash:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 85% 0,color-mix(in srgb,var(--c) 14%,transparent),transparent 45%);transition:background .6s;pointer-events:none}
.dm-dash-bar{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #eef2f6;background:#fbfcfe}
.dm-dash-bar .dots{display:flex;gap:6px}.dm-dash-bar .dots i{width:9px;height:9px;border-radius:50%;background:#e2e8f0}.dm-dash-bar .dots i:first-child{background:#fda4af}.dm-dash-bar .dots i:nth-child(2){background:#fde68a}.dm-dash-bar .dots i:nth-child(3){background:#86efac}
.dm-dash-bar .ttl{font-size:12px;font-weight:600;color:#64748b;flex:1}.dm-dash-bar .live{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:#059669}.dm-dash-bar .live b{width:7px;height:7px;border-radius:50%;background:#10b981;animation:dmPing 1.6s infinite}
.dm-dash-tabs{display:flex;gap:6px;padding:14px 16px 4px;flex-wrap:wrap}
.dm-dash-tabs button{padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;color:#64748b;background:#f1f5f9;transition:all .35s;cursor:default}.dm-dash-tabs button.on{background:var(--c);color:#fff;box-shadow:0 8px 16px -8px var(--c)}
.dm-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:12px 16px 4px}
.dm-kpi{padding:12px 12px;border-radius:14px;background:#f8fafc;border:1px solid #edf1f6;animation:dmUp .6s cubic-bezier(.16,1,.3,1) var(--d,0ms) both}
.dm-kpi span{display:block;font-size:11px;color:#64748b;font-weight:500}.dm-kpi b{display:block;margin-top:4px;font-size:clamp(1.05rem,1.6vw,1.4rem);letter-spacing:-.02em;font-weight:700;font-variant-numeric:tabular-nums;color:#0f172a}
.dm-chart{position:relative;margin:8px 16px 18px;height:170px;border-radius:14px;background:linear-gradient(#fff,#fbfcfe);border:1px solid #edf1f6;overflow:hidden}
.dm-chart svg{position:absolute;inset:0;width:100%;height:100%}
.dm-chart .grid{stroke:#eef2f6;stroke-width:1;vector-effect:non-scaling-stroke}
.dm-chart .line{fill:none;stroke-width:3;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:dmDraw 1.8s cubic-bezier(.4,0,.2,1) .15s forwards;vector-effect:non-scaling-stroke;filter:drop-shadow(0 6px 8px color-mix(in srgb,var(--c) 40%,transparent))}
.dm-chart .area{opacity:0;animation:dmFade 1s ease .9s forwards}
.dm-dot{position:absolute;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:var(--c);border:2px solid #fff;box-shadow:0 0 0 0 var(--c);opacity:0;animation:dmFade .3s ease 1.8s forwards,dmRing 1.8s ease-out 1.9s infinite}
.dm-float{position:absolute;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border:1px solid #e3eaf2;border-radius:14px;box-shadow:0 22px 40px -20px rgba(15,23,42,.4);font-size:12px;color:#0f172a}
.dm-float .lab{display:flex;align-items:center;gap:6px;font-size:11px;color:#64748b;font-weight:500}
.dm-float.serp{left:-26px;bottom:0;padding:11px 14px;width:210px;animation:dmFloat 7s ease-in-out infinite}
.dm-float.serp .row{display:flex;align-items:center;gap:10px;margin-top:8px}.dm-float.serp b{font-size:20px;letter-spacing:-.02em;font-variant-numeric:tabular-nums;min-width:38px;color:#0f172a;transition:color .3s}.dm-float.serp b.top{color:#059669}
.dm-float.serp i{display:block;height:6px;border-radius:6px;background:linear-gradient(90deg,#10b981,#38bdf8);transition:width .3s ease}
.dm-float.toast{right:-18px;top:0;display:flex;align-items:center;gap:9px;padding:10px 14px 10px 10px;max-width:260px;font-weight:600;animation:dmToast 4.8s ease both}
.dm-float.toast .ic{flex:none;width:26px;height:26px;border-radius:9px;display:grid;place-items:center;background:#ecfdf5;color:#059669}
.dm-float.bars{right:-14px;bottom:2px;padding:11px 14px;width:150px;animation:dmFloat 8s ease-in-out -3s infinite}
.dm-float.bars div{display:flex;align-items:flex-end;gap:5px;height:44px;margin-top:8px}.dm-float.bars i{flex:1;border-radius:4px 4px 2px 2px;background:linear-gradient(#34d399,#38bdf8);height:var(--h);transform-origin:bottom;animation:dmBar 3.2s ease-in-out calc(var(--i) * .15s) infinite}

/* ============ MODERN BUSINESSES ============ */
.dm-modern{padding:100px 0;background:#fff}
.dm-modern-in{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:64px;align-items:center}
.dm-modern-text p{color:#5b6b82;font-size:clamp(15px,1.15vw,17px);line-height:1.8;margin-bottom:14px;max-width:560px}
.dm-modern-text p.lead{color:#0f172a;font-size:clamp(16px,1.3vw,18.5px);font-weight:500}
.dm-modern-text .dm-btn{margin-top:14px}
.dm-lw{color:rgba(15,23,42,.28);transition:color .4s;color:color-mix(in srgb,#0f172a calc(clamp(0,(var(--p,0) - var(--a)) / max(var(--b) - var(--a),.001),1) * 72% + 28%),#fff)}
.dm-modern-text p:not(.lead) .dm-lw{color:color-mix(in srgb,#5b6b82 calc(clamp(0,(var(--p,0) - var(--a)) / max(var(--b) - var(--a),.001),1) * 100%),#cbd5e1)}
.dm-orbit{position:relative;width:min(460px,100%);aspect-ratio:1;margin:0 auto}
.dm-orbit-ring{position:absolute;border-radius:50%;border:1px dashed #cfdbe6}.dm-orbit-ring.r1{inset:6%}.dm-orbit-ring.r2{inset:24%;border-style:solid;border-color:#e5edf4;animation:dmSpin 40s linear infinite reverse}
.dm-orbit-core{position:absolute;inset:36%;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:#fff;text-align:center;background:radial-gradient(circle at 30% 25%,#1f3a4d,#0b1626);box-shadow:0 26px 50px -18px rgba(15,23,42,.6),0 0 0 10px rgba(16,185,129,.1),0 0 0 22px rgba(16,185,129,.05);animation:dmPulse 4s ease-in-out infinite}
.dm-orbit-core svg{color:#6ee7b7}.dm-orbit-core b{font-size:13px;font-weight:700;letter-spacing:-.01em}.dm-orbit-core span{font-size:10.5px;color:#9fb3c8}
.dm-orbit-spin{position:absolute;inset:0;animation:dmSpin 46s linear infinite}
.dm-orbit-node{position:absolute;inset:0;transform:rotate(var(--a))}
.dm-orbit-node .beam{position:absolute;left:64%;top:calc(50% - 1px);width:17%;height:2px;background:linear-gradient(90deg,transparent,#34d399);opacity:.7}
.dm-orbit-node .beam:after{content:'';position:absolute;right:0;top:-2px;width:6px;height:6px;border-radius:50%;background:#10b981;animation:dmTravel 3s ease-in-out infinite}
.dm-orbit-node .chip{position:absolute;left:88%;top:50%;transform:translate(-50%,-50%) rotate(calc(var(--a) * -1));display:inline-flex;align-items:center;gap:6px;padding:8px 13px;border-radius:999px;background:#fff;border:1px solid #e1e9f1;box-shadow:0 14px 26px -14px rgba(15,23,42,.35);font-size:12px;font-weight:600;white-space:nowrap;color:#0f172a}
.dm-orbit-node .chip svg{color:#059669}
.dm-orbit-node .chip{animation:dmCounter 46s linear infinite}

/* ============ SERVICES ============ */
.dm-services{padding:96px 0 104px;background:#f7f9fc;scroll-margin-top:70px}
.dm-svc{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:22px;align-items:stretch}
.dm-svc-tabs{display:flex;flex-direction:column;gap:10px}
.dm-svc-tab{position:relative;display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:10px;text-align:left;padding:20px 18px 22px;border-radius:16px;background:#fff;border:1px solid #e1e8ef;color:#475569;overflow:hidden;transition:all .35s cubic-bezier(.16,1,.3,1)}
.dm-svc-tab .no{font-size:12px;font-weight:600;color:#94a3b8;font-variant-numeric:tabular-nums}.dm-svc-tab .nm{font-size:14.5px;font-weight:600}.dm-svc-tab>svg{color:#94a3b8;transition:color .3s}
.dm-svc-tab:hover{border-color:#9ce5c5;transform:translateX(4px)}
.dm-svc-tab.on{background:#0f172a;border-color:#0f172a;color:#fff;box-shadow:0 22px 40px -22px rgba(15,23,42,.7);transform:translateX(8px)}.dm-svc-tab.on .no{color:#6ee7b7}.dm-svc-tab.on>svg{color:#6ee7b7}
.dm-svc-tab .bar{position:absolute;left:0;right:0;bottom:0;height:3px;background:transparent}.dm-svc-tab.on .bar{background:rgba(255,255,255,.12)}
.dm-svc-tab .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#34d399,#38bdf8)}.dm-svc-tab.on .bar i{animation:dmBarFill 9s linear forwards}
.dm-svc-panel{position:relative;overflow:hidden;border-radius:24px;padding:36px 36px 34px;color:#fff;background:linear-gradient(150deg,#0f172a,#13263b 70%,#0d3d3a);box-shadow:0 36px 70px -34px rgba(15,23,42,.7);animation:dmPanel .7s cubic-bezier(.16,1,.3,1) both}
.dm-svc-panel:before{content:'';position:absolute;width:320px;height:320px;right:-90px;top:-110px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,.35),transparent 68%);pointer-events:none}
.dm-svc-panel .big{position:absolute;right:26px;top:10px;font-size:84px;line-height:1;font-weight:700;letter-spacing:-.05em;color:rgba(255,255,255,.07)}
.dm-svc-panel .ico{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:rgba(16,185,129,.16);color:#6ee7b7;margin-bottom:16px}
.dm-svc-panel h3{font-size:clamp(1.25rem,1.9vw,1.6rem);line-height:1.2;letter-spacing:-.02em;font-weight:700;max-width:520px}
.dm-svc-panel>p{margin-top:10px;color:#a9b8ca;font-size:15px;line-height:1.7;max-width:560px}
.dm-svc-panel .listhead{display:block;margin:22px 0 12px;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:#6ee7b7;font-weight:600}
.dm-svc-panel ul{list-style:none;margin:0 0 24px;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.dm-svc-panel li{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);font-size:12.5px;font-weight:500;color:#e2e8f0;animation:dmChip .5s cubic-bezier(.16,1,.3,1) calc(.15s + var(--i) * 45ms) both;transition:background .25s,transform .25s,border-color .25s}
.dm-svc-panel li svg{color:#34d399}.dm-svc-panel li:hover{background:rgba(52,211,153,.18);border-color:rgba(52,211,153,.5);transform:translateY(-2px)}

/* ============ PRACTICES (3D wave) ============ */
.dm-practices{padding:96px 0 88px;background:#fff}
.dm-wave{perspective:1400px;padding:.5rem 0 1.5rem}
.dm-wave-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;transform-style:preserve-3d;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .35s ease-out}
.dm-wave-col{display:contents}
.dm-tile{position:relative;aspect-ratio:1/1.1;padding:1rem;border-radius:18px;color:#fff;text-align:left;overflow:hidden;display:block;
background:linear-gradient(145deg,hsl(var(--h) 52% 26%),hsl(calc(var(--h) + 40) 62% 12%));box-shadow:0 26px 40px -22px hsl(var(--h) 70% 12% / .75);
opacity:0;transform:translateY(80px) translateZ(-240px) rotateX(-60deg);transform-origin:50% 100%;transition:transform 1s cubic-bezier(.16,1,.3,1),opacity .8s,box-shadow .35s;transition-delay:calc(var(--i) * 80ms)}
.dm-wave.in .dm-tile{opacity:1;transform:none;animation:dmTileFloat 6s ease-in-out calc(1.3s + var(--i) * .3s) infinite}
.dm-wave.in .dm-tile:hover,.dm-wave.in .dm-tile:focus-visible,.dm-wave.in .dm-tile.on{animation:none;transform:translateZ(56px) scale(1.07) rotateX(-3deg);transition-delay:0s;box-shadow:0 40px 60px -22px hsl(var(--h) 80% 32% / .85),0 0 0 1.5px rgba(110,231,183,.6);z-index:5}
.dm-tile b{position:absolute;top:.35rem;left:.9rem;font-size:3rem;font-weight:300;letter-spacing:-.05em;line-height:1;background:linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,0));-webkit-background-clip:text;background-clip:text;color:transparent;transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .3s}
.dm-tile .base{position:absolute;left:1rem;right:1rem;bottom:1rem;transition:opacity .3s,transform .45s cubic-bezier(.16,1,.3,1)}
.dm-tile h4{font-size:.92rem;font-weight:600;line-height:1.3}.dm-tile .base p{font-size:.74rem;opacity:.72;margin-top:.3rem;line-height:1.5}
.dm-tile .more{position:absolute;inset:0;padding:3.1rem 1rem 1rem;display:flex;flex-direction:column;gap:.5rem;background:linear-gradient(160deg,hsl(var(--h) 60% 22% / .96),hsl(calc(var(--h) + 40) 66% 9% / .98));opacity:0;transform:translateY(18px);transition:opacity .35s,transform .5s cubic-bezier(.16,1,.3,1);pointer-events:none}
.dm-tile .more h4{color:#6ee7b7;font-size:.85rem}.dm-tile .more p{font-size:.72rem;line-height:1.55;color:#d6e2ee}
.dm-tile .tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:auto}.dm-tile .tags em,.dm-peek .tags em{font-style:normal;font-size:.62rem;font-weight:600;padding:.2rem .5rem;border-radius:99px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);color:#e2e8f0}
.dm-wave.in .dm-tile:hover .more,.dm-wave.in .dm-tile:focus-visible .more,.dm-wave.in .dm-tile.on .more{opacity:1;transform:none}
.dm-wave.in .dm-tile:hover .base,.dm-wave.in .dm-tile.on .base{opacity:0;transform:translateY(-10px)}
.dm-tile .shine{position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.18) 50%,transparent 65%);transform:translateX(-120%);transition:transform .9s;pointer-events:none}.dm-tile:hover .shine{transform:translateX(120%)}
.dm-peek{max-width:760px;margin:10px auto 0;min-height:86px;border-radius:18px;background:#f7f9fc;border:1px solid #e3eaf2;padding:16px 20px;overflow:hidden}
.dm-peek-in{display:flex;align-items:center;gap:16px;animation:dmUp .45s cubic-bezier(.16,1,.3,1) both}
.dm-peek .n{flex:none;font-size:26px;font-weight:300;color:#10b981;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.dm-peek h4{font-size:15px;font-weight:700}.dm-peek p{margin-top:3px;color:#5b6b82;font-size:13.5px;line-height:1.6}.dm-peek .tags{margin-left:auto;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}.dm-peek .tags em{background:#ecfdf5;border-color:#bbf1d9;color:#047857}
@media(min-width:900px){.dm-wave-grid{display:flex;justify-content:center;gap:14px}.dm-wave-col{display:flex;flex-direction:column;gap:14px;flex:1;max-width:14.5rem;padding-top:var(--off,0)}}

/* ============ TOGETHER ============ */
.dm-together{padding:96px 0 104px;background:#07101d;color:#fff;overflow:hidden}
.dm-flow{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:14px;padding-top:6px}
.dm-flow-line{position:absolute;left:10%;right:10%;top:34px;height:2px;background:rgba(255,255,255,.1);border-radius:2px}
.dm-flow-line i{position:absolute;left:0;top:0;height:100%;background:linear-gradient(90deg,#10b981,#38bdf8,#8b5cf6);border-radius:2px;transition:width .8s cubic-bezier(.16,1,.3,1)}
.dm-flow-line b{position:absolute;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#fff;box-shadow:0 0 0 5px rgba(56,189,248,.25),0 0 18px #38bdf8;transition:left .8s cubic-bezier(.16,1,.3,1)}
.dm-flow-node{position:relative;text-align:center;padding:0 8px;color:inherit;opacity:0;transform:translateY(24px);transition:opacity .7s ease calc(var(--i) * 110ms),transform .7s cubic-bezier(.16,1,.3,1) calc(var(--i) * 110ms)}
.dm-flow.in .dm-flow-node{opacity:1;transform:none}
.dm-flow-node .ic{position:relative;z-index:2;display:grid;place-items:center;width:56px;height:56px;margin:0 auto 18px;border-radius:50%;background:#0d1b2c;border:1px solid rgba(255,255,255,.14);color:#7f93ab;box-shadow:0 0 0 7px #07101d;transition:all .5s cubic-bezier(.16,1,.3,1)}
.dm-flow-node.done .ic{color:#6ee7b7;border-color:rgba(110,231,183,.5)}.dm-flow-node.cur .ic{background:linear-gradient(135deg,#10b981,#0ea5e9);color:#fff;border-color:transparent;transform:scale(1.14);box-shadow:0 0 0 7px #07101d,0 0 30px rgba(16,185,129,.55)}
.dm-flow-node h3{font-size:16px;font-weight:600;letter-spacing:-.01em;color:#cbd5e1;transition:color .4s}.dm-flow-node.done h3{color:#fff}
.dm-flow-node p{margin:6px auto 0;max-width:190px;color:#8497ae;font-size:13.5px;line-height:1.6;transition:color .4s}.dm-flow-node.cur p{color:#c7d3e2}

/* ============ GOALS ============ */
.dm-goals{padding:96px 0 104px;background:#f7f9fc}
.dm-goal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.dm-goal{position:relative;display:flex;flex-direction:column;height:100%;min-height:210px;padding:24px;border-radius:20px;background:#fff;border:1px solid #e1e8ef;overflow:hidden;transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s,border-color .4s}
.dm-goal:before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(16,185,129,.1),rgba(59,130,246,.08) 60%,transparent);opacity:0;transition:opacity .4s}
.dm-goal:hover{transform:translateY(-6px);border-color:#9ce5c5;box-shadow:0 28px 48px -26px rgba(15,23,42,.35)}.dm-goal:hover:before{opacity:1}
.dm-goal>*{position:relative}
.dm-goal .ic{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#ecfdf5;color:#059669;transition:all .4s}.dm-goal:hover .ic{background:#059669;color:#fff;transform:rotate(-8deg) scale(1.08)}
.dm-goal h3{margin:16px 0 14px;font-size:16.5px;font-weight:600;letter-spacing:-.015em;line-height:1.3}
.dm-goal .stack{display:flex;flex-wrap:wrap;gap:6px}.dm-goal .stack em{font-style:normal;font-size:12px;font-weight:500;padding:5px 10px;border-radius:99px;background:#f1f5f9;color:#475569;transition:all .35s calc(var(--i) * 50ms)}.dm-goal:hover .stack em{background:#fff;color:#047857;box-shadow:0 0 0 1px #a7f3d0}
.dm-goal .go{margin-top:auto;padding-top:18px;display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#059669}.dm-goal .go svg{transition:transform .3s}.dm-goal:hover .go svg{transform:translateX(5px)}

/* ============ WHO ============ */
.dm-who{padding:96px 0 84px;background:#fff;overflow:hidden}
.dm-who .dm-head{margin-bottom:34px}
.dm-marq{display:grid;gap:12px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.dm-marq .track{display:flex;gap:12px;width:max-content}.dm-marq .track.a{animation:dmMarq 42s linear infinite}.dm-marq .track.b{animation:dmMarq 50s linear infinite reverse}.dm-marq:hover .track{animation-play-state:paused}
.dm-marq span{display:inline-flex;align-items:center;gap:9px;padding:13px 20px;border-radius:999px;border:1px solid #e1e8ef;background:#fff;box-shadow:0 12px 24px -18px rgba(15,23,42,.35);font-size:14px;font-weight:500;color:#334155;white-space:nowrap;transition:all .3s}.dm-marq span svg{color:#059669}.dm-marq span:hover{border-color:#6ee7b7;transform:translateY(-3px);color:#0f172a}
.dm-note{margin:34px auto 0;max-width:620px;text-align:center;color:#5b6b82;font-size:15px;line-height:1.7}

/* ============ WHY ============ */
.dm-why{padding:96px 0 104px;background:#f7f9fc}
.dm-why-in{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.3fr);gap:56px;align-items:start}
.dm-why-left{position:sticky;top:110px}.dm-why-left p{color:#5b6b82;font-size:15.5px;line-height:1.75;max-width:440px}
.dm-why-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.dm-why-grid .span{grid-column:1/-1}
.dm-why-grid>.dm-rv{height:100%}
.dm-why-card{position:relative;display:flex;gap:14px;height:100%;padding:22px;border-radius:18px;background:#fff;border:1px solid #e1e8ef;overflow:hidden;transition:all .4s cubic-bezier(.16,1,.3,1)}
.dm-why-card:hover{transform:translateY(-5px);border-color:#9ce5c5;box-shadow:0 26px 44px -26px rgba(15,23,42,.35)}
.dm-why-card .ic{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#ecfdf5;color:#059669;transition:all .4s}.dm-why-card:hover .ic{background:#059669;color:#fff;transform:rotate(-8deg)}
.dm-why-card h3{font-size:15.5px;font-weight:600;letter-spacing:-.01em}.dm-why-card p{margin-top:5px;color:#5b6b82;font-size:14px;line-height:1.65}
.dm-why-card .no{position:absolute;right:16px;bottom:6px;font-size:38px;font-weight:700;color:#eef3f7;letter-spacing:-.04em}

/* ============ HOW WE WORK ============ */
.dm-work{padding:96px 0 104px;background:#fff}
.dm-steps{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.dm-steps-line{position:absolute;left:10%;right:10%;top:27px;height:2px;border-radius:2px;background:#e5ecf2}
.dm-steps-line i{position:absolute;left:0;top:0;bottom:0;border-radius:2px;background:linear-gradient(90deg,#10b981,#38bdf8,#8b5cf6);width:calc(var(--lit) / 4 * 100%);transition:width .9s cubic-bezier(.16,1,.3,1)}
.dm-step{position:relative;text-align:center;padding:0 6px}
.dm-step .dot{position:relative;z-index:2;display:grid;place-items:center;width:56px;height:56px;margin:0 auto 14px;border-radius:50%;background:#fff;border:1px solid #dbe5ee;color:#94a3b8;box-shadow:0 0 0 7px #fff;transition:all .55s cubic-bezier(.16,1,.3,1)}
.dm-step.on .dot{color:#059669;border-color:#86e0bb;background:#ecfdf5}.dm-step.cur .dot{background:linear-gradient(135deg,#10b981,#0ea5e9);color:#fff;border-color:transparent;transform:scale(1.12);box-shadow:0 0 0 7px #fff,0 16px 28px -10px rgba(16,185,129,.7)}
.dm-step .num{display:block;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:.08em}.dm-step.on .num{color:#059669}
.dm-step h3{margin-top:4px;font-size:17px;font-weight:600;letter-spacing:-.015em;color:#94a3b8;transition:color .4s}.dm-step.on h3{color:#0f172a}
.dm-step p{margin:6px auto 0;max-width:200px;color:#94a3b8;font-size:13.5px;line-height:1.6;transition:color .4s}.dm-step.on p{color:#5b6b82}

/* ============ JAIPUR ============ */
.dm-jaipur{padding:24px 0 96px;background:#fff}
.dm-jaipur-card{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:30px;align-items:center;padding:52px;border-radius:28px;color:#fff;overflow:hidden;background:linear-gradient(135deg,#0b1626,#10283a 60%,#0b3a38);box-shadow:0 40px 80px -40px rgba(15,23,42,.7)}
.dm-jaipur-card:before{content:'';position:absolute;inset:-40%;background:radial-gradient(circle at 80% 50%,rgba(16,185,129,.22),transparent 36%);pointer-events:none}
.dm-jaipur-text{position:relative}.dm-jaipur .dm-kicker{color:#34d399}.dm-jaipur h2{color:#fff}
.dm-jaipur-text p{color:#a9b8ca;font-size:15.5px;line-height:1.75;margin-bottom:12px;max-width:520px}
.dm-jaipur .route{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin:18px 0 24px;color:#6ee7b7}.dm-jaipur .route span{padding:7px 14px;border-radius:99px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);font-size:13px;font-weight:600;color:#fff}
.dm-reach{position:relative;width:min(340px,100%);aspect-ratio:1;margin:0 auto}
.dm-reach .ring{position:absolute;left:50%;top:50%;border-radius:50%;border:1px solid rgba(110,231,183,.35);transform:translate(-50%,-50%) scale(.3);opacity:0;transition:transform 1.2s cubic-bezier(.16,1,.3,1),opacity 1s}
.dm-reach .ring em{position:absolute;left:50%;top:-9px;transform:translateX(-50%);padding:3px 10px;border-radius:99px;font-style:normal;font-size:11px;font-weight:600;background:#0f2a3a;border:1px solid rgba(110,231,183,.4);color:#a7f3d0}
.dm-reach .r1{width:34%;height:34%;background:rgba(16,185,129,.12)}.dm-reach .r2{width:66%;height:66%;transition-delay:.25s}.dm-reach .r3{width:100%;height:100%;transition-delay:.5s;border-style:dashed}
.dm-reach.in .ring{transform:translate(-50%,-50%) scale(1);opacity:1}
.dm-reach .pin{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#10b981,#0ea5e9);color:#fff;box-shadow:0 0 0 0 rgba(16,185,129,.6);animation:dmRing 2.4s ease-out infinite}
.dm-reach .ping{position:absolute;width:9px;height:9px;border-radius:50%;background:#38bdf8;box-shadow:0 0 12px #38bdf8;opacity:0;animation:dmPingDot 4s ease-in-out infinite}
.dm-reach .p1{left:22%;top:30%;animation-delay:.4s}.dm-reach .p2{left:78%;top:26%;animation-delay:1.2s}.dm-reach .p3{left:84%;top:68%;animation-delay:2s}.dm-reach .p4{left:16%;top:74%;animation-delay:2.8s}

/* ============ FAQ ============ */
.dm-faq{padding:88px 0 96px;background:#f7f9fc}
.dm-faq-list{display:grid;gap:10px}
.dm-faq-item{border:1px solid #e1e8ef;border-radius:16px;background:#fff;overflow:hidden;transition:border-color .3s,box-shadow .3s}.dm-faq-item.open{border-color:#a9e7cc;box-shadow:0 16px 34px -22px rgba(15,23,42,.35)}
.dm-faq-item button{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:19px 22px;text-align:left;font-size:15px;font-weight:600;color:#172235}.dm-faq-item button svg{flex:none;color:#059669;transition:transform .4s cubic-bezier(.16,1,.3,1)}.dm-faq-item.open button svg{transform:rotate(180deg)}
.dm-faq-item .ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.16,1,.3,1)}.dm-faq-item.open .ans{grid-template-rows:1fr}
.dm-faq-item .ans p{overflow:hidden;padding:0 22px;color:#5b6b82;font-size:14.5px;line-height:1.75;opacity:0;transition:opacity .4s .1s}.dm-faq-item.open .ans p{padding-bottom:20px;opacity:1}

/* ============ CTA ============ */
.dm-cta{padding:104px 0;background:#07101d;color:#fff;overflow:hidden}
.dm-cta h2{color:#fff}.dm-cta .dm-kicker{color:#34d399}
.dm-cta p{color:#a3b2c6;max-width:640px;margin:0 auto;font-size:clamp(15px,1.1vw,16.5px);line-height:1.7}
.dm-cta strong{display:block;margin:22px 0 18px;font-size:17px;font-weight:600;color:#fff}
.dm-cta-bars{position:absolute;left:0;right:0;bottom:0;height:30%;display:flex;align-items:flex-end;justify-content:space-between;gap:10px;padding:0 4%;opacity:.4;pointer-events:none;-webkit-mask-image:linear-gradient(transparent,#000);mask-image:linear-gradient(transparent,#000)}
.dm-cta-bars i{flex:1;border-radius:6px 6px 0 0;height:calc(28% + var(--i) * 4.5%);background:linear-gradient(#10b981,rgba(16,185,129,0));transform-origin:bottom;animation:dmBar 4.2s ease-in-out calc(var(--i) * .18s) infinite}

/* ============ KEYFRAMES ============ */
@keyframes dmDrift{to{transform:translate3d(2%,3%,0) scale(1.06)}}
@keyframes dmGrad{to{background-position:200% 0}}
@keyframes dmPing{0%{box-shadow:0 0 0 0 rgba(16,185,129,.55)}80%,100%{box-shadow:0 0 0 8px rgba(16,185,129,0)}}
@keyframes dmRing{0%{box-shadow:0 0 0 0 rgba(16,185,129,.55)}70%,100%{box-shadow:0 0 0 16px rgba(16,185,129,0)}}
@keyframes dmDraw{to{stroke-dashoffset:0}}
@keyframes dmFade{to{opacity:1}}
@keyframes dmUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes dmFloat{50%{transform:translateY(-9px)}}
@keyframes dmToast{0%{opacity:0;transform:translateY(-14px) scale(.96)}9%,86%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-8px)}}
@keyframes dmBar{0%,100%{transform:scaleY(.55)}50%{transform:scaleY(1)}}
@keyframes dmSpin{to{transform:rotate(360deg)}}
@keyframes dmCounter{to{transform:translate(-50%,-50%) rotate(calc(var(--a) * -1 - 360deg))}}
@keyframes dmPulse{50%{transform:scale(1.04)}}
@keyframes dmTravel{0%{transform:translateX(-120%);opacity:0}30%,70%{opacity:1}100%{transform:translateX(0);opacity:0}}
@keyframes dmBarFill{to{width:100%}}
@keyframes dmPanel{from{opacity:0;transform:translateY(16px) scale(.99)}to{opacity:1;transform:none}}
@keyframes dmChip{from{opacity:0;transform:translateY(10px) scale(.94)}to{opacity:1;transform:none}}
@keyframes dmTileFloat{50%{transform:translateY(-8px) translateZ(22px) rotateX(2deg)}}
@keyframes dmMarq{to{transform:translateX(-50%)}}
@keyframes dmPingDot{0%,100%{opacity:0;transform:scale(.4)}40%,60%{opacity:1;transform:scale(1.4)}}

/* ============ RESPONSIVE ============ */
@media(max-width:1100px){.dm-hero-in{gap:36px}.dm-float.serp{left:-10px}.dm-float.toast{right:-8px}.dm-float.bars{right:-6px}}
@media(max-width:980px){
  .dm-wrap,.dm-wrap.narrow{width:calc(100% - 48px)}
  .dm-hero{padding:104px 0 64px}.dm-hero-in{grid-template-columns:1fr;gap:44px}.dm-dash-wrap{max-width:640px;width:100%;margin:0 auto}
  .dm-modern{padding:76px 0}.dm-modern-in{grid-template-columns:1fr;gap:44px}.dm-orbit{width:min(400px,92%)}
  .dm-svc{grid-template-columns:1fr}.dm-svc-tabs{flex-direction:row;overflow-x:auto;gap:8px;padding-bottom:4px;scrollbar-width:none}.dm-svc-tabs::-webkit-scrollbar{display:none}.dm-svc-tab{flex:none;min-width:230px}.dm-svc-tab:hover,.dm-svc-tab.on{transform:none}
  .dm-flow{grid-template-columns:1fr;gap:6px;padding-left:4px}.dm-flow-line{left:31px;right:auto;top:34px;bottom:34px;width:2px;height:auto}.dm-flow-line i{width:2px!important;height:calc(var(--lit) / 4 * 100%);transition:height .8s}.dm-flow-line b{display:none}
  .dm-flow-node{display:grid;grid-template-columns:56px 1fr;column-gap:18px;text-align:left;padding:10px 0}.dm-flow-node .ic{grid-row:span 2;margin:0}.dm-flow-node p{margin:2px 0 0;max-width:none}
  .dm-goal-grid{grid-template-columns:1fr 1fr}
  .dm-why-in{grid-template-columns:1fr;gap:32px}.dm-why-left{position:static}
  .dm-steps{grid-template-columns:1fr;gap:4px}.dm-steps-line{left:27px;right:auto;top:28px;bottom:28px;width:2px;height:auto}.dm-steps-line i{width:2px;height:calc(var(--lit) / 4 * 100%);transition:height .9s}
  .dm-step{display:grid;grid-template-columns:56px 1fr;column-gap:18px;text-align:left;padding:10px 0}.dm-step .dot{grid-row:span 3;margin:0}.dm-step p{margin:4px 0 0;max-width:none}.dm-step .num{align-self:end}
  .dm-jaipur-card{grid-template-columns:1fr;padding:38px 30px}.dm-reach{width:min(300px,86%)}
}
@media(max-width:680px){
  .dm-wrap,.dm-wrap.narrow{width:calc(100% - 32px)}
  .dm-hero{padding:92px 0 52px}.dm-hero h1{font-size:clamp(1.75rem,7.6vw,2.05rem)}.dm-hero .dm-actions .dm-btn{flex:1 1 100%}
  .dm-kpis{gap:6px;padding:10px 12px 2px}.dm-kpi{padding:9px 8px}.dm-kpi span{font-size:10px}.dm-dash-tabs{padding:12px 12px 2px}.dm-chart{margin:8px 12px 14px;height:130px}
  .dm-float.serp{left:-4px;width:176px;padding:9px 11px}.dm-float.toast{right:-4px;top:-6px;max-width:210px;font-size:11px}.dm-float.bars{display:none}
  .dm-modern,.dm-services,.dm-practices,.dm-together,.dm-goals,.dm-who,.dm-why,.dm-work,.dm-faq{padding-top:68px;padding-bottom:68px}.dm-cta{padding:76px 0}
  .dm-head{margin-bottom:32px}
  .dm-svc-panel{padding:28px 22px}.dm-svc-panel .big{font-size:60px}.dm-svc-tab{min-width:210px;padding:16px 14px 18px}
  .dm-goal-grid{grid-template-columns:1fr}.dm-goal{min-height:0}
  .dm-why-grid{grid-template-columns:1fr}
  .dm-peek-in{flex-wrap:wrap}.dm-peek .tags{margin-left:0;justify-content:flex-start}
  .dm-wave-grid{gap:10px}.dm-tile{aspect-ratio:1/1.18}
  .dm-jaipur{padding-bottom:68px}.dm-jaipur-card{padding:30px 22px;border-radius:22px}
  .dm-marq span{padding:11px 16px;font-size:13px}
  .dm-faq-item button{padding:17px 16px;font-size:14px}
}
@media(prefers-reduced-motion:reduce){
  .dm-aurora,.dm-glow,.dm-hero h1 span,.dm-orbit-spin,.dm-orbit-ring,.dm-orbit-node .chip,.dm-orbit-node .beam:after,.dm-float,.dm-float.bars i,.dm-marq .track,.dm-cta-bars i,.dm-reach .ping,.dm-reach .pin,.dm-wave.in .dm-tile,.dm-pill i,.dm-dot,.dm-orbit-core{animation:none!important}
  .dm-rv{opacity:1;transform:none;transition:none}
}
`;
