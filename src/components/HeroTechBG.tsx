import { useEffect, useRef } from 'react';

/**
 * Floating 3D-style tech shapes + code fragments for hero light/dark overlay.
 * Renders as absolute layer over the video with mix-blend for depth.
 */
export default function HeroTechBG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;

    type Shape = {
      x: number;
      y: number;
      z: number;
      rot: number;
      rotSpeed: number;
      size: number;
      type: 'cube' | 'ring' | 'chip' | 'code';
      label?: string;
      vx: number;
      vy: number;
    };

    const labels = ['React', 'TS', 'API', 'Node', 'AWS', 'SQL', 'CI', 'AI'];
    const shapes: Shape[] = [];

    const init = () => {
      shapes.length = 0;
      for (let i = 0; i < 18; i++) {
        shapes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: 0.3 + Math.random() * 0.7,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          size: 18 + Math.random() * 28,
          type: (['cube', 'ring', 'chip', 'code'] as const)[Math.floor(Math.random() * 4)],
          label: labels[Math.floor(Math.random() * labels.length)],
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    };

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
      init();
    };

    const drawCube = (s: Shape, alpha: number) => {
      const sz = s.size * s.z;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.strokeStyle = `rgba(52, 211, 153, ${alpha * 0.7})`;
      ctx.lineWidth = 1.2;
      ctx.strokeRect(-sz / 2, -sz / 2, sz, sz);
      // inner
      ctx.strokeStyle = `rgba(167, 243, 208, ${alpha * 0.35})`;
      ctx.strokeRect(-sz / 3, -sz / 3, (sz * 2) / 3, (sz * 2) / 3);
      ctx.restore();
    };

    const drawRing = (s: Shape, alpha: number) => {
      const r = (s.size * s.z) / 2;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.65})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.55, 0, Math.PI * 1.4);
      ctx.stroke();
      ctx.restore();
    };

    const drawChip = (s: Shape, alpha: number) => {
      const sz = s.size * s.z;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot * 0.5);
      ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.12})`;
      ctx.strokeStyle = `rgba(52, 211, 153, ${alpha * 0.6})`;
      ctx.lineWidth = 1;
      const rw = sz * 1.4;
      const rh = sz * 0.7;
      ctx.beginPath();
      ctx.roundRect(-rw / 2, -rh / 2, rw, rh, 4);
      ctx.fill();
      ctx.stroke();
      // pins
      for (let i = 0; i < 4; i++) {
        const px = -rw / 2 + 8 + i * ((rw - 16) / 3);
        ctx.fillStyle = `rgba(52, 211, 153, ${alpha * 0.5})`;
        ctx.fillRect(px - 1, -rh / 2 - 4, 2, 4);
        ctx.fillRect(px - 1, rh / 2, 2, 4);
      }
      ctx.restore();
    };

    const drawCode = (s: Shape, alpha: number) => {
      if (!s.label) return;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = alpha * 0.55;
      ctx.font = `${Math.max(10, 11 * s.z)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillStyle = 'rgba(167, 243, 208, 0.9)';
      ctx.fillText(`{ ${s.label} }`, 0, 0);
      ctx.restore();
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy + Math.sin(t + s.x * 0.01) * 0.15;
        s.rot += s.rotSpeed;

        if (s.x < -40) s.x = w + 40;
        if (s.x > w + 40) s.x = -40;
        if (s.y < -40) s.y = h + 40;
        if (s.y > h + 40) s.y = -40;

        const alpha = 0.25 + s.z * 0.55;

        if (s.type === 'cube') drawCube(s, alpha);
        else if (s.type === 'ring') drawRing(s, alpha);
        else if (s.type === 'chip') drawChip(s, alpha);
        else drawCode(s, alpha);
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen', opacity: 0.85 }}
    />
  );
}
