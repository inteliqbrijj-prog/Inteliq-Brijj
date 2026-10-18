import { useEffect, useRef } from 'react';

/** Subtle animated tech/AI background for light panels */
export default function PanelTechBG({ variant = 'arch' }: { variant?: 'arch' | 'growth' | 'nodes' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let running = true;

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const particles: P[] = [];

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
      particles.length = 0;
      for (let i = 0; i < 22; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.2,
          r: 1 + Math.random() * 1.8,
          a: 0.15 + Math.random() * 0.35,
        });
      }
    };

    const draw = () => {
      if (!running) return;
      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      // soft top-down green wash
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, 'rgba(16,185,129,0.07)');
      g.addColorStop(0.45, 'rgba(16,185,129,0.02)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      if (variant === 'arch') {
        // floating rounded rects
        for (let i = 0; i < 4; i++) {
          const x = w * 0.55 + Math.sin(t * 0.4 + i) * 12 + i * 18;
          const y = h * 0.2 + i * 28 + Math.cos(t * 0.35 + i) * 6;
          const rw = 48 + i * 8;
          const rh = 36 + i * 4;
          ctx.strokeStyle = `rgba(16,185,129,${0.12 + i * 0.03})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(x, y, rw, rh, 10);
          ctx.stroke();
          ctx.fillStyle = `rgba(16,185,129,${0.03 + i * 0.01})`;
          ctx.fill();
        }
        // connection
        ctx.strokeStyle = 'rgba(16,185,129,0.12)';
        ctx.beginPath();
        ctx.moveTo(w * 0.62, h * 0.28);
        ctx.lineTo(w * 0.72, h * 0.42);
        ctx.lineTo(w * 0.68, h * 0.55);
        ctx.stroke();
      } else if (variant === 'growth') {
        // rising arcs + dots
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16,185,129,${0.15 - i * 0.03})`;
          ctx.lineWidth = 1.2;
          const y0 = h * 0.75;
          ctx.moveTo(w * 0.5, y0);
          ctx.quadraticCurveTo(w * (0.65 + i * 0.05), h * (0.4 - i * 0.05), w * (0.85 + i * 0.02), h * (0.22 + i * 0.06));
          ctx.stroke();
        }
      } else {
        // node grid pulse
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const x = w * 0.55 + j * 28;
            const y = h * 0.25 + i * 28;
            const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + i + j);
            ctx.beginPath();
            ctx.fillStyle = `rgba(16,185,129,${0.2 * pulse})`;
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(16,185,129,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // links between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 70) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16,185,129,${0.08 * (1 - d / 70)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
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
  }, [variant]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
