import { useEffect, useRef, useState } from 'react';
import { Code2, Target, Cloud, Eye, type LucideIcon } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const items: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'Full-stack', label: 'Product ownership', icon: Code2 },
  { value: 'Founder-led', label: 'Direct collaboration', icon: Target },
  { value: 'Production', label: 'Ready architecture', icon: Cloud },
  { value: 'Transparent', label: 'Weekly demos', icon: Eye },
];

export default function MetricsStrip() {
  const { ref, inView } = useInView(0.2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActiveIdx((a) => (a + 1) % items.length), 3200);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    let running = true;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.length = 0;
      for (let i = 0; i < 24; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.22,
        });
      }
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 95) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16,185,129,${0.09 * (1 - d / 95)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(16,185,129,0.3)';
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
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

  return (
    <section
      className="section-frame relative py-14 sm:py-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #e4ebe8 0%, #f0f3f1 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 25%, rgba(228,235,232,0.75) 100%)',
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {items.map((m, i) => {
          const Icon = m.icon;
          const isActive = inView && activeIdx === i;
          return (
            <div
              key={m.label}
              className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-500"
              style={{
                transform: isActive ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                background: isActive
                  ? 'linear-gradient(160deg, #ffffff 0%, #eef8f4 100%)'
                  : 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(244,248,246,0.98) 100%)',
                border: isActive
                  ? '1px solid rgba(16,185,129,0.4)'
                  : '1px solid rgba(15,23,42,0.06)',
                boxShadow: isActive
                  ? '0 14px 36px rgba(16,185,129,0.14), 0 4px 12px rgba(15,23,42,0.06)'
                  : '0 4px 16px rgba(15,23,42,0.04)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 transition-transform duration-500"
                style={{
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(16,185,129,0.08))'
                    : 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                <Icon size={17} className="text-emerald-600" strokeWidth={1.75} />
              </div>
              <p
                className="text-[17px] sm:text-[18px] font-semibold tracking-[-0.03em] text-slate-900 mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {m.value}
              </p>
              <p className="text-emerald-600 text-xs sm:text-[13px] font-medium">{m.label}</p>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-500"
                style={{
                  opacity: isActive ? 1 : 0,
                  background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                  boxShadow: '0 0 12px rgba(16,185,129,0.4)',
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
