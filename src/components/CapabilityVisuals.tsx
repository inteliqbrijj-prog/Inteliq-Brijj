import { useEffect, useRef } from 'react';

/** Shared mini-canvas helper */
function useCanvasAnim(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      w = p.clientWidth;
      h = p.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = () => {
      t += 0.016;
      if (w && h) draw(ctx, w, h, t);
      raf = requestAnimationFrame(loop);
    };
    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);
  return ref;
}

/** Web platforms — floating UI cards + grid */
export function VisualWeb() {
  const ref = useCanvasAnim((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    // bg
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#0a1f18');
    bg.addColorStop(1, '#0d281f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // grid
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // floating cards
    const cards = [
      { x: 0.12, y: 0.2, ww: 0.42, hh: 0.35, phase: 0 },
      { x: 0.48, y: 0.35, ww: 0.4, hh: 0.4, phase: 1.2 },
      { x: 0.22, y: 0.55, ww: 0.35, hh: 0.28, phase: 2.4 },
    ];
    cards.forEach((c) => {
      const float = Math.sin(t * 1.2 + c.phase) * 4;
      const x = c.x * w;
      const y = c.y * h + float;
      const cw = c.ww * w;
      const ch = c.hh * h;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y, cw, ch, 8);
      ctx.fill();
      ctx.stroke();
      // fake bars
      ctx.fillStyle = 'rgba(52, 211, 153, 0.25)';
      for (let i = 0; i < 4; i++) {
        const bh = 4 + ((i * 7 + Math.sin(t + i) * 3) % 12);
        ctx.fillRect(x + 10 + i * 14, y + ch - 14 - bh, 8, bh);
      }
      ctx.fillStyle = 'rgba(167, 243, 208, 0.4)';
      ctx.fillRect(x + 10, y + 12, cw * 0.4, 4);
      ctx.fillStyle = 'rgba(52, 211, 153, 0.15)';
      ctx.fillRect(x + 10, y + 22, cw * 0.55, 3);
    });
  });
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/** Mobile — phone frame with animated screen */
export function VisualMobile() {
  const ref = useCanvasAnim((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#0c1a15');
    bg.addColorStop(1, '#102820');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // phone body
    const pw = Math.min(w * 0.38, 90);
    const ph = pw * 1.85;
    const px = w * 0.5 - pw / 2;
    const py = h * 0.5 - ph / 2 + Math.sin(t) * 3;

    ctx.fillStyle = 'rgba(15, 30, 24, 0.95)';
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, 14);
    ctx.fill();
    ctx.stroke();

    // screen
    const inset = 6;
    ctx.fillStyle = 'rgba(6, 20, 14, 0.9)';
    ctx.beginPath();
    ctx.roundRect(px + inset, py + inset + 8, pw - inset * 2, ph - inset * 2 - 16, 8);
    ctx.fill();

    // animated app icons grid
    const cols = 3;
    const gap = 8;
    const iconSize = (pw - inset * 2 - gap * (cols + 1)) / cols;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < cols; c++) {
        const ix = px + inset + gap + c * (iconSize + gap);
        const iy = py + 28 + r * (iconSize + gap);
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + r + c);
        ctx.fillStyle = `rgba(52, 211, 153, ${0.15 + pulse * 0.25})`;
        ctx.beginPath();
        ctx.roundRect(ix, iy, iconSize, iconSize, 6);
        ctx.fill();
      }
    }

    // notch
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.roundRect(px + pw * 0.3, py + 10, pw * 0.4, 5, 3);
    ctx.fill();
  });
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/** AI — neural network nodes */
export function VisualAI() {
  const ref = useCanvasAnim((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
    bg.addColorStop(0, '#0d241c');
    bg.addColorStop(1, '#081510');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const layers = [4, 6, 5, 3];
    const nodes: { x: number; y: number }[][] = [];
    layers.forEach((count, li) => {
      const col: { x: number; y: number }[] = [];
      const x = w * (0.15 + (li / (layers.length - 1)) * 0.7);
      for (let n = 0; n < count; n++) {
        const y = h * (0.2 + (n / (count - 1 || 1)) * 0.6);
        col.push({ x, y });
      }
      nodes.push(col);
    });

    // connections
    for (let li = 0; li < nodes.length - 1; li++) {
      nodes[li].forEach((a, ai) => {
        nodes[li + 1].forEach((b, bi) => {
          const pulse = 0.08 + 0.12 * Math.sin(t * 2 + ai + bi + li);
          ctx.strokeStyle = `rgba(52, 211, 153, ${pulse})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        });
      });
    }

    // nodes
    nodes.forEach((col, li) => {
      col.forEach((n, ni) => {
        const pulse = 0.6 + 0.4 * Math.sin(t * 2.5 + li + ni);
        const r = 4 + pulse * 2;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
        g.addColorStop(0, `rgba(167, 243, 208, ${0.5 * pulse})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(52, 211, 153, ${0.7 + pulse * 0.3})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  });
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/** Cloud — orbiting nodes around globe hint */
export function VisualCloud() {
  const ref = useCanvasAnim((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#081510');
    bg.addColorStop(1, '#0c2219');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.28;

    // globe ring
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.12)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, R, R * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * 0.35, R, 0, 0, Math.PI * 2);
    ctx.stroke();

    // orbiting satellites
    for (let i = 0; i < 6; i++) {
      const angle = t * 0.6 + (i * Math.PI * 2) / 6;
      const orbitR = R + 18 + (i % 2) * 12;
      const x = cx + Math.cos(angle) * orbitR;
      const y = cy + Math.sin(angle) * orbitR * 0.55;
      ctx.fillStyle = 'rgba(52, 211, 153, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      // link to center
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.12)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // center glow
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.8);
    g.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.8, 0, Math.PI * 2);
    ctx.fill();
  });
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
