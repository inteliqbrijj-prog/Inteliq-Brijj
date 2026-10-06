import { useEffect, useRef, useState, useCallback } from 'react';
import { Palette, Code2, Cloud, Cpu } from 'lucide-react';

/**
 * Flagship computational architecture visualization.
 * Canvas particle system + CSS 3D glass layers with tilt inertia.
 * Cinematic emerald/black aesthetic — restrained, premium, 60fps.
 */
export default function FlowStack3D({ light = false }: { light?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const reducedMotion = useRef(false);
  const textPrimary = light ? '#0a0f0d' : '#F5F7F6';
  const textMuted = light ? '#334155' : 'rgba(141,154,154,0.9)';
  const cardBg = light
    ? 'linear-gradient(135deg, #ffffff 0%, #e8f5ef 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(5,9,7,0.65) 100%)';
  const cardBgActive = light
    ? 'linear-gradient(135deg, rgba(16,185,129,0.22) 0%, #ffffff 100%)'
    : 'linear-gradient(135deg, rgba(25,211,162,0.14) 0%, rgba(5,9,7,0.75) 100%)';
  const cardBorder = light ? 'rgba(5,150,105,0.2)' : 'rgba(255, 255, 255, 0.06)';
  const cardBorderActive = light ? 'rgba(5,150,105,0.65)' : 'rgba(25, 211, 162, 0.45)';


  const layers = [
    { icon: Palette, label: 'Design', sub: 'Interfaces & systems', color: '#19D3A2' },
    { icon: Code2, label: 'Engineering', sub: 'Product & platform', color: '#2dd4bf' },
    { icon: Cloud, label: 'Infrastructure', sub: 'Cloud & delivery', color: '#34d399' },
    { icon: Cpu, label: 'Intelligence', sub: 'AI & automation', color: '#6ee7b7' },
  ];

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const id = setInterval(() => setActive((a) => (a + 1) % layers.length), 3200);
    return () => clearInterval(id);
  }, [layers.length]);

  // Smooth tilt spring
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const k = 0.08;
      tiltCurrent.current.x += (tiltTarget.current.x - tiltCurrent.current.x) * k;
      tiltCurrent.current.y += (tiltTarget.current.y - tiltCurrent.current.y) * k;
      setTilt({
        x: tiltCurrent.current.x,
        y: tiltCurrent.current.y,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let running = true;

    type Node = {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
    };
    type Stream = {
      progress: number;
      speed: number;
      path: number;
      size: number;
      alpha: number;
      life: number;
    };

    const nodes: Node[] = [];
    const streams: Stream[] = [];

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes.length = 0;
      const count = reducedMotion.current ? 6 : 18;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: w * (0.12 + Math.random() * 0.76),
          y: h * (0.1 + Math.random() * 0.8),
          z: 0.3 + Math.random() * 0.7,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.1,
          r: 0.9 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const pathPoint = (pathIdx: number, p: number) => {
      const cx = w * 0.5;
      const spread = w * 0.18;
      const offset = (pathIdx - 1.5) * (spread / 1.6);
      const y = h * 0.06 + p * h * 0.88;
      const wave = Math.sin(p * Math.PI * 2.4 + pathIdx * 0.9 + t * 0.15) * (w * 0.04);
      const x = cx + offset + wave * (1 - Math.abs(p - 0.5) * 1.2);
      return { x, y };
    };

    const spawnStream = () => {
      if (streams.length > (reducedMotion.current ? 18 : 42)) return;
      streams.push({
        progress: Math.random() * 0.1,
        speed: 0.0022 + Math.random() * 0.0038,
        path: Math.floor(Math.random() * 4),
        size: 1.1 + Math.random() * 2.0,
        alpha: 0.3 + Math.random() * 0.5,
        life: 1,
      });
    };

    const draw = () => {
      if (!running) return;
      t += 0.014;
      ctx.clearRect(0, 0, w, h);

      const core = ctx.createRadialGradient(w * 0.5, h * 0.48, 0, w * 0.5, h * 0.48, w * 0.55);
      core.addColorStop(0, 'rgba(25, 211, 162, 0.09)');
      core.addColorStop(0.4, 'rgba(25, 211, 162, 0.03)');
      core.addColorStop(1, 'transparent');
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      const haze = ctx.createRadialGradient(w * 0.35, h * 0.3, 0, w * 0.35, h * 0.3, w * 0.4);
      haze.addColorStop(0, 'rgba(25, 211, 162, 0.04)');
      haze.addColorStop(1, 'transparent');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      for (let r = 0; r < 3; r++) {
        const radiusX = Math.min(w, h) * (0.2 + r * 0.11);
        const radiusY = radiusX * 0.32;
        ctx.beginPath();
        ctx.ellipse(w / 2, h * 0.48, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(25, 211, 162, ${0.045 + r * 0.018})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (!reducedMotion.current) {
          const angle = t * (0.28 + r * 0.12) + r * 1.2;
          const ox = w / 2 + Math.cos(angle) * radiusX;
          const oy = h * 0.48 + Math.sin(angle) * radiusY;
          const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 6);
          g.addColorStop(0, `rgba(167, 243, 208, ${0.4 - r * 0.08})`);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(ox, oy, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let path = 0; path < 4; path++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(25, 211, 162, ${0.04 + path * 0.012})`;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 50; i++) {
          const pt = pathPoint(path, i / 50);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      if (!reducedMotion.current && Math.random() < 0.32) spawnStream();

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];
        s.progress += s.speed;
        if (s.progress > 1.06) {
          streams.splice(i, 1);
          continue;
        }
        const pt = pathPoint(s.path, Math.min(s.progress, 1));
        const fade =
          s.progress < 0.06
            ? s.progress / 0.06
            : s.progress > 0.9
              ? (1 - s.progress) / 0.1
              : 1;

        for (let k = 0; k < 8; k++) {
          const tp = Math.max(0, s.progress - k * 0.016);
          const tpt = pathPoint(s.path, tp);
          const a = fade * s.alpha * (1 - k / 8) * 0.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(25, 211, 162, ${a})`;
          ctx.lineWidth = s.size * (1 - k / 10);
          const prev = pathPoint(s.path, Math.max(0, s.progress - (k - 1) * 0.016));
          if (k === 0) {
            ctx.moveTo(tpt.x, tpt.y);
            ctx.lineTo(tpt.x, tpt.y);
          } else {
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(tpt.x, tpt.y);
          }
          ctx.stroke();
        }

        const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, s.size * 5);
        glow.addColorStop(0, `rgba(167, 243, 208, ${fade * s.alpha * 0.9})`);
        glow.addColorStop(0.4, `rgba(25, 211, 162, ${fade * s.alpha * 0.3})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, s.size * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        if (!reducedMotion.current) {
          n.x += n.vx;
          n.y += n.vy;
        }
        n.phase += 0.03;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(25, 211, 162, ${0.08 * (1 - dist / 85) * Math.min(a.z, b.z)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = 0.55 + 0.45 * Math.sin(n.phase);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4.5);
        g.addColorStop(0, `rgba(110, 231, 183, ${0.35 * pulse * n.z})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(245, 247, 246, ${0.45 + 0.35 * pulse})`;
        ctx.arc(n.x, n.y, n.r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(25, 211, 162, 0.12)';
      ctx.font = '9px ui-monospace, monospace';
      ctx.fillText('SYS.01', 12, 18);
      ctx.fillText('STACK', w - 42, h - 14);

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el || reducedMotion.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltTarget.current = { x: py * -14, y: px * 18 };
  }, []);

  const handleLeave = useCallback(() => {
    tiltTarget.current = { x: 0, y: 0 };
    setHovered(null);
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full max-w-[400px] mx-auto aspect-[4/5] select-none"
      style={{ perspective: '1400px' }}
    >
      <div
        className="absolute -inset-4 rounded-[2rem] pointer-events-none opacity-60"
        style={{
          background: light
            ? 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(5,150,105,0.18), transparent 70%)'
            : 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(25,211,162,0.12), transparent 70%)',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
        style={light ? { opacity: 0.9 } : undefined}
      />

      <div className={`absolute inset-0 rounded-2xl pointer-events-none ${light ? 'bg-gradient-to-b from-transparent via-transparent to-[#fbfcfb]/40' : 'bg-gradient-to-b from-transparent via-transparent to-[#030706]/50'}`} />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 sm:px-8"
        style={{
          transform: `rotateX(${5 + tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'none',
        }}
      >
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          const isActive = active === i || hovered === i;
          const isDimmed = hovered !== null && hovered !== i;
          const z = (layers.length - 1 - i) * 36;
          const yOffset = (i - 1.5) * 2;

          return (
            <div
              key={layer.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="w-full max-w-[280px] rounded-2xl px-4 py-3.5 flex items-center gap-3.5 cursor-default"
              style={{
                transform: `translateZ(${z}px) translateY(${isActive ? -6 + yOffset : yOffset}px) scale(${isActive ? 1.06 : 1})`,
                transformStyle: 'preserve-3d',
                opacity: isDimmed ? 0.45 : 1,
                background: isActive ? cardBgActive : cardBg,
                border: isActive ? `1px solid ${cardBorderActive}` : `1px solid ${cardBorder}`,
                boxShadow: isActive
                  ? light
                    ? '0 0 36px rgba(16,185,129,0.35), 0 14px 32px rgba(5,150,105,0.18), inset 0 1px 0 rgba(255,255,255,0.9)'
                    : '0 0 40px rgba(25,211,162,0.22), 0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
                  : light
                    ? '0 8px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)'
                    : '0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition:
                  'transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: isActive
                    ? light ? 'rgba(16, 185, 129, 0.15)' : 'rgba(25, 211, 162, 0.22)'
                    : light ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive
                    ? light ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(25, 211, 162, 0.4)'
                    : light ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isActive ? (light ? '0 0 12px rgba(16,185,129,0.2)' : '0 0 16px rgba(25,211,162,0.25)') : 'none',
                  transition: 'all 0.45s ease',
                }}
              >
                <Icon
                  size={15}
                  style={{
                    color: isActive ? layer.color : (light ? '#475569' : 'rgba(245,247,246,0.5)'),
                    transition: 'color 0.4s ease',
                  }}
                  strokeWidth={1.7}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-[13px] font-semibold tracking-[-0.02em] truncate"
                  style={{ color: textPrimary }}
                >
                  {layer.label}
                </p>
                <p
                  className="text-[10px] tracking-wide truncate mt-0.5"
                  style={{ color: textMuted }}
                >
                  {layer.sub}
                </p>
              </div>
              {isActive && (
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: '#19D3A2',
                    boxShadow: '0 0 10px rgba(25,211,162,0.9)',
                    animation: 'soft-pulse 2.4s ease-in-out infinite',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <p
        className="absolute bottom-2.5 left-0 right-0 text-center text-[9px] tracking-[0.22em] uppercase font-medium"
        style={{ color: light ? '#475569' : 'rgba(141,154,154,0.55)' }}
      >
        Live computation · hover to tilt
      </p>
    </div>
  );
}
