import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal, type Step } from './SaasKit';

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

/* ============ 1. Scroll-pinned text over a 3D image that opens up ============ */
export function ImageReveal({ label, title, text, image, cta }: {
  label: string; title: string; text: string; image: string; cta?: { label: string; to: string };
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / (el.offsetHeight - window.innerHeight));
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--e', (1 - Math.pow(1 - clamp(p * 1.8), 3)).toFixed(4));
      el.style.setProperty('--c', clamp((p - 0.32) * 5).toFixed(4));
      el.style.setProperty('--s', clamp((p - 0.04) * 3).toFixed(4));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  const words = text.split(' ');
  return (
    <section ref={ref} className="s3-ir">
      <div className="s3-ir-pin">
        <div className="s3-ir-img">
          <img src={image} alt="" />
          <div className="s3-ir-shade" />
        </div>
        <div className="s3-ir-text">
          <p className="sk-eyebrow s3-ir-eb">{label}</p>
          <h2 className="sk-h2">{title}</h2>
          <p className="s3-ir-p">
            {words.map((w, i) => <span key={i} className="s3-w" style={{ ['--i' as string]: i / words.length }}>{w} </span>)}
          </p>
          {cta && <Link to={cta.to} className="sk-btn sk-btn-light s3-ir-cta">{cta.label} <ArrowRight size={15} /></Link>}
        </div>
      </div>
    </section>
  );
}

/* ============ 2. Stacking gradient cards, one by one ============ */
export function StackSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="s3-ss">
      {steps.map((s) => (
        <div key={s.title} className="s3-ss-block">
          <div className="s3-ss-left">
            <p className="s3-ss-count">{s.count}</p>
            <h3 className="s3-ss-title">{s.title}</h3>
            <p className="sk-p">{s.description}</p>
            <div className="s3-ss-dots">{s.cards.map((c) => <i key={c.heading} />)}</div>
          </div>
          <div className="s3-ss-cards">
            {s.cards.map((c, i) => (
              <article key={c.heading} className="s3-ss-card" data-n={i + 1} style={{ top: `calc(7rem + ${i * 1.7}rem)` }}>
                <h4>{c.heading}</h4>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ 3. Staggered 3D tile wave (mouse parallax + flip-in) ============ */
export type Tile = { title: string; text?: string; onClick?: () => void };
export function TileWave({ items }: { items: Tile[] }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const per = 2;
  const cols = Math.ceil(items.length / per);
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const g = e.currentTarget.firstElementChild as HTMLElement;
    g.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 14}deg`);
    g.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
  };
  const leave = (e: MouseEvent<HTMLDivElement>) => {
    const g = e.currentTarget.firstElementChild as HTMLElement;
    g.style.setProperty('--ry', '0deg'); g.style.setProperty('--rx', '0deg');
  };
  return (
    <div ref={ref} className={`s3-wave ${shown ? 'sk-in' : ''}`} onMouseMove={move} onMouseLeave={leave}>
      <div className="s3-wave-grid">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="s3-wave-col" style={{ ['--off' as string]: `${Math.abs(c - (cols - 1) / 2) * 3.4}rem` }}>
            {items.slice(c * per, c * per + per).map((t, k) => {
              const i = c * per + k;
              return (
                <button key={t.title} type="button" onClick={t.onClick} className="s3-tile"
                  style={{ ['--i' as string]: i, ['--h' as string]: 150 + c * 22 }}>
                  <b>{i + 1}</b>
                  <h4>{t.title}</h4>
                  {t.text && <p>{t.text}</p>}
                  <span className="s3-shine" />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ 4. Draggable 3D orbit ring of cards ============ */
export function Orbit3D({ items, onPick }: { items: { title: string; image: string }[]; onPick: (i: number) => void }) {
  const ring = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const st = useRef({ a: 0, v: 0, drag: false, x: 0, moved: 0, hover: false });
  const N = items.length;
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const s = st.current;
      if (!s.drag && !s.hover) s.a += 0.14;
      s.a += s.v; s.v *= 0.94;
      if (ring.current) ring.current.style.transform = `rotateX(-7deg) rotateY(${s.a}deg)`;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const d = (Math.cos(((i * 360) / N + s.a) * Math.PI / 180) + 1) / 2;
        c.style.opacity = String(0.2 + 0.8 * d);
        c.style.filter = `blur(${((1 - d) * 2.2).toFixed(2)}px) saturate(${0.5 + d * 0.5})`;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [N]);
  return (
    <>
    <div className="s3-orbit"
      onPointerDown={(e) => { st.current.drag = true; st.current.x = e.clientX; st.current.moved = 0; }}
      onPointerMove={(e) => { const s = st.current; if (!s.drag) return; const dx = e.clientX - s.x; s.x = e.clientX; s.a += dx * 0.35; s.v = dx * 0.04; s.moved += Math.abs(dx); }}
      onPointerUp={() => { st.current.drag = false; }}
      onPointerLeave={() => { st.current.drag = false; st.current.hover = false; }}
      onMouseEnter={() => { st.current.hover = true; }}>
      <div className="s3-orbit-floor" aria-hidden />
      <div ref={ring} className="s3-ring">
        {items.map((it, i) => (
          <button key={it.title} type="button" ref={(n) => { cards.current[i] = n; }}
            className="s3-oc" style={{ transform: `rotateY(${(i * 360) / N}deg) translateZ(var(--r))` }}
            onClick={() => { if (st.current.moved < 6) onPick(i); }}>
            <img src={it.image} alt="" draggable={false} />
            <span className="s3-oc-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="s3-oc-t">{it.title}</span>
          </button>
        ))}
      </div>
    </div>
    <p className="s3-orbit-hint">Drag to rotate · click a card to explore</p>
    </>
  );
}

/* ============ 5. Goal finder with animated re-ranking ============ */
const GOALS = ['Website', 'Mobile App', 'E Commerce', 'SEO', 'Social Media', 'Software', 'UI UX', 'Digital Marketing'];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');
export function GoalFinder({ items, onPick }: { items: { title: string; services: string[]; image: string }[]; onPick: (i: number) => void }) {
  const [sel, setSel] = useState<string[]>(['Website', 'SEO']);
  const score = (it: { services: string[] }) =>
    sel.filter((g) => it.services.some((s) => { const a = norm(s), b = norm(g); return a.includes(b) || b.includes(a); })).length;
  const scored = items.map((it, i) => ({ it, i, sc: score(it) }));
  const rank = [...scored].sort((a, b) => b.sc - a.sc || a.i - b.i).map((x) => x.i);
  const H = 72;
  return (
    <div className="s3-goal">
      <div className="s3-goal-chips">
        {GOALS.map((g) => (
          <button key={g} type="button" className={sel.includes(g) ? 'on' : ''}
            onClick={() => setSel((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]))}>{g}</button>
        ))}
      </div>
      <div className="s3-goal-list" style={{ height: items.length * H }}>
        {scored.map(({ it, i, sc }) => {
          const pct = sel.length ? Math.round((sc / sel.length) * 100) : 0;
          return (
            <button key={it.title} type="button" className="s3-goal-row" onClick={() => onPick(i)}
              style={{ transform: `translateY(${rank.indexOf(i) * H}px)`, opacity: pct ? 1 : 0.45 }}>
              <img src={it.image} alt="" />
              <span className="s3-goal-name">{it.title}</span>
              <span className="s3-goal-bar"><i style={{ width: `${pct}%` }} /></span>
              <b>{pct}%</b>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const S3_CSS = `
/* image reveal */
.s3-ir{position:relative;height:280vh;background:#fff}
.s3-ir-pin{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;perspective:1600px}
.s3-ir-img{background:#0f172a;position:absolute;inset:0;overflow:hidden;opacity:calc(var(--p,0) * 2.2);transform:rotateX(calc((1 - var(--e,0)) * 26deg)) scale(calc(.7 + var(--e,0) * .3));border-radius:calc((1 - var(--e,0)) * 48px);will-change:transform}
.s3-ir-img img{width:100%;height:100%;object-fit:cover;transform:scale(calc(1.3 - var(--e,0) * .3))}
.s3-ir-shade{position:absolute;inset:0;background:linear-gradient(rgba(7,11,20,.72),rgba(7,11,20,.86));opacity:var(--s,0)}
.s3-ir-text{position:relative;max-width:58rem;padding:0 1.5rem;text-align:center;color:rgb(calc(15 + 240 * var(--c,0)),calc(23 + 232 * var(--c,0)),calc(42 + 213 * var(--c,0)))}
.s3-ir-eb{color:inherit;opacity:.8}
.s3-ir-p{margin-top:1.4rem;font-size:clamp(1rem,1.7vw,1.3rem);line-height:1.8}
.s3-w{opacity:clamp(.16,calc((var(--p,0) * 1.6 - var(--i,0)) * 7 + .16),1)}
.s3-ir-cta{margin-top:1.8rem;opacity:clamp(0,calc((var(--p,0) - .75) * 6),1)}
/* stack steps */
.s3-ss-block{display:grid;gap:2rem;padding:1.5rem 0 2rem}
@media(min-width:900px){.s3-ss-block{grid-template-columns:.85fr 1.15fr;gap:4rem}.s3-ss-left{position:sticky;top:7rem;align-self:start}}
.s3-ss-count{font-size:1.1rem;color:#94a3b8;font-weight:500}
.s3-ss-title{font-size:clamp(2rem,4vw,3rem);font-weight:700;letter-spacing:-.04em;margin:.2rem 0 1rem}
.s3-ss-dots{display:flex;gap:.4rem;margin-top:1.4rem}.s3-ss-dots i{width:28px;height:4px;border-radius:4px;background:linear-gradient(90deg,#34d399,#38bdf8)}
.s3-ss-cards{display:flex;flex-direction:column;gap:1.2rem;padding-bottom:4vh}
.s3-ss-card{position:sticky;position:-webkit-sticky;min-height:11rem;padding:1.7rem 1.9rem;border-radius:26px;border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(120deg,#34d399,#38bdf8,#a78bfa) border-box;box-shadow:0 26px 50px -26px rgba(15,23,42,.4);overflow:hidden}
.s3-ss-card:not(:last-child){margin-bottom:20vh}
.s3-ss-card::after{content:attr(data-n);position:absolute;right:1.2rem;top:-.6rem;font-size:6rem;font-weight:800;letter-spacing:-.06em;color:rgba(16,185,129,.09)}
.s3-ss-card h4{font-size:1.1rem;font-weight:700;margin-bottom:.6rem}.s3-ss-card p{color:#64748b;line-height:1.7;max-width:30rem;font-size:.95rem}
@supports (animation-timeline:view()){.s3-ss-card{animation:s3-card-in linear both;animation-timeline:view();animation-range:entry 0% entry 70%}}
@keyframes s3-card-in{from{opacity:0;transform:translateY(80px) rotateX(-14deg) scale(.94)}}
/* tile wave */
.s3-wave{perspective:1400px;padding:1rem 0 2rem}
.s3-wave-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;transform-style:preserve-3d;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .35s ease-out}
.s3-wave-col{display:contents}
@media(min-width:900px){.s3-wave-grid{display:flex;justify-content:center;gap:1.2rem}.s3-wave-col{display:flex;flex-direction:column;gap:1.2rem;flex:1;max-width:15rem;padding-top:var(--off,0)}}
.s3-tile{position:relative;aspect-ratio:1/1.08;padding:1.1rem;border-radius:18px;color:#fff;text-align:left;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;
background:linear-gradient(145deg,hsl(var(--h) 55% 24%),hsl(calc(var(--h) + 40) 65% 11%));box-shadow:0 26px 40px -20px hsl(var(--h) 70% 12% / .75);
opacity:0;transform:translateY(90px) translateZ(-280px) rotateX(-65deg);transform-origin:50% 100%;transition:transform 1.1s cubic-bezier(.16,1,.3,1),opacity .8s,box-shadow .3s;transition-delay:calc(var(--i) * 90ms)}
.s3-wave.sk-in .s3-tile{opacity:1;transform:none;animation:s3-tf 6s ease-in-out calc(1.4s + var(--i) * .35s) infinite}
@keyframes s3-tf{50%{transform:translateY(-9px) translateZ(26px) rotateX(2deg)}}
.s3-wave.sk-in .s3-tile:hover{animation:none;transform:translateZ(60px) scale(1.06) rotateX(-4deg);transition-delay:0s;box-shadow:0 40px 60px -20px hsl(var(--h) 80% 30% / .8)}
.s3-tile b{position:absolute;top:.4rem;left:1rem;font-size:3.4rem;font-weight:300;letter-spacing:-.05em;background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(255,255,255,0));-webkit-background-clip:text;background-clip:text;color:transparent}
.s3-tile h4{font-size:.95rem;font-weight:600;line-height:1.3}.s3-tile p{font-size:.74rem;opacity:.7;margin-top:.35rem;line-height:1.5}
.s3-shine{position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.16) 50%,transparent 65%);transform:translateX(-120%);transition:transform .8s}.s3-tile:hover .s3-shine{transform:translateX(120%)}
/* orbit */
.s3-orbit{--r:clamp(210px,36vw,500px);--cw:clamp(130px,19vw,230px);position:relative;height:clamp(260px,28vw,340px);margin-top:1.5rem;perspective:2600px;cursor:grab;touch-action:pan-y;user-select:none}
.s3-orbit:active{cursor:grabbing}
.s3-ring{position:absolute;left:0;right:0;top:9%;height:70%;transform-style:preserve-3d}
.s3-oc{position:absolute;left:calc(50% - var(--cw) / 2);top:0;width:var(--cw);height:100%;border-radius:18px;overflow:hidden;backface-visibility:hidden;background:#0f172a;box-shadow:0 30px 50px -22px rgba(15,23,42,.6);text-align:left;transition:box-shadow .3s}
.s3-oc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}
.s3-oc::after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 35%,rgba(7,11,20,.88))}
.s3-oc-n{position:absolute;top:.7rem;left:.8rem;z-index:1;font-size:.7rem;font-family:var(--font-mono);color:#fff;background:rgba(255,255,255,.2);backdrop-filter:blur(6px);padding:.2rem .5rem;border-radius:99px}
.s3-oc-t{position:absolute;left:.9rem;right:.9rem;bottom:.8rem;z-index:1;color:#fff;font-weight:600;font-size:.85rem;line-height:1.3}
.s3-oc:hover{box-shadow:0 0 0 2px #34d399,0 30px 50px -22px rgba(16,185,129,.7)}
.s3-orbit-floor{position:absolute;left:10%;right:10%;bottom:4%;height:12%;border-radius:50%;background:radial-gradient(ellipse,rgba(16,185,129,.35),transparent 70%);filter:blur(14px)}
.s3-orbit-hint{text-align:center;font-size:.78rem;color:#94a3b8;margin:2rem 0 .5rem}
/* goal finder */
.s3-goal{max-width:46rem;margin:0 auto}
.s3-goal-chips{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-bottom:1.8rem}
.s3-goal-chips button{padding:.55rem 1.1rem;border-radius:99px;border:1px solid #e2e8f0;background:#fff;font-size:.84rem;font-weight:600;color:#475569;transition:all .3s}
.s3-goal-chips button:hover{border-color:#6ee7b7}.s3-goal-chips button.on{background:#0f172a;color:#fff;border-color:#0f172a;transform:translateY(-2px);box-shadow:0 10px 20px -10px rgba(15,23,42,.6)}
.s3-goal-list{position:relative}
.s3-goal-row{position:absolute;left:0;right:0;top:0;height:64px;display:flex;align-items:center;gap:.9rem;padding:0 1rem 0 .6rem;border-radius:16px;background:#fff;border:1px solid #e8eeea;text-align:left;transition:transform .7s cubic-bezier(.16,1,.3,1),opacity .4s,border-color .3s}
.s3-goal-row:hover{border-color:#6ee7b7}
.s3-goal-row img{width:46px;height:46px;border-radius:12px;object-fit:cover;flex:none}
.s3-goal-name{flex:1;font-weight:600;font-size:.9rem;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.s3-goal-bar{width:30%;height:6px;border-radius:6px;background:#eef2f0;overflow:hidden;flex:none}
.s3-goal-bar i{display:block;height:100%;border-radius:6px;background:linear-gradient(90deg,#34d399,#38bdf8);transition:width .8s cubic-bezier(.16,1,.3,1)}
.s3-goal-row b{width:2.6rem;text-align:right;font-size:.85rem;color:#059669}
`;
