import { Fragment, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Layers, MapPin, ShieldCheck, TrendingUp, type LucideIcon } from 'lucide-react';
import { SVC_BASE_CSS } from './svcBaseCss';
import { SVC_LITE_CSS } from './svcLiteCss';

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */
export type Vars = CSSProperties & Record<string, string | number>;
export type Theme = Record<string, string>;
export type Cta = { label: string; to: string };

export function useInView<T extends HTMLElement>(threshold = 0.18) {
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

export function Rv({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.14);
  return <div ref={ref} className={`sv-rv ${shown ? 'in' : ''} ${className}`} style={{ ['--d' as string]: `${delay}ms` } as Vars}>{children}</div>;
}

export function Head({ kicker, title, text, center = true, light = false }: { kicker: string; title: string; text?: string; center?: boolean; light?: boolean }) {
  return (
    <Rv className={`sv-head ${center ? 'center' : ''} ${light ? 'light' : ''}`}>
      <span className="sv-kicker">{kicker}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Rv>
  );
}

/** sets the document title and meta description for a page (from the SEO block of the content docs) */
export function useDocMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const created = !meta;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    const prevDesc = meta.content;
    document.title = title;
    meta.content = description;
    return () => {
      document.title = prevTitle;
      if (created) meta?.remove(); else if (meta) meta.content = prevDesc;
    };
  }, [title, description]);
}

function CtaLink({ cta, className, children }: { cta: Cta; className: string; children: ReactNode }) {
  if (cta.to.startsWith('#')) return <a href={cta.to} className={className}>{children}</a>;
  return <Link to={cta.to} className={className}>{children}</Link>;
}

export function SvcPage({ theme, children }: { theme: Theme; children: ReactNode }) {
  return (
    <div className="sv-page" style={theme as Vars}>
      <style>{SVC_BASE_CSS + SVC_LITE_CSS}</style>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — simple static hero                   */
/* ------------------------------------------------------------------ */
export function SvcHero({ pill, tagline, title, paras, chips, primary, secondary, trust, long = false }: {
  pill: string; tagline?: string; title: ReactNode; paras: string[]; chips?: string[]; primary: Cta; secondary: Cta; trust?: string; long?: boolean;
}) {
  return (
    <section className={`sv-hero ${long ? 'long' : ''}`}>
      <div className="sv-wrap sv-hero-in">
        <div className="sv-hero-text">
          <span className="sv-pill"><i /> {pill}</span>
          {tagline && <span className="tagline">{tagline}</span>}
          <h1>{title}</h1>
          {paras.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          {chips && <div className="sv-chips-line">{chips.map((c) => <span key={c}>{c}</span>)}</div>}
          <div className="sv-actions" style={{ marginTop: 26 }}>
            <CtaLink cta={primary} className="sv-btn dark">{primary.label} <ArrowRight size={15} /></CtaLink>
            <CtaLink cta={secondary} className="sv-btn light">{secondary.label}</CtaLink>
          </div>
          {trust && <div className="sv-trust"><MapPin size={14} /> {trust}</div>}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* INTRO — lead text with an optional approach list                    */
/* ------------------------------------------------------------------ */
export function SxIntro({ kicker, title, lead, label, items, cta }: {
  kicker: string; title: string; lead: string; label?: string; items?: { t: string; s: string }[]; cta?: Cta;
}) {
  if (!items) {
    return (
      <section className="sx-sec">
        <div className="sv-wrap narrow"><Head kicker={kicker} title={title} text={lead} /></div>
      </section>
    );
  }
  return (
    <section className="sx-sec">
      <div className="sv-wrap sx-intro">
        <Rv>
          <span className="sv-kicker">{kicker}</span>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
          {cta && <div style={{ marginTop: 24 }}><CtaLink cta={cta} className="sv-btn dark">{cta.label} <ArrowRight size={15} /></CtaLink></div>}
        </Rv>
        <Rv delay={120}>
          {label && <span className="sx-applabel">{label}</span>}
          <div className="sx-appr">
            {items.map((it, i) => (
              <div key={it.t}><span className="n">{String(i + 1).padStart(2, '0')}</span><b>{it.t}</b><em>{it.s}</em></div>
            ))}
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SERVICES — the one signature animation: pointer-tracking 3D tilt    */
/* cards with a spotlight that follows the cursor                      */
/* ------------------------------------------------------------------ */
export type ExItem = {
  slug: string; title: string; sub?: string; desc: string; note?: string; label?: string;
  includes?: string[]; tagline?: string; cta?: Cta;
};

function tiltMove(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
  el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
  el.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`);
  el.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`);
}
function tiltLeave(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.setProperty('--rx', '0deg');
  el.style.setProperty('--ry', '0deg');
}

export function SxServices({ id, kicker, title, text, items, cta }: { id: string; kicker: string; title: string; text?: string; items: ExItem[]; cta?: Cta }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.08);
  const loc = useLocation();
  const [hit, setHit] = useState('');
  useEffect(() => {
    const h = loc.hash.replace('#', '');
    if (!h || !items.some((s) => s.slug === h)) return;
    const t1 = window.setTimeout(() => { document.getElementById(`${id}-${h}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setHit(h); }, 120);
    const t2 = window.setTimeout(() => setHit(''), 2400);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [loc.hash, items, id]);
  return (
    <section className="sx-sec alt" id={id}>
      <div className="sv-wrap">
        <Head kicker={kicker} title={title} text={text} />
        <div ref={ref} className={`sx-sv ${shown ? 'in' : ''}`}>
          {items.map((it, i) => {
            const no = String(i + 1).padStart(2, '0');
            return (
              <article key={it.slug} id={`${id}-${it.slug}`} className={`sx-card ${hit === it.slug ? 'hit' : ''}`}
                style={{ ['--i' as string]: i % 3 } as Vars} onPointerMove={tiltMove} onPointerLeave={tiltLeave}>
                <span className="big" aria-hidden="true">{no}</span>
                <span className="no">{no}</span>
                <h3>{it.title}</h3>
                {it.sub && <div className="sub">{it.sub}</div>}
                <p>{it.desc}</p>
                {it.note && <p className="note">{it.note}</p>}
                {it.includes && (
                  <>
                    <span className="lh">{it.label ?? 'Includes'}</span>
                    <ul className="sx-chips">{it.includes.map((c) => <li key={c}><Check size={12} />{c}</li>)}</ul>
                  </>
                )}
                {it.tagline && <span className="tl"><TrendingUp size={13} /> {it.tagline}</span>}
                <span className="sp" />
                {it.cta && <CtaLink cta={it.cta} className="lk">{it.cta.label} <ArrowRight size={14} /></CtaLink>}
              </article>
            );
          })}
        </div>
        {cta && <div className="sx-center-cta"><CtaLink cta={cta} className="sv-btn dark">{cta.label} <ArrowRight size={15} /></CtaLink></div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* GOALS — which solution fits                                         */
/* ------------------------------------------------------------------ */
export function SxGoals({ kicker, title, text, goals, icons, next, cols = 3 }: {
  kicker: string; title: string; text?: string; goals: { q: string; mods: string[] }[];
  icons: Record<string, LucideIcon>; next: { title: string; cta: Cta }; cols?: number;
}) {
  const inline = (goals.length + 1) % cols === 0;
  return (
    <section className="sx-sec">
      <div className="sv-wrap">
        <Head kicker={kicker} title={title} text={text} />
        <Rv delay={60}>
          <div className="sx-goals" style={{ ['--cols' as string]: cols } as Vars}>
            {goals.map((g, n) => (
              <article className="sx-goal" key={g.q}>
                <span className="no">{String(n + 1).padStart(2, '0')}</span>
                <h3>{g.q}</h3>
                <ul>
                  {g.mods.map((m) => {
                    const I = icons[m] ?? Layers;
                    return <li key={m}><span className="ic"><I size={14} /></span>{m}</li>;
                  })}
                </ul>
              </article>
            ))}
            <article className={`sx-goal next ${inline ? '' : 'band'}`}>
              <div><span className="no">NEXT STEP</span><h3>{next.title}</h3></div>
              <CtaLink cta={next.cta} className="sv-btn white">{next.cta.label} <ArrowRight size={15} /></CtaLink>
            </article>
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* COMBOS — related services                                           */
/* ------------------------------------------------------------------ */
export type Combo = { tag: string; title?: string; text: string[]; icon: LucideIcon; cta?: Cta; chain?: string[] };

export function SxCombos({ kicker, title, text, hub, hubIcon: HubIcon, items, cta }: {
  kicker: string; title: string; text?: string; hub: string; hubIcon: LucideIcon; items: Combo[]; cta?: Cta;
}) {
  return (
    <section className="sx-sec alt">
      <div className="sv-wrap">
        <Head kicker={kicker} title={title} text={text} />
        <Rv delay={60}>
          <div className="sx-hub"><span><HubIcon size={16} /> {hub}</span></div>
          <div className="sx-cb" style={{ ['--cols' as string]: items.length } as Vars}>
            {items.map((c) => {
              const I = c.icon;
              return (
                <article className="sx-cc" key={c.tag}>
                  <span className="ic"><I size={19} /></span>
                  {c.title && <span className="tg">{c.tag}</span>}
                  <h3>{c.title ?? c.tag}</h3>
                  {c.text.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
                  {c.chain && <div className="chain">{c.chain.map((x, k) => <Fragment key={x}>{k > 0 && <ArrowRight size={12} />}<span>{x}</span></Fragment>)}</div>}
                  {c.cta && <CtaLink cta={c.cta} className="lk">{c.cta.label} <ArrowRight size={14} /></CtaLink>}
                </article>
              );
            })}
          </div>
        </Rv>
        {cta && <div className="sx-center-cta"><CtaLink cta={cta} className="sv-btn dark">{cta.label} <ArrowRight size={15} /></CtaLink></div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PROCESS — numbered steps                                            */
/* ------------------------------------------------------------------ */
export function SxSteps({ kicker, title, text, steps, end, alt = false }: {
  kicker: string; title: string; text?: string; steps: { t: string; d: string }[]; end?: string; alt?: boolean;
}) {
  const cols = steps.length <= 4 ? steps.length : steps.length === 5 ? 5 : steps.length === 6 ? 3 : 4;
  return (
    <section className={`sx-sec ${alt ? 'alt' : ''}`}>
      <div className="sv-wrap">
        <Head kicker={kicker} title={title} text={text} />
        <Rv delay={60}>
          <div className="sx-steps" style={{ ['--cols' as string]: cols } as Vars}>
            {steps.map((s, i) => (
              <article className="sx-step" key={s.t}>
                <span className="nb">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            ))}
          </div>
        </Rv>
        {end && <div className="sx-end"><span><i /> {end}</span></div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ICON CARDS — quality, businesses, countries                         */
/* ------------------------------------------------------------------ */
export function SxCards({ kicker, title, text, items, cols = 3, alt = false, dense = false, cta }: {
  kicker: string; title: string; text?: string; items: { icon: LucideIcon; title: string; text: string }[]; cols?: number; alt?: boolean; dense?: boolean; cta?: Cta;
}) {
  return (
    <section className={`sx-sec ${alt ? 'alt' : ''}`}>
      <div className="sv-wrap">
        <Head kicker={kicker} title={title} text={text} />
        <Rv delay={60}>
          <div className={`sx-ic ${dense ? 'dense' : ''}`} style={{ ['--cols' as string]: cols } as Vars}>
            {items.map((x) => {
              const I = x.icon;
              return (
                <article className="sx-ic-card" key={x.title}>
                  <span className="ic"><I size={20} /></span>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </article>
              );
            })}
          </div>
        </Rv>
        {cta && <div className="sx-center-cta"><CtaLink cta={cta} className="sv-btn dark">{cta.label} <ArrowRight size={15} /></CtaLink></div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* WHY — dark, static                                                  */
/* ------------------------------------------------------------------ */
export function SxWhy({ kicker, title, text, items }: {
  kicker: string; title: string; text?: string; items: { icon: LucideIcon; title: string; text: string }[];
}) {
  return (
    <section className="sx-sec dark">
      <div className="sv-wrap">
        <Head light kicker={kicker} title={title} text={text} />
        <Rv delay={60}>
          <div className={`sx-why ${items.length === 5 ? 'five' : ''}`}>
            {items.map((w) => {
              const I = w.icon;
              return (
                <article key={w.title}>
                  <span className="ic"><I size={20} /></span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
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
/* LOCAL — Jaipur                                                      */
/* ------------------------------------------------------------------ */
export function SxLocal({ kicker, title, paras, cta, route = ['Jaipur', 'Rajasthan', 'India'] }: {
  kicker: string; title: string; paras: string[]; cta: Cta; route?: string[];
}) {
  return (
    <section className="sx-sec" style={{ paddingTop: 24 }}>
      <div className="sv-wrap">
        <Rv>
          <div className="sx-local">
            <div>
              <span className="sv-kicker">{kicker}</span>
              <h2>{title}</h2>
              {paras.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              <CtaLink cta={cta} className="sv-btn white">{cta.label} <ArrowRight size={15} /></CtaLink>
            </div>
            <div className="sx-route" aria-hidden="true">
              {route.map((r, i) => (
                <Fragment key={r}>
                  {i > 0 && <span className="ln" />}
                  <div><span className="dot" /><span><b>{r}</b></span></div>
                </Fragment>
              ))}
            </div>
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* NOTE                                                                */
/* ------------------------------------------------------------------ */
export function SxNote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="sx-sec alt" style={{ paddingTop: 56, paddingBottom: 56 }}>
      <div className="sv-wrap">
        <Rv><div className="sx-note"><ShieldCheck size={22} /><p><b>{label}: </b>{children}</p></div></Rv>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export function SvcFaq({ kicker, title, items }: { kicker: string; title: string; items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sv-faq">
      <div className="sv-wrap narrow">
        <Head kicker={kicker} title={title} />
        <div className="sv-faq-list">
          {items.map(([q, a], n) => (
            <div className={`sv-faq-item ${open === n ? 'open' : ''}`} key={q}>
              <button type="button" aria-expanded={open === n} onClick={() => setOpen(open === n ? null : n)}>
                <span className="pr">?</span><span className="q">{q}</span><ChevronDown size={18} />
              </button>
              <div className="ans"><div className="in"><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FINAL CTA                                                           */
/* ------------------------------------------------------------------ */
export function SxCta({ kicker, title, paras, primary, secondary }: {
  kicker: string; title: string; paras: string[]; primary: Cta; secondary: Cta;
}) {
  return (
    <section className="sx-cta" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="sv-wrap narrow center">
        <Rv>
          <span className="sv-kicker">{kicker}</span>
          <h2>{title}</h2>
          {paras.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <div className="sv-actions center" style={{ marginTop: 26 }}>
            <CtaLink cta={primary} className="sv-btn white">{primary.label} <ArrowRight size={15} /></CtaLink>
            <CtaLink cta={secondary} className="sv-btn outline">{secondary.label}</CtaLink>
          </div>
        </Rv>
      </div>
    </section>
  );
}
