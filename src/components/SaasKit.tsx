import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';

/* ---------- hooks ---------- */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`sk-reveal ${shown ? 'sk-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!shown) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ---------- hero with aurora + floating live chips ---------- */
export function SaasHero({ eyebrow, title, accent, text, chips, primary = 'Start Your Project', secondary }: {
  eyebrow: string; title: string; accent: string; text: string;
  chips: { label: string; value: string }[]; primary?: string; secondary?: { label: string; to: string };
}) {
  return (
    <section className="sk-hero">
      <div className="sk-aurora" aria-hidden />
      <div className="sk-grid" aria-hidden />
      <div className="sk-wrap sk-hero-in">
        <span className="sk-pill"><i /> {eyebrow}</span>
        <h1 className="sk-h1">{title} <span className="sk-grad">{accent}</span></h1>
        <p className="sk-lead">{text}</p>
        <div className="sk-row">
          <Link to="/contact" className="sk-btn sk-btn-dark">{primary} <ArrowRight size={15} /></Link>
          {secondary && <Link to={secondary.to} className="sk-btn sk-btn-ghost">{secondary.label}</Link>}
        </div>
        <div className="sk-chips">
          {chips.map((c, i) => (
            <div key={c.label} className="sk-chip" style={{ animationDelay: `${i * 0.6}s` }}>
              <b>{c.value}</b><span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- section heading ---------- */
export function Head({ label, title, text, center = true }: { label: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={center ? 'sk-head sk-center' : 'sk-head'}>
      <p className="sk-eyebrow">{label}</p>
      <h2 className="sk-h2">{title}</h2>
      {text && <p className="sk-sub">{text}</p>}
    </Reveal>
  );
}

/* ---------- animated feature showcase (replaces scroll-jack) ---------- */
export type Feature = { id: string; title: string; description: string; points: string[]; image: string; path: string; cta?: string; accent?: string };

export function Showcase({ items, pointsHead = 'Includes', select }: { items: Feature[]; pointsHead?: string; select?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const DURATION = 7000;
  useEffect(() => { if (select !== undefined && select >= 0) { setDir(1); setActive(select); } }, [select]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => { setDir(1); setActive((a) => (a + 1) % items.length); }, DURATION);
    return () => clearTimeout(t);
  }, [active, paused, items.length]);

  const go = (i: number) => { setDir(i >= active ? 1 : -1); setActive(i); };
  const cur = items[active];
  const tilt = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--rx', `${(((e.clientY - r.top) / r.height) - 0.5) * -6}deg`);
    e.currentTarget.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width) - 0.5) * 8}deg`);
  };
  const untilt = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="sk-show" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ ['--ac' as string]: cur.accent || '#10b981' } as CSSProperties}>
      <div className="sk-tabs" role="tablist">
        {items.map((it, i) => (
          <button key={it.id} role="tab" aria-selected={i === active} onClick={() => go(i)}
            className={`sk-tab ${i === active ? 'on' : ''}`}>
            <span className="sk-tab-n">{String(i + 1).padStart(2, '0')}</span>
            <span>{it.title}</span>
            {i === active && <em className="sk-prog" style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? 'paused' : 'running' }} key={`${active}-${paused}`} />}
          </button>
        ))}
      </div>

      <div className="sk-stage" onMouseMove={tilt} onMouseLeave={untilt}>
        <div className="sk-stage-glow" aria-hidden />
        <div key={cur.id} className={`sk-card ${dir > 0 ? 'from-r' : 'from-l'}`}>
          <div className="sk-copy">
            <h3 className="sk-h3">{cur.title}</h3>
            <p className="sk-p">{cur.description}</p>
            <p className="sk-mini">{pointsHead}</p>
            <ul className="sk-pts">
              {cur.points.map((p, i) => (
                <li key={p} style={{ animationDelay: `${120 + i * 55}ms` }}><Check size={13} />{p}</li>
              ))}
            </ul>
            <Link to={cur.path} className="sk-btn sk-btn-acc">{cur.cta || 'Learn more'} <ArrowRight size={15} /></Link>
          </div>
          <div className="sk-shot">
            <div className="sk-browser">
              <div className="sk-dots"><i /><i /><i /></div>
              <img src={cur.image} alt={cur.title} />
            </div>
            <div className="sk-float sk-float-a"><Check size={12} /> Delivered on time</div>
            <div className="sk-float sk-float-b">{cur.points.length}+ capabilities</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- bento cards with cursor spotlight ---------- */
export function Spot({ children, className = '', to }: { children: ReactNode; className?: string; to?: string }) {
  const move = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return to
    ? <Link to={to} onMouseMove={move} className={`sk-spot ${className}`}>{children}</Link>
    : <div onMouseMove={move} className={`sk-spot ${className}`}>{children}</div>;
}

export function Bento({ items }: { items: { title: string; text: string; icon?: ReactNode; to?: string; wide?: boolean }[] }) {
  return (
    <div className="sk-bento">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 60} className={it.wide ? 'sk-wide' : ''}>
          <Spot to={it.to} className="sk-bento-card">
            {it.icon && <span className="sk-ico">{it.icon}</span>}
            <h3>{it.title}</h3>
            <p>{it.text}</p>
            {it.to && <span className="sk-more">Explore <ArrowRight size={13} /></span>}
          </Spot>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- interactive process stepper ---------- */
export type Step = { count: string; title: string; description: string; cards: { heading: string; body: string }[] };

export function Stepper({ steps }: { steps: Step[] }) {
  const [a, setA] = useState(0);
  const s = steps[a];
  return (
    <div className="sk-step">
      <div className="sk-rail">
        <div className="sk-rail-fill" style={{ width: `${(a / (steps.length - 1)) * 100}%` }} />
        {steps.map((st, i) => (
          <button key={st.title} onClick={() => setA(i)} className={`sk-node ${i <= a ? 'done' : ''} ${i === a ? 'on' : ''}`}>
            <span>{i + 1}</span><small>{st.title}</small>
          </button>
        ))}
      </div>
      <div key={a} className="sk-step-body">
        <div>
          <p className="sk-eyebrow">{s.count}</p>
          <h3 className="sk-h3">{s.title}</h3>
          <p className="sk-p">{s.description}</p>
        </div>
        <div className="sk-step-cards">
          {s.cards.map((c, i) => (
            <Spot key={c.heading} className="sk-step-card">
              <div style={{ animation: `sk-up .5s ${i * 90}ms both cubic-bezier(.16,1,.3,1)` }}>
                <h4>{c.heading}</h4><p>{c.body}</p>
              </div>
            </Spot>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- animated stats ---------- */
export function Stats({ items }: { items: { to?: number; suffix?: string; text?: string; label: string }[] }) {
  return (
    <div className="sk-stats">
      {items.map((s) => (
        <div key={s.label}>
          <b>{s.to !== undefined ? <CountUp to={s.to} suffix={s.suffix} /> : s.text}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- goal path cards ---------- */
export function Paths({ items }: { items: { title: string; stack: string; path: string }[] }) {
  return (
    <div className="sk-paths">
      {items.map((p, i) => (
        <Reveal key={p.title} delay={i * 50}>
          <Spot to={p.path} className="sk-path">
            <div><h3>{p.title}</h3><p>{p.stack}</p></div>
            <span className="sk-arrow"><ArrowRight size={16} /></span>
          </Spot>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- infinite marquee ---------- */
export function Marquee({ items }: { items: (string | { name: string; path: string; hex: string })[] }) {
  const row = [...items, ...items];
  return (
    <div className="sk-marq"><div className="sk-marq-track">
      {row.map((t, i) => typeof t === 'string'
        ? <span key={i}>{t}</span>
        : (
          <span key={i} className="sk-logo">
            <svg viewBox="0 0 24 24" width="24" height="24" fill={t.hex} aria-hidden><path d={t.path} /></svg>
            {t.name}
          </span>
        ))}
    </div></div>
  );
}

/* ---------- FAQ accordion ---------- */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="sk-faq">
      {items.map((f, i) => (
        <div key={f.q} className={`sk-faq-i ${open === i ? 'on' : ''}`}>
          <button onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span><Plus size={18} />
          </button>
          <div className="sk-faq-a"><div><p>{f.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

/* ---------- final CTA ---------- */
export function FinalCta({ title, text, to = '/contact', label = 'Get in Touch' }: { title: string; text: string; to?: string; label?: string }) {
  return (
    <section className="sk-cta">
      <div className="sk-aurora sk-aurora-dark" aria-hidden />
      <Reveal className="sk-wrap sk-center">
        <h2 className="sk-h2 sk-light">{title}</h2>
        <p className="sk-sub sk-light-sub">{text}</p>
        <Link to={to} className="sk-btn sk-btn-light">{label} <ArrowRight size={15} /></Link>
      </Reveal>
    </section>
  );
}

export const SK_CSS = `
.sk{--ac:#10b981;color:#0f172a;background:#fbfcfb;overflow-x:clip}
.sk-wrap{max-width:76rem;margin:0 auto;padding:0 1.25rem;position:relative}
@media(min-width:1024px){.sk-wrap{padding:0 2.5rem}}
.sk-sec{padding:5rem 0}.sk-sec-w{background:#fff;border-block:1px solid #eef2f0}
.sk-center{text-align:center}
.sk-reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.sk-reveal.sk-in{opacity:1;transform:none}
@keyframes sk-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
/* hero */
.sk-hero{position:relative;padding:9rem 0 5rem;overflow:hidden}
.sk-aurora{position:absolute;inset:-20% -10% auto;height:120%;pointer-events:none;filter:blur(60px);opacity:.75;
background:radial-gradient(40% 40% at 25% 30%,rgba(16,185,129,.28),transparent 70%),radial-gradient(35% 40% at 75% 25%,rgba(56,189,248,.22),transparent 70%),radial-gradient(30% 35% at 55% 60%,rgba(167,139,250,.18),transparent 70%);animation:sk-drift 14s ease-in-out infinite alternate}
@keyframes sk-drift{to{transform:translate3d(3%,4%,0) scale(1.08)}}
.sk-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(15,23,42,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.045) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(60% 60% at 50% 30%,#000,transparent);-webkit-mask-image:radial-gradient(60% 60% at 50% 30%,#000,transparent)}
.sk-hero-in{text-align:center;display:flex;flex-direction:column;align-items:center}
.sk-pill{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem .9rem;border-radius:99px;background:#fff;border:1px solid #d1fae5;font-size:.68rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#047857;box-shadow:0 2px 10px rgba(16,185,129,.12)}
.sk-pill i{width:6px;height:6px;border-radius:50%;background:#10b981;animation:sk-ping 1.6s infinite}
@keyframes sk-ping{0%{box-shadow:0 0 0 0 rgba(16,185,129,.6)}100%{box-shadow:0 0 0 8px transparent}}
.sk-h1{font-size:clamp(2.2rem,5.4vw,4rem);font-weight:700;letter-spacing:-.04em;line-height:1.08;margin:1.4rem 0 1rem;max-width:52rem}
.sk-grad{background:linear-gradient(100deg,#059669,#0ea5e9,#8b5cf6,#059669);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sk-shift 8s linear infinite}
@keyframes sk-shift{to{background-position:250% 0}}
.sk-lead{color:#64748b;font-size:1.08rem;line-height:1.7;max-width:40rem;margin-bottom:2rem}
.sk-row{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center}
.sk-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.8rem 1.5rem;border-radius:99px;font-size:.9rem;font-weight:600;transition:transform .25s,box-shadow .25s,background .25s}
.sk-btn svg{transition:transform .25s}.sk-btn:hover svg{transform:translateX(4px)}.sk-btn:hover{transform:translateY(-2px)}
.sk-btn-dark{background:#0f172a;color:#fff;box-shadow:0 10px 30px -8px rgba(15,23,42,.5)}
.sk-btn-ghost{background:#fff;color:#0f172a;border:1px solid #e2e8f0}.sk-btn-ghost:hover{background:#f8fafc}
.sk-btn-acc{background:var(--ac);color:#fff;box-shadow:0 10px 28px -10px var(--ac);margin-top:1.25rem}
.sk-btn-light{background:#fff;color:#0f172a}
.sk-chips{display:flex;flex-wrap:wrap;gap:.8rem;justify-content:center;margin-top:3.2rem}
.sk-chip{display:flex;flex-direction:column;align-items:flex-start;padding:.8rem 1.2rem;border-radius:16px;background:rgba(255,255,255,.8);backdrop-filter:blur(10px);border:1px solid rgba(226,232,240,.9);box-shadow:0 12px 30px -14px rgba(15,23,42,.25);animation:sk-bob 5s ease-in-out infinite}
.sk-chip b{font-size:1.15rem;letter-spacing:-.02em}.sk-chip span{font-size:.72rem;color:#64748b}
@keyframes sk-bob{50%{transform:translateY(-8px)}}
/* headings */
.sk-head{margin-bottom:3rem}.sk-eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#059669;margin-bottom:.6rem}
.sk-h2{font-size:clamp(1.7rem,3.4vw,2.6rem);font-weight:700;letter-spacing:-.035em;line-height:1.15}
.sk-sub{color:#64748b;line-height:1.7;max-width:36rem;margin:.9rem auto 0}.sk-head:not(.sk-center) .sk-sub{margin-left:0}
.sk-h3{font-size:1.7rem;font-weight:700;letter-spacing:-.03em;margin-bottom:.6rem}.sk-p{color:#64748b;line-height:1.7;font-size:.95rem}
/* showcase */
.sk-tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:.4rem;padding:.4rem;border-radius:26px;background:#fff;border:1px solid #e2e8f0;box-shadow:0 8px 24px -14px rgba(15,23,42,.2);max-width:56rem;margin:0 auto 1.8rem}
.sk-tab{position:relative;flex:none;display:flex;align-items:center;gap:.5rem;padding:.6rem 1.05rem;border-radius:99px;font-size:.84rem;font-weight:600;color:#64748b;white-space:nowrap;overflow:hidden;transition:color .3s,background .3s}
.sk-tab:hover{color:#0f172a}.sk-tab.on{color:#fff;background:#0f172a}
.sk-tab-n{font-size:.65rem;opacity:.55;font-family:var(--font-mono)}
.sk-prog{position:absolute;left:0;bottom:0;height:3px;width:100%;background:var(--ac);transform-origin:left;animation:sk-fill linear forwards}
@keyframes sk-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.sk-stage{position:relative;perspective:1400px}
.sk-stage-glow{position:absolute;inset:8% 5%;background:var(--ac);opacity:.18;filter:blur(70px);border-radius:50%;transition:background .8s}
.sk-card{position:relative;display:grid;gap:2rem;padding:1.6rem;border-radius:28px;background:rgba(255,255,255,.92);border:1px solid #e8eeea;box-shadow:0 40px 80px -40px rgba(15,23,42,.35);transform:rotateX(var(--rx,0)) rotateY(var(--ry,0));transition:transform .25s ease-out;animation:sk-in-r .7s cubic-bezier(.16,1,.3,1) both}
.sk-card.from-l{animation-name:sk-in-l}
@keyframes sk-in-r{from{opacity:0;transform:translateX(40px) scale(.97)}}
@keyframes sk-in-l{from{opacity:0;transform:translateX(-40px) scale(.97)}}
@media(min-width:900px){.sk-card{grid-template-columns:1fr 1.1fr;padding:2.4rem;align-items:center}}
.sk-mini{margin:1.4rem 0 .6rem;font-size:.78rem;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.1em}
.sk-pts{display:flex;flex-wrap:wrap;gap:.45rem;list-style:none;padding:0}
.sk-pts li{display:inline-flex;align-items:center;gap:.35rem;padding:.35rem .75rem;border-radius:99px;background:#f1f5f3;font-size:.78rem;font-weight:500;color:#334155;animation:sk-up .5s both cubic-bezier(.16,1,.3,1)}
.sk-pts svg{color:var(--ac)}
.sk-shot{position:relative}
.sk-browser{border-radius:16px;overflow:hidden;background:#0f172a;box-shadow:0 30px 60px -25px rgba(15,23,42,.5);transform:translateZ(30px)}
.sk-dots{display:flex;gap:6px;padding:.65rem .9rem}.sk-dots i{width:9px;height:9px;border-radius:50%;background:#334155}
.sk-dots i:first-child{background:#f87171}.sk-dots i:nth-child(2){background:#fbbf24}.sk-dots i:nth-child(3){background:#34d399}
.sk-browser img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;animation:sk-zoom 8s ease-out both}
@keyframes sk-zoom{from{transform:scale(1.12)}to{transform:scale(1)}}
.sk-float{position:absolute;display:flex;align-items:center;gap:.4rem;padding:.55rem .9rem;border-radius:12px;background:#fff;font-size:.75rem;font-weight:600;box-shadow:0 14px 34px -12px rgba(15,23,42,.35);animation:sk-bob 4.5s ease-in-out infinite;transform:translateZ(70px)}
.sk-float-a{left:-.8rem;bottom:2rem;color:#047857}.sk-float-b{right:-.6rem;top:3rem;animation-delay:1.2s}
@media(max-width:899px){.sk-float{display:none}}
/* spotlight cards */
.sk-spot{position:relative;display:block;border-radius:22px;background:#fff;border:1px solid #e8eeea;overflow:hidden;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s}
.sk-spot::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .3s;pointer-events:none;background:radial-gradient(320px circle at var(--mx,50%) var(--my,50%),rgba(16,185,129,.14),transparent 60%)}
.sk-spot:hover{transform:translateY(-4px);box-shadow:0 24px 50px -26px rgba(15,23,42,.35);border-color:#a7f3d0}.sk-spot:hover::before{opacity:1}
.sk-bento{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:700px){.sk-bento{grid-template-columns:repeat(2,1fr)}}@media(min-width:1024px){.sk-bento{grid-template-columns:repeat(3,1fr)}.sk-wide{grid-column:span 2}}
.sk-bento-card{padding:1.6rem;height:100%}.sk-bento>div{display:flex}.sk-bento>div>*{flex:1}
.sk-bento-card h3{font-size:1.05rem;font-weight:700;margin:.9rem 0 .4rem}.sk-bento-card p{color:#64748b;font-size:.88rem;line-height:1.65}
.sk-ico{display:inline-flex;width:42px;height:42px;border-radius:12px;background:#ecfdf5;color:#059669;align-items:center;justify-content:center;transition:transform .4s}
.sk-spot:hover .sk-ico{transform:rotate(-8deg) scale(1.1)}
.sk-more{display:inline-flex;align-items:center;gap:.3rem;margin-top:1rem;font-size:.8rem;font-weight:600;color:#059669}
/* stepper */
.sk-rail{position:relative;display:flex;justify-content:space-between;margin:0 auto 2.5rem;max-width:44rem}
.sk-rail::before,.sk-rail-fill{content:'';position:absolute;top:19px;left:19px;height:3px;border-radius:3px;background:#e2e8f0;width:calc(100% - 38px)}
.sk-rail-fill{background:linear-gradient(90deg,#10b981,#38bdf8);transition:width .7s cubic-bezier(.16,1,.3,1);max-width:calc(100% - 38px)}
.sk-node{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:.5rem;color:#94a3b8}
.sk-node span{display:flex;width:40px;height:40px;border-radius:50%;align-items:center;justify-content:center;background:#fff;border:2px solid #e2e8f0;font-weight:700;font-size:.85rem;transition:all .4s}
.sk-node small{font-size:.75rem;font-weight:600}.sk-node.done span{border-color:#10b981;color:#059669}.sk-node.done{color:#0f172a}
.sk-node.on span{background:#10b981;color:#fff;box-shadow:0 0 0 6px rgba(16,185,129,.18);transform:scale(1.1)}
.sk-step-body{display:grid;gap:2rem;animation:sk-up .6s both cubic-bezier(.16,1,.3,1)}
@media(min-width:900px){.sk-step-body{grid-template-columns:.8fr 1.2fr;align-items:start}}
.sk-step-cards{display:grid;gap:.8rem}.sk-step-card{padding:1.2rem 1.4rem}
.sk-step-card h4{font-weight:700;font-size:.95rem;margin-bottom:.3rem}.sk-step-card p{color:#64748b;font-size:.86rem;line-height:1.6}
/* stats */
.sk-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:1.5rem;text-align:center}
.sk-stats b{display:block;font-size:2.6rem;font-weight:700;letter-spacing:-.04em;background:linear-gradient(120deg,#059669,#0ea5e9);-webkit-background-clip:text;background-clip:text;color:transparent}
.sk-stats span{font-size:.82rem;color:#64748b}
/* paths */
.sk-paths{display:grid;gap:1rem}@media(min-width:760px){.sk-paths{grid-template-columns:repeat(2,1fr)}}
.sk-path{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.4rem 1.6rem;height:100%}
.sk-paths>div{display:flex}.sk-paths>div>*{flex:1}
.sk-path h3{font-weight:700;font-size:1rem;margin-bottom:.25rem}.sk-path p{color:#64748b;font-size:.82rem}
.sk-arrow{display:flex;flex:none!important;width:38px;height:38px;border-radius:50%;background:#f1f5f3;align-items:center;justify-content:center;transition:all .3s}
.sk-spot:hover .sk-arrow{background:#10b981;color:#fff;transform:rotate(-45deg)}
/* marquee */
.sk-marq{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.sk-marq-track{display:flex;gap:.8rem;width:max-content;animation:sk-scroll 38s linear infinite}.sk-marq:hover .sk-marq-track{animation-play-state:paused}
.sk-logo{display:inline-flex!important;align-items:center;gap:.65rem;padding:.8rem 1.4rem!important;transition:transform .3s,box-shadow .3s}.sk-logo:hover{transform:translateY(-3px);box-shadow:0 14px 26px -14px rgba(15,23,42,.35)}.sk-marq span{padding:.7rem 1.3rem;border-radius:99px;background:#fff;border:1px solid #e2e8f0;font-size:.85rem;font-weight:600;color:#334155;white-space:nowrap}
@keyframes sk-scroll{to{transform:translateX(-50%)}}
/* faq */
.sk-faq{max-width:46rem;margin:0 auto;display:grid;gap:.7rem}
.sk-faq-i{border:1px solid #e8eeea;border-radius:18px;background:#fff;transition:border-color .3s,box-shadow .3s}.sk-faq-i.on{border-color:#a7f3d0;box-shadow:0 14px 34px -22px rgba(16,185,129,.5)}
.sk-faq-i button{display:flex;width:100%;justify-content:space-between;align-items:center;gap:1rem;padding:1.15rem 1.4rem;text-align:left;font-weight:600;font-size:.95rem}
.sk-faq-i svg{flex:none;transition:transform .4s;color:#059669}.sk-faq-i.on svg{transform:rotate(135deg)}
.sk-faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.16,1,.3,1)}.sk-faq-i.on .sk-faq-a{grid-template-rows:1fr}
.sk-faq-a>div{overflow:hidden}.sk-faq-a p{padding:0 1.4rem 1.2rem;color:#64748b;font-size:.9rem;line-height:1.7}
/* cta */
.sk-cta{position:relative;overflow:hidden;background:#070b14;padding:6rem 0}
.sk-aurora-dark{opacity:.5}.sk-light{color:#fff}.sk-light-sub{color:#94a3b8}.sk-cta .sk-sub{margin-bottom:2rem}
@media(prefers-reduced-motion:reduce){.sk *,.sk *::before{animation:none!important;transition:none!important}.sk-reveal{opacity:1;transform:none}}
`;
