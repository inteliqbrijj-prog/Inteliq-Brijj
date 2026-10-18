import { useEffect, useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

// NOTE: Placeholder testimonials — swap these for real client quotes before launch.
const testimonials = [
  {
    quote:
      'Inteliq Brijj rebuilt our platform from the ground up without ever slowing the business down. Weekly demos meant we always knew exactly where things stood.',
    name: 'Founder',
    role: 'B2B SaaS Platform',
  },
  {
    quote:
      'What stood out was ownership — no hand-offs, no diluted context. The team that scoped the work is the same team that shipped it, end to end.',
    name: 'Operations Lead',
    role: 'D2C Commerce Brand',
  },
  {
    quote:
      'They treated our growth targets as engineering requirements, not an afterthought. The SEO and product work finally moved in the same direction.',
    name: 'Product Lead',
    role: 'Fintech Startup',
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView(0.15);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setDir('next');
      setActive((a) => (a + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, [inView]);

  const go = (next: boolean) => {
    setDir(next ? 'next' : 'prev');
    setActive((a) => (next ? (a + 1) % testimonials.length : (a - 1 + testimonials.length) % testimonials.length));
  };

  return (
    <section className="relative section-pad overflow-hidden bg-[#fbfcfb]" style={{ background: 'linear-gradient(180deg, #f0f3f1 0%, #fbfcfb 100%)' }}>
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute inset-0 light-orbs pointer-events-none overflow-hidden">
        <div className="orb w-[28rem] h-[28rem] bg-emerald-300/12 top-0 right-0" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto px-6 relative">
        <div className={`max-w-xl mx-auto text-center mb-12 sm:mb-14 reveal-up ${inView ? 'in-view' : ''}`}>
          <p className="type-label text-emerald-600 mb-3">Client Voices</p>
          <h2 className="type-h2 text-slate-900">Client Outcomes and Partnership Feedback</h2>
        </div>

        <div className={`reveal-up ${inView ? 'in-view' : ''}`} style={{ perspective: '1600px', transitionDelay: '100ms' }}>
          <div
            className="relative mx-auto max-w-3xl rounded-[28px] px-7 sm:px-12 py-10 sm:py-12 overflow-hidden"
            style={{
              background: 'linear-gradient(165deg, #ffffff 0%, #f5f9f7 100%)',
              border: '1px solid rgba(15,23,42,0.07)',
              boxShadow: '0 30px 70px -18px rgba(16,185,129,0.16), 0 12px 30px rgba(15,23,42,0.06)',
              minHeight: 300,
            }}
          >
            <Quote size={64} className="absolute top-6 right-7 text-emerald-500/10" />

            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              <div
                key={active}
                className="relative"
                style={{
                  animation: `${dir === 'next' ? 'testimonial-in-next' : 'testimonial-in-prev'} 0.6s cubic-bezier(0.16,1,0.3,1) both`,
                }}
              >
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-emerald-500 fill-emerald-500" />
                  ))}
                </div>
                <p className="text-[14.5px] sm:text-[15.5px] leading-[1.65] text-slate-700 font-medium tracking-[-0.01em] mb-6 min-h-[90px] sm:min-h-[80px]">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
                    style={{ background: 'linear-gradient(135deg, #10b981, #0d9488)', boxShadow: '0 6px 16px rgba(16,185,129,0.3)' }}
                  >
                    {testimonials[active].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-slate-900 tracking-[-0.01em]">{testimonials[active].name}</p>
                    <p className="text-[12.5px] text-slate-500">{testimonials[active].role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* nav */}
            <div className="relative flex items-center justify-between mt-9 pt-6" style={{ borderTop: '1px solid rgba(15,23,42,0.06)' }}>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDir(i > active ? 'next' : 'prev');
                      setActive(i);
                    }}
                    className="h-1.5 rounded-full transition-all duration-400 outline-none"
                    style={{
                      width: active === i ? '22px' : '7px',
                      background: active === i ? '#10b981' : 'rgba(15,23,42,0.14)',
                    }}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-300 shadow-sm outline-none"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={() => go(true)}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-300 shadow-sm outline-none"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
