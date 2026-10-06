import { useEffect, useRef, useState } from 'react';

/**
 * Phase 1 — ambient video plays THROUGH the InteliBrijj letters (screen-blend mask)
 * Phase 2 — scroll zooms text away → brand reel centered on white
 */
const TEXT_VIDEO_SRC =
  'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4';
const TEXT_VIDEO_FALLBACK =
  'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4';
const BRAND_VIDEO_SRC = '/inteli-brijj-reel.mp4';

export default function VideoTextReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const textVideoRef = useRef<HTMLVideoElement>(null);
  const brandVideoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Keep both videos playing
  useEffect(() => {
    const textV = textVideoRef.current;
    const brandV = brandVideoRef.current;

    const tryPlay = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.muted = true;
      const p = v.play();
      if (p) p.catch(() => {});
    };

    tryPlay(textV);
    tryPlay(brandV);

    const onVis = () => {
      if (document.visibilityState === 'visible') {
        tryPlay(textV);
        tryPlay(brandV);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      if (reducedRef.current) {
        setProgress(0);
        return;
      }
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / total)));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const zoomStart = 0.18;
  const zoomEnd = 0.78;
  const t =
    progress <= zoomStart
      ? 0
      : progress >= zoomEnd
        ? 1
        : (progress - zoomStart) / (zoomEnd - zoomStart);
  const ease = t * t * (3 - 2 * t);

  const textScale = 1 + ease * 2.1;
  const textOpacity = 1 - ease;
  // White mask must stay fully opaque while text is visible so blend works
  const maskActive = ease < 0.98;
  const brandOpacity = ease;
  // Ambient stays full strength under the mask until text is nearly gone
  const ambientVisible = ease < 0.95;

  const reduced = reducedRef.current;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: reduced ? 'auto' : 'min(240vh, 1800px)' }}
      aria-label="InteliBrijj experience"
    >
      <div
        className={
          reduced ? 'relative bg-white overflow-hidden' : 'sticky top-0 bg-white overflow-hidden'
        }
        style={{ height: reduced ? 'min(480px, 70svh)' : '100svh' }}
      >
        {/* ========== LAYER 1: Ambient video (shows through letters) ========== */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ambientVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
            zIndex: 1,
          }}
        >
          <video
            ref={textVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
          >
            <source src={TEXT_VIDEO_SRC} type="video/mp4" />
            <source src={TEXT_VIDEO_FALLBACK} type="video/mp4" />
          </video>
        </div>

        {/* ========== LAYER 2: Brand video (after text zooms out) ========== */}
        <div
          className="absolute inset-0 z-[2] flex items-center justify-center px-5 sm:px-10 bg-white"
          style={{
            opacity: brandOpacity,
            pointerEvents: brandOpacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{
              maxWidth: 'min(880px, 92vw)',
              aspectRatio: '16 / 9',
              background: '#fff',
              boxShadow:
                brandOpacity > 0.2
                  ? '0 20px 50px rgba(15,23,42,0.12), 0 0 0 1px rgba(15,23,42,0.06)'
                  : 'none',
            }}
          >
            <video
              ref={brandVideoRef}
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={BRAND_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        </div>

        {/* ========== LAYER 3: White + black text = video only in letters ==========
            mix-blend-mode: screen → black type reveals video, white stays white */}
        {maskActive && (
          <div
            className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-4 pointer-events-none"
            style={{
              background: `rgb(255, 255, 255)`,
              mixBlendMode: 'screen',
              opacity: textOpacity > 0.02 ? 1 : 0,
            }}
          >
            <p
              className="text-[11px] sm:text-sm font-medium tracking-[0.35em] uppercase mb-3 sm:mb-5"
              style={{
                /* mid-gray still reveals some video under screen blend */
                color: '#4b5563',
                opacity: Math.max(0, 1 - ease * 1.3),
                transform: `scale(${1 + ease * 0.25})`,
              }}
            >
              Experience
            </p>
            <h2
              className="font-bold tracking-[-0.04em] leading-none text-center select-none will-change-transform"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 11vw, 7rem)',
                /* pure black is required for screen-blend knock-out */
                color: '#000000',
                transform: `scale(${textScale})`,
                opacity: textOpacity,
              }}
            >
              InteliBrijj
            </h2>
          </div>
        )}

        {!reduced && progress < 0.06 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400">
              Scroll
            </span>
            <span
              className="w-px h-6"
              style={{ background: 'linear-gradient(180deg, #10b981, transparent)' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
