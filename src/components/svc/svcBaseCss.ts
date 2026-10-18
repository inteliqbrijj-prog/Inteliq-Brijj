/* generated from the IT Solutions page styles, themed through CSS variables */
export const SVC_BASE_CSS = `.sv-page{font-family:'Inter',system-ui,-apple-system,sans-serif;color:#0f172a;background:#fff;overflow-x:clip;-webkit-font-smoothing:antialiased}
:where(.sv-page) *{font-family:'Inter',system-ui,-apple-system,sans-serif}
:where(.sv-page) :is(h1,h2,h3,h4,h5,h6,p){margin:0}
:where(.sv-page) :is(h1,h2,h3,h4,h5,h6){color:inherit}
.sv-wrap{width:min(1180px,calc(100% - 64px));margin:0 auto;position:relative;z-index:2}.sv-wrap.narrow{width:min(840px,calc(100% - 64px))}.sv-wrap.center{text-align:center}
.sv-kicker{display:inline-block;color:rgb(var(--c1d));font-size:11.5px;font-weight:600;letter-spacing:.14em;line-height:1.4;text-transform:uppercase}
section[class^="sv-"]{position:relative}
.sv-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 20px;border-radius:999px;font-size:14px;font-weight:600;transition:transform .25s ease,box-shadow .25s ease;white-space:nowrap}
.sv-btn:hover{transform:translateY(-2px)}.sv-btn svg{transition:transform .25s}.sv-btn:hover svg{transform:translateX(3px)}
.sv-btn.dark{background:#0f172a;color:#fff;box-shadow:0 12px 24px -10px rgba(15,23,42,.45)}.sv-btn.light{background:#fff;color:#0f172a;border:1px solid #dfe7ef}.sv-btn.white{background:#fff;color:#0f172a;box-shadow:0 12px 24px -12px rgba(0,0,0,.5)}.sv-btn.outline{border:1px solid rgba(255,255,255,.28);color:#fff;background:rgba(255,255,255,.06)}
.sv-actions{display:flex;gap:12px;flex-wrap:wrap}.sv-actions.center{justify-content:center}
.sv-rv{opacity:0;transform:translateY(26px);transition:opacity .8s ease var(--d,0ms),transform .8s cubic-bezier(.16,1,.3,1) var(--d,0ms)}.sv-rv.in{opacity:1;transform:none}
.sv-head{max-width:720px;margin-bottom:44px}.sv-head.center{margin-left:auto;margin-right:auto;text-align:center}
.sv-head h2,.sv-modern h2,.sv-jaipur h2,.sv-cta h2{font-size:clamp(1.5rem,2.5vw,2.25rem);line-height:1.18;letter-spacing:-.025em;font-weight:700;margin:12px 0 14px}
.sv-head p{color:#5b6b82;font-size:clamp(15px,1.1vw,16.5px);line-height:1.7}.sv-head.light h2{color:#fff}.sv-head.light p{color:#9db0c6}.sv-head.light .sv-kicker{color:rgb(var(--c1l))}
.sv-bg{position:absolute;inset:-20% -10%;background:radial-gradient(circle at 10% 20%,rgb(var(--c1) / .16),transparent 34%),radial-gradient(circle at 90% 15%,rgb(var(--c2) / .16),transparent 30%),radial-gradient(circle at 60% 90%,rgb(var(--c3) / .1),transparent 34%);filter:blur(34px);animation:svDrift 14s ease-in-out infinite alternate;pointer-events:none}
.sv-bg.dark{background:radial-gradient(circle at 15% 30%,rgb(var(--c1) / .22),transparent 32%),radial-gradient(circle at 85% 25%,rgb(var(--c2) / .22),transparent 30%)}


.sv-hero{padding:124px 0 84px;background:var(--bg1);overflow:hidden}
.sv-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(15,23,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.04) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(70% 80% at 50% 40%,#000,transparent);mask-image:radial-gradient(70% 80% at 50% 40%,#000,transparent)}
.sv-hero-in{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.1fr);gap:56px;align-items:center}
.sv-hero-text{max-width:540px;text-align:left}
.sv-pill{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border:1px solid rgb(var(--c1) / .4);border-radius:999px;background:rgba(255,255,255,.88);color:rgb(var(--c1x));font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;box-shadow:0 10px 24px -12px rgb(var(--c1) / .45)}.sv-pill i{width:7px;height:7px;border-radius:50%;background:rgb(var(--c1));animation:svPing 2s infinite}
.sv-hero h1{text-wrap:balance;font-size:clamp(2rem,3.4vw,3.1rem);line-height:1.12;letter-spacing:-.032em;font-weight:700;margin:20px 0 16px}
.sv-hero h1 span{background:linear-gradient(100deg,rgb(var(--c1)),rgb(var(--c2)),rgb(var(--c3)));-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% 100%;animation:svGrad 8s linear infinite}
.sv-hero-text>p{color:#5b6b82;font-size:clamp(15px,1.15vw,17px);line-height:1.7;max-width:500px}
.sv-hero .sv-actions{margin-top:26px}
.sv-trust{display:inline-flex;align-items:center;gap:7px;margin-top:22px;color:#64748b;font-size:13px;font-weight:500}.sv-trust svg{color:rgb(var(--c1d))}

/* ============ FAQ ============ */
.sv-faq{padding:88px 0 96px;background:var(--bg1)}
.sv-faq-list{display:grid;gap:10px}
.sv-faq-item{border:1px solid #e1e8ef;border-radius:16px;background:#fff;overflow:hidden;transition:border-color .3s,box-shadow .3s}.sv-faq-item.open{border-color:rgb(var(--c1) / .55);box-shadow:0 16px 34px -22px rgba(15,23,42,.35)}
.sv-faq-item button{width:100%;display:flex;align-items:center;gap:14px;padding:18px 22px;text-align:left;font-size:15px;font-weight:600;color:#172235}
.sv-faq-item .pr{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:#f1f5f9;color:#64748b;font-family:ui-monospace,Menlo,monospace!important;font-size:12px;transition:all .3s}.sv-faq-item.open .pr{background:#0f172a;color:rgb(var(--c1l))}
.sv-faq-item .q{flex:1}.sv-faq-item button>svg{flex:none;color:rgb(var(--c1d));transition:transform .4s cubic-bezier(.16,1,.3,1)}.sv-faq-item.open button>svg{transform:rotate(180deg)}
.sv-faq-item .ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.16,1,.3,1)}.sv-faq-item.open .ans{grid-template-rows:1fr}
.sv-faq-item .ans .in{overflow:hidden}
.sv-faq-item .ans p{margin:0 22px 20px 60px;padding:12px 14px;border-radius:12px;background:var(--d1);color:#cbd5e1;font-size:14px;line-height:1.7}
.sv-faq-item.open .ans p{animation:svType 1.1s steps(46,end) both;border-right:2px solid rgb(var(--c1l));animation-name:svType,svCaretOff;animation-duration:1.1s,.2s;animation-delay:.1s,1.3s;animation-fill-mode:both,forwards}


/* ============ KEYFRAMES ============ */
@keyframes svDrift{to{transform:translate3d(2%,3%,0) scale(1.06)}}
@keyframes svGrad{to{background-position:200% 0}}
@keyframes svPing{0%{box-shadow:0 0 0 0 rgb(var(--c1) / .55)}80%,100%{box-shadow:0 0 0 8px rgb(var(--c1) / 0)}}
@keyframes svBlink{50%{opacity:0}}
@keyframes svFloat{50%{transform:translateY(-9px) rotate(4deg)}}
@keyframes svBar{0%,100%{transform:scaleY(.6)}50%{transform:scaleY(1)}}
@keyframes svChip{to{opacity:1;transform:none}}
@keyframes svSlideIn{0%{opacity:0;transform:translateY(10px)}18%,80%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-4px)}}
@keyframes svScroll{0%,100%{transform:translateY(0)}50%{transform:translateY(-62px)}}
@keyframes svPk1{0%{left:20%;top:19%}50%{left:76%;top:19%}100%{left:76%;top:76%}}
@keyframes svPk2{0%{left:76%;top:76%}50%{left:20%;top:76%}100%{left:20%;top:19%}}
@keyframes svColor{0%,20%{background:rgba(255,255,255,.14)}50%,80%{background:linear-gradient(135deg,rgb(var(--c1)),rgb(var(--c2)))}100%{background:rgba(255,255,255,.14)}}
@keyframes svCursor{0%{left:20%;top:20%}25%{left:35%;top:55%}50%{left:62%;top:60%}75%{left:45%;top:25%}100%{left:20%;top:20%}}
@keyframes svPress{0%,40%,100%{transform:none}46%{transform:scale(.9);background:rgb(var(--c1l))}54%{transform:none}}
@keyframes svPaid{0%,55%{opacity:0;transform:translateY(8px)}65%,92%{opacity:1;transform:none}100%{opacity:0}}
@keyframes svSpin{to{--ang:360deg}}
@keyframes svPanel{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes svPop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
@keyframes svSnap{from{opacity:0;transform:translateX(-24px) scale(.94)}to{opacity:1;transform:none}}
@keyframes svFadeIn{to{opacity:1}}
@keyframes svWire{to{left:100%}}
@keyframes svDraw{to{stroke-dashoffset:0}}
@keyframes svDot{0%,100%{opacity:.12}50%{opacity:.9}}
@keyframes svHalo{50%{transform:scale(1.5);opacity:.4}}
@keyframes svType{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes svCaretOff{to{border-right-color:transparent}}
@keyframes svRise{0%{transform:translateY(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateY(-110vh);opacity:0}}
@property --ang{syntax:'<angle>';initial-value:0deg;inherits:false}

`;
