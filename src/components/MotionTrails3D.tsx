import { useEffect, useRef } from 'react';

/**
 * Custom 3D-style motion trails / particle field for the CTA.
 * Pure canvas — no external Spline dependency.
 */
export default function MotionTrails3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let mouse = { x: 0.5, y: 0.5 };

    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      hue: number;
    }[] = [];

    const trails: { x: number; y: number; alpha: number }[][] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      const count = 3;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 1,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          life: 0,
          maxLife: 80 + Math.random() * 120,
          size: 1.5 + Math.random() * 3,
          hue: 145 + Math.random() * 30,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(6, 12, 10, 0.18)';
      ctx.fillRect(0, 0, w, h);

      // subtle grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
      ctx.lineWidth = 1;
      const grid = 48;
      for (let x = 0; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (particles.length < 90) spawn();

      // mouse attraction influence
      const mx = mouse.x * w;
      const my = mouse.y * h;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        p.vx += (dx / dist) * 0.015;
        p.vy += (dy / dist) * 0.015;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        const t = p.life / p.maxLife;
        const alpha = t < 0.15 ? t / 0.15 : t > 0.7 ? (1 - t) / 0.3 : 1;
        const scale = 0.6 + p.z * 0.8;

        // trail
        if (!trails[i]) trails[i] = [];
        trails[i].push({ x: p.x, y: p.y, alpha: alpha * 0.5 });
        if (trails[i].length > 14) trails[i].shift();

        ctx.beginPath();
        for (let j = 0; j < trails[i].length; j++) {
          const tr = trails[i][j];
          const a = (j / trails[i].length) * tr.alpha * 0.6;
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 55%, ${a})`;
          ctx.lineWidth = (p.size * scale * j) / trails[i].length;
          if (j === 0) ctx.moveTo(tr.x, tr.y);
          else ctx.lineTo(tr.x, tr.y);
        }
        ctx.stroke();

        // core glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * scale * 4);
        g.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${alpha * 0.9})`);
        g.addColorStop(0.4, `hsla(${p.hue}, 80%, 50%, ${alpha * 0.35})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * scale * 4, 0, Math.PI * 2);
        ctx.fill();

        if (p.life > p.maxLife || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          particles.splice(i, 1);
          trails.splice(i, 1);
        }
      }

      // connecting lines between nearby particles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            const alpha = (1 - d / 120) * 0.15;
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
            ctx.beginPath();
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
    canvas.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
