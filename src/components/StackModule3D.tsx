import { useRef, useState, useEffect } from 'react';
import { Palette, Code2, Cloud, Layers, Cpu, Database } from 'lucide-react';

const layers = [
  { icon: Palette, label: 'Design', sub: 'Interfaces & systems', z: 120, tint: 'from-emerald-400/35 to-emerald-600/10', glow: 'shadow-emerald-400/40' },
  { icon: Code2, label: 'Engineering', sub: 'Product & platform', z: 60, tint: 'from-teal-400/35 to-teal-600/10', glow: 'shadow-teal-400/40' },
  { icon: Cloud, label: 'Infrastructure', sub: 'Cloud & delivery', z: 0, tint: 'from-green-400/30 to-green-700/10', glow: 'shadow-green-400/30' },
];

const orbitItems = [
  { icon: Layers, label: 'Architecture', angle: 0 },
  { icon: Cpu, label: 'Runtime', angle: 120 },
  { icon: Database, label: 'Data', angle: 240 },
];

/**
 * Premium interactive 3D stack with orbiting satellites and depth.
 */
export default function StackModule3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const [orbit, setOrbit] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % layers.length);
      setOrbit((o) => o + 1);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -16, y: px * 20 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto w-full max-w-[340px] aspect-square select-none"
      style={{ perspective: '1400px' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-[15%] rounded-full bg-emerald-500/15 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute inset-[25%] rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

      {/* Orbiting satellites */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ transform: `rotate(${orbit * 40}deg)` }}
      >
        {orbitItems.map((item) => {
          const Icon = item.icon;
          const rad = (item.angle * Math.PI) / 180;
          const r = 42; // %
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          return (
            <div
              key={item.label}
              className="absolute w-10 h-10 -ml-5 -mt-5 rounded-xl liquid-glass-dark border border-emerald-500/20 flex items-center justify-center shadow-lg"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `rotate(${-orbit * 40}deg)`,
              }}
              title={item.label}
            >
              <Icon size={14} className="text-emerald-300" strokeWidth={1.75} />
            </div>
          );
        })}
      </div>

      {/* Main 3D stack */}
      <div
        className="absolute inset-[12%] preserve-3d transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${22 + tilt.x}deg) rotateY(${-28 + tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          const isActive = active === i;
          return (
            <div
              key={layer.label}
              className="absolute left-[8%] right-[8%] top-[36%] h-[24%] transition-all duration-700"
              style={{
                transform: `translateZ(${layer.z}px) ${isActive ? 'scale(1.04)' : 'scale(1)'}`,
                transformStyle: 'preserve-3d',
                zIndex: layers.length - i,
              }}
            >
              <div
                className={`w-full h-full rounded-2xl border backdrop-blur-md flex items-center px-4 gap-3 transition-all duration-500
                  bg-gradient-to-br ${layer.tint}
                  ${isActive ? 'border-emerald-400/50 shadow-xl ' + layer.glow : 'border-white/15 shadow-lg shadow-black/40'}
                `}
                style={{
                  animation: `stack-float 5.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.35}s`,
                }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-500
                    ${isActive ? 'bg-emerald-400/25 border-emerald-300/40' : 'bg-white/10 border-white/20'}
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-emerald-200' : 'text-white/80'} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold tracking-tight leading-none mb-1">{layer.label}</p>
                  <p className="text-white/50 text-[11px] leading-none">{layer.sub}</p>
                </div>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </div>
            </div>
          );
        })}

        {/* Ground plane */}
        <div
          className="absolute left-[5%] right-[5%] top-[78%] h-[16%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.28), transparent 70%)',
            transform: 'translateZ(-50px) rotateX(90deg)',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* Hint */}
      <p className="absolute -bottom-2 left-0 right-0 text-center text-slate-500 text-[10px] tracking-[0.2em] uppercase">
        Interactive · hover to tilt
      </p>
    </div>
  );
}
