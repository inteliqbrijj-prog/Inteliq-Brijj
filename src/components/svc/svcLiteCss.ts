/* Lightweight, static-first section styles shared by every Services sub-page.
   The only motion outside the hero is the pointer-tracking 3D tilt on the service cards. */
export const SVC_LITE_CSS = `
/* ---------- hero shell tweaks ---------- */
.sv-hero h1{font-size:clamp(1.85rem,3vw,2.7rem)}
.sv-hero .tagline{display:block;width:fit-content;margin:18px 0 0;font-size:15px;font-weight:600;letter-spacing:-.005em;background:linear-gradient(100deg,rgb(var(--c1d)),rgb(var(--c2)),rgb(var(--c3)));-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% 100%;animation:svGrad 8s linear infinite}
.sv-hero .tagline+h1{margin-top:8px}
.sv-hero-text>p+p{margin-top:12px}
.sv-hero.long .sv-hero-text>p{font-size:clamp(14.5px,1.05vw,16px);line-height:1.68}
.sv-chips-line{display:flex;flex-wrap:wrap;gap:7px;margin-top:20px;max-width:520px}
.sv-chips-line span{padding:5px 11px;border-radius:999px;background:rgba(255,255,255,.85);border:1px solid rgb(var(--c1) / .25);color:rgb(var(--c1x));font-size:12px;font-weight:600}
.sv-hero-visual{position:relative;min-width:0}
/* simple static hero: off-white + light green, centred, no animation, green theme text */
.sv-page{background:#f7faf8}
.sv-hero{background:linear-gradient(180deg,#f3faf6 0%,#fafcfb 55%,#ffffff 100%)}
.sv-hero-in{display:block}
.sv-hero-text{max-width:800px;margin:0 auto;text-align:center}
.sv-hero-text>p{max-width:700px;margin-left:auto;margin-right:auto}
.sv-hero .tagline{margin-left:auto;margin-right:auto;animation:none;background:none;-webkit-background-clip:unset;background-clip:unset;color:rgb(var(--c1d))}
.sv-hero h1 span{animation:none;background:none;-webkit-background-clip:unset;background-clip:unset;color:rgb(var(--c1d))}
.sv-pill i{animation:none}
.sv-hero .sv-actions{justify-content:center}
.sv-chips-line{justify-content:center;max-width:700px;margin-left:auto;margin-right:auto}
.sv-trust{justify-content:center}

/* ---------- section scaffold ---------- */
.sx-sec{padding:96px 0;background:#fff}
.sx-sec.alt{background:var(--bg1)}
.sx-sec.dark{background:var(--d0);color:#fff}
.sx-sec[id]{scroll-margin-top:70px}
.sx-center-cta{display:flex;justify-content:center;margin-top:40px}

/* ---------- intro (text + approach list) ---------- */
.sx-intro{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:56px;align-items:start}
.sx-intro h2{font-size:clamp(1.5rem,2.5vw,2.25rem);line-height:1.18;letter-spacing:-.025em;font-weight:700;margin:12px 0 16px}
.sx-intro p.lead{color:#475569;font-size:clamp(15.5px,1.2vw,17.5px);line-height:1.75}
.sx-appr{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.sx-appr>div{padding:18px 18px 16px;border-radius:16px;border:1px solid #e3e9f0;background:var(--bg1)}
.sx-appr>div:last-child:nth-child(odd){grid-column:1/-1}
.sx-appr .n{display:block;font-family:ui-monospace,Menlo,monospace!important;font-size:11.5px;font-weight:600;color:rgb(var(--c1d));margin-bottom:8px}
.sx-appr b{display:block;font-size:15px;font-weight:650;letter-spacing:-.01em;color:#0f172a}
.sx-appr em{display:block;margin-top:4px;font-style:normal;font-size:13.5px;line-height:1.6;color:#5b6b82}
.sx-applabel{display:block;margin:0 0 12px;font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgb(var(--c1d))}

/* ---------- SIGNATURE: tilt + spotlight service grid ---------- */
.sx-sv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;perspective:1500px}
.sx-card{--rx:0deg;--ry:0deg;--mx:50%;--my:0%;position:relative;display:flex;flex-direction:column;padding:26px 24px 22px;border-radius:22px;background:#fff;border:1px solid #e1e8ef;box-shadow:0 18px 36px -28px rgba(15,23,42,.4);transform:rotateX(var(--rx)) rotateY(var(--ry));transform-style:preserve-3d;transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .35s,border-color .35s,opacity .7s ease,translate .7s cubic-bezier(.16,1,.3,1)}
.sx-sv .sx-card{opacity:0;translate:0 26px;transition-delay:0s,0s,0s,calc(var(--i) * 45ms),calc(var(--i) * 45ms)}
.sx-sv.in .sx-card{opacity:1;translate:0 0}
.sx-card:hover,.sx-card.hit{border-color:rgb(var(--c1) / .45);box-shadow:0 44px 60px -32px rgb(var(--c1) / .55)}
.sx-card.hit{animation:sxHit 1.6s ease 1}
@keyframes sxHit{0%,100%{box-shadow:0 18px 36px -28px rgba(15,23,42,.4)}40%{box-shadow:0 0 0 4px rgb(var(--c1) / .28),0 40px 60px -30px rgb(var(--c1) / .6)}}
.sx-card:before{content:'';position:absolute;inset:0;border-radius:inherit;background:radial-gradient(340px circle at var(--mx) var(--my),rgb(var(--c1) / .12),transparent 62%);opacity:0;transition:opacity .3s;pointer-events:none}
.sx-card:after{content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1.5px;background:radial-gradient(240px circle at var(--mx) var(--my),rgb(var(--c1)),rgb(var(--c2)) 48%,transparent 72%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .3s;pointer-events:none}
.sx-card:hover:before,.sx-card:hover:after{opacity:1}
.sx-card>*{position:relative}
.sx-card .no{display:inline-flex;align-self:flex-start;align-items:center;justify-content:center;min-width:38px;height:28px;padding:0 10px;border-radius:99px;background:rgb(var(--c1) / .1);color:rgb(var(--c1d));font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;transition:transform .3s}
.sx-card .big{position:absolute;right:20px;top:14px;font-size:64px;line-height:1;font-weight:700;letter-spacing:-.05em;color:rgb(var(--c1) / .07);transition:transform .3s;pointer-events:none}
.sx-card h3{margin-top:16px;font-size:18px;line-height:1.28;font-weight:650;letter-spacing:-.018em;color:#0f172a;transition:transform .3s}
.sx-card .sub{margin-top:5px;font-size:13.5px;font-weight:600;color:rgb(var(--c1d))}
.sx-card p{margin-top:10px;color:#5b6b82;font-size:14.5px;line-height:1.68}
.sx-card p.note{margin-top:8px;color:#475569}
.sx-card .lh{display:block;margin:18px 0 9px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgb(var(--c1d))}
.sx-chips{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.sx-chips li{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:99px;background:var(--bg1);border:1px solid #e3e9f0;font-size:12px;font-weight:500;color:#334155}
.sx-chips li svg{color:rgb(var(--c1));flex:none}
.sx-card .tl{display:inline-flex;align-items:center;gap:6px;margin-top:14px;align-self:flex-start;padding:5px 11px;border-radius:99px;background:rgb(var(--c2) / .12);color:rgb(var(--c2d));font-size:12px;font-weight:600}
.sx-card .sp{flex:1 1 auto;min-height:6px}
.sx-card .lk{display:inline-flex;align-items:center;gap:6px;margin-top:18px;font-size:13.5px;font-weight:600;color:rgb(var(--c1d));transition:transform .3s}
.sx-card:hover .no{transform:translateZ(26px)}.sx-card:hover .big{transform:translateZ(14px)}.sx-card:hover h3{transform:translateZ(20px)}.sx-card:hover .lk{transform:translateZ(18px)}
.sx-card .lk svg{transition:transform .25s}.sx-card:hover .lk svg{transform:translateX(4px)}

/* ---------- goals ---------- */
.sx-goals{display:grid;grid-template-columns:repeat(var(--cols,3),minmax(0,1fr));gap:16px}
.sx-goal{display:flex;flex-direction:column;padding:22px 20px 20px;border-radius:20px;background:#fff;border:1px solid #e1e8ef;box-shadow:0 16px 32px -28px rgba(15,23,42,.35);transition:border-color .3s,box-shadow .3s}
.sx-goal:hover{border-color:rgb(var(--c1) / .45);box-shadow:0 28px 44px -30px rgb(var(--c1) / .5)}
.sx-goal .no{font-size:11.5px;font-weight:700;letter-spacing:.1em;color:rgb(var(--c1d))}
.sx-goal h3{margin-top:8px;font-size:16.5px;line-height:1.3;font-weight:650;letter-spacing:-.015em;color:#0f172a}
.sx-goal ul{list-style:none;margin:16px 0 0;padding:14px 0 0;border-top:1px dashed #dbe3ec;display:grid;gap:8px}
.sx-goal li{display:flex;align-items:center;gap:9px;font-size:13.5px;font-weight:550;color:#334155}
.sx-goal li .ic{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:rgb(var(--c1) / .1);color:rgb(var(--c1d));flex:none}
.sx-goal.next{justify-content:center;background:linear-gradient(145deg,var(--d1),var(--d2));border-color:var(--d1);color:#fff}
.sx-goal.next .no{color:rgb(var(--c1l))}.sx-goal.next h3{color:#fff}
.sx-goal.next .sv-btn{margin-top:18px;align-self:flex-start}
.sx-goals .band{grid-column:1/-1;flex-direction:row;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
.sx-goals .band h3{margin:6px 0 0;font-size:19px}.sx-goals .band .sv-btn{margin:0}

/* ---------- combos ---------- */
.sx-hub{display:flex;justify-content:center;margin-bottom:26px}
.sx-hub span{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 22px;border-radius:99px;background:linear-gradient(135deg,var(--d1),var(--d2));color:#fff;font-size:14px;font-weight:700;letter-spacing:.05em;box-shadow:0 18px 34px -18px rgb(var(--c1) / .7)}
.sx-hub svg{color:rgb(var(--c1l))}
.sx-cb{display:grid;grid-template-columns:repeat(var(--cols,4),minmax(0,1fr));gap:16px}
.sx-cc{display:flex;flex-direction:column;padding:24px 22px 22px;border-radius:20px;background:#fff;border:1px solid #e1e8ef;border-top:3px solid rgb(var(--c1));box-shadow:0 16px 32px -28px rgba(15,23,42,.35)}
.sx-cc .ic{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:rgb(var(--c1) / .1);color:rgb(var(--c1d));margin-bottom:14px}
.sx-cc .tg{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgb(var(--c1d))}
.sx-cc h3{margin-top:6px;font-size:16.5px;line-height:1.3;font-weight:650;letter-spacing:-.015em}
.sx-cc p{margin-top:8px;color:#5b6b82;font-size:14px;line-height:1.65}
.sx-cc .chain{display:flex;flex-wrap:wrap;align-items:center;gap:5px;margin-top:12px}
.sx-cc .chain span{padding:4px 9px;border-radius:99px;background:rgb(var(--c1) / .1);color:rgb(var(--c1x));font-size:11.5px;font-weight:600}
.sx-cc .chain svg{color:#94a3b8}
.sx-cc .lk{display:inline-flex;align-items:center;gap:6px;margin-top:auto;padding-top:16px;font-size:13.5px;font-weight:600;color:rgb(var(--c1d))}
.sx-cc .lk svg{transition:transform .25s}.sx-cc .lk:hover svg{transform:translateX(4px)}

/* ---------- process ---------- */
.sx-steps,.sx-ic{display:flex;flex-wrap:wrap;justify-content:center;gap:16px}
.sx-step,.sx-ic-card{flex:0 0 calc((100% - 16px * (var(--cols,3) - 1)) / var(--cols,3));min-width:0}
.sx-step{position:relative;padding:22px 20px 20px;border-radius:20px;background:#fff;border:1px solid #e1e8ef;box-shadow:0 16px 32px -28px rgba(15,23,42,.35)}
.sx-step .nb{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,rgb(var(--c1)),rgb(var(--c2)));color:#fff;font-size:13.5px;font-weight:700;box-shadow:0 10px 20px -10px rgb(var(--c1) / .7)}
.sx-step h3{margin-top:16px;font-size:16.5px;font-weight:650;letter-spacing:-.015em}
.sx-step p{margin-top:7px;font-size:14px;line-height:1.65;color:#5b6b82}
.sx-end{display:flex;justify-content:center;margin-top:30px}
.sx-end span{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:99px;background:var(--d1);color:#fff;font-size:13px;font-weight:600}
.sx-end i{width:8px;height:8px;border-radius:50%;background:#34d399}

/* ---------- icon cards (quality, businesses, countries) ---------- */
.sx-ic-card{display:flex;flex-direction:column;padding:24px 22px 22px;border-radius:20px;background:#fff;border:1px solid #e1e8ef;box-shadow:0 16px 32px -28px rgba(15,23,42,.35);transition:border-color .3s,box-shadow .3s}
.sx-ic-card:hover{border-color:rgb(var(--c1) / .45);box-shadow:0 28px 44px -30px rgb(var(--c1) / .5)}
.sx-ic-card .ic{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:rgb(var(--c1) / .1);color:rgb(var(--c1d));margin-bottom:16px}
.sx-ic-card h3{font-size:16.5px;font-weight:650;letter-spacing:-.015em;color:#0f172a}
.sx-ic-card p{margin-top:8px;color:#5b6b82;font-size:14px;line-height:1.68}
.sx-ic.dense .sx-ic-card{padding:20px 20px 18px}
.sx-ic.dense .sx-ic-card .ic{width:38px;height:38px;margin-bottom:12px}

/* ---------- why (dark, static) ---------- */
.sx-why{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px}
.sx-why article{grid-column:span 2;padding:26px 24px 22px;border-radius:20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)}
.sx-why.five article:nth-child(n+4){grid-column:span 3}
.sx-why .ic{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:rgb(var(--c1l) / .13);color:rgb(var(--c1l));margin-bottom:16px}
.sx-why h3{font-size:17px;font-weight:600;letter-spacing:-.015em;color:#fff}
.sx-why p{margin-top:7px;color:#9db0c6;font-size:14px;line-height:1.68}

/* ---------- local (Jaipur) ---------- */
.sx-local{position:relative;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:34px;align-items:center;padding:52px;border-radius:28px;color:#fff;overflow:hidden;background:linear-gradient(135deg,var(--d1),var(--d2) 60%,var(--d3));box-shadow:0 40px 80px -40px rgba(8,15,30,.75)}
.sx-local:before{content:'';position:absolute;inset:-40%;background:radial-gradient(circle at 85% 50%,rgb(var(--c2) / .22),transparent 36%);pointer-events:none}
.sx-local>*{position:relative}
.sx-local .sv-kicker{color:rgb(var(--c1l))}
.sx-local h2{font-size:clamp(1.5rem,2.5vw,2.25rem);line-height:1.18;letter-spacing:-.025em;font-weight:700;margin:12px 0 14px;color:#fff}
.sx-local p{color:#a5b4c8;font-size:15.5px;line-height:1.75;margin-bottom:12px;max-width:540px}
.sx-local .sv-btn{margin-top:10px}
.sx-route{display:flex;flex-direction:column;gap:0;align-items:flex-start;justify-self:center;padding:30px 44px;border-radius:24px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)}
.sx-route div{display:flex;align-items:center;gap:14px}
.sx-route .dot{width:16px;height:16px;border-radius:50%;background:rgb(var(--c1l));box-shadow:0 0 0 6px rgb(var(--c1l) / .16)}
.sx-route b{font-size:18px;font-weight:650;letter-spacing:-.01em}
.sx-route em{display:block;font-style:normal;font-size:12.5px;color:#94a3b8;margin-top:1px}
.sx-route .ln{width:2px;height:44px;margin:4px 0 4px 7px;background:linear-gradient(rgb(var(--c1l) / .7),rgb(var(--c2l) / .7))}
.sx-route div:last-child .dot{background:rgb(var(--c2l));box-shadow:0 0 0 6px rgb(var(--c2l) / .18)}

/* ---------- note + cta ---------- */
.sx-note{display:flex;gap:14px;align-items:flex-start;max-width:820px;margin:0 auto;padding:18px 22px;border-radius:16px;background:#fff;border:1px solid rgb(var(--c2) / .4);border-left:4px solid rgb(var(--c2))}
.sx-note svg{flex:none;color:rgb(var(--c2d));margin-top:2px}
.sx-note p{margin:0;font-size:14px;line-height:1.7;color:#475569}.sx-note b{color:#0f172a}
.sx-cta{padding:100px 0;background:var(--d0);color:#fff}
.sx-cta h2{font-size:clamp(1.5rem,2.5vw,2.25rem);line-height:1.18;letter-spacing:-.025em;font-weight:700;margin:12px auto 14px;max-width:660px;color:#fff}
.sx-cta .sv-kicker{color:rgb(var(--c1l))}
.sx-cta p{color:#9db0c6;max-width:580px;margin:0 auto 12px;font-size:clamp(15px,1.1vw,16.5px);line-height:1.7}
.sx-cta:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 15% 30%,rgb(var(--c1) / .22),transparent 34%),radial-gradient(circle at 85% 25%,rgb(var(--c2) / .2),transparent 32%);pointer-events:none}

/* ---------- faq: no typewriter ---------- */
.sv-faq-item.open .ans p{animation:none!important;border-right:0!important;clip-path:none}

/* ---------- responsive ---------- */
@media(max-width:1100px){
  .sx-sv{grid-template-columns:repeat(2,minmax(0,1fr))}
  .sx-goals{--cols:2!important}
  .sx-cb{--cols:2!important}
  .sx-steps{--cols:3!important}
  .sx-ic{--cols:2!important}
  .sx-intro{gap:36px}
}
@media(max-width:980px){
  .sv-hero{padding:104px 0 64px}.sv-hero-in{grid-template-columns:1fr;gap:44px}.sv-hero-visual{max-width:640px;width:100%;margin:0 auto}
  .sv-wrap,.sv-wrap.narrow{width:calc(100% - 48px)}
  .sx-intro{grid-template-columns:1fr}
  .sx-local{grid-template-columns:1fr;padding:38px 30px}.sx-route{flex-direction:row;align-items:center;flex-wrap:wrap;gap:6px;padding:18px 22px;justify-self:start}.sx-route .ln{width:30px;height:2px;margin:0 4px}
  .sx-why{grid-template-columns:1fr 1fr}.sx-why article,.sx-why.five article:nth-child(n+4){grid-column:span 1}.sx-why article:last-child:nth-child(odd){grid-column:1/-1}
}
@media(max-width:680px){
  .sv-wrap,.sv-wrap.narrow{width:calc(100% - 32px)}
  .sv-hero{padding:92px 0 52px}.sv-hero h1{font-size:clamp(1.65rem,7.2vw,2rem)}.sv-hero .sv-actions .sv-btn{flex:1 1 100%}
  .sx-sec{padding-top:68px;padding-bottom:68px}.sx-cta{padding:76px 0}.sv-head{margin-bottom:30px}
  .sx-sv,.sx-goals,.sx-cb,.sx-appr,.sx-why{grid-template-columns:1fr!important}.sx-steps,.sx-ic{--cols:1!important}
  .sx-why article:last-child:nth-child(odd){grid-column:auto}
  .sx-goals .band{flex-direction:column;align-items:flex-start}
  .sx-local{padding:30px 22px;border-radius:22px}
  .sv-faq-item button{padding:16px;font-size:14px}.sv-faq-item .ans p{margin:0 16px 16px 16px}
}
@media(hover:none){.sx-card{transform:none!important}}
@media(prefers-reduced-motion:reduce){.sx-card{transform:none!important;transition:none}.sx-sv .sx-card{opacity:1;translate:none}.sx-card.hit{animation:none}.sv-hero .tagline,.sv-hero h1 span{animation:none}}
`;
