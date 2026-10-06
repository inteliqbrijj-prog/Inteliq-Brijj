import { Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_EMAIL } from '../data';

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-32 right-[12%] w-96 h-96 rounded-full bg-teal-400/15 blur-3xl animate-float-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-green-400/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '0.8s' }} />
    </div>
  );
}

/**
 * Compact professional CTA — pure white & green.
 */
export function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-emerald-100"
      style={{ background: 'linear-gradient(165deg, #fbfcfb 0%, #f0f7f4 50%, #ffffff 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 70% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 70% 50%, black 20%, transparent 75%)',
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 68%)',
            filter: 'blur(8px)',
          }}
        />
        <div
          className="absolute left-[20%] -bottom-24 w-64 h-64 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(52,211,153,0.12), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 sm:py-16 lg:py-18">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-100 shadow-sm text-emerald-600 text-[10px] font-medium mb-4 tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Let&apos;s build
          </div>
          <h2 className="type-h2 text-slate-900 mb-3">
            What can we help you{' '}
            <span className="text-gradient-animated">achieve</span>?
          </h2>
          <p className="text-slate-500 text-[14px] sm:text-[15px] leading-[1.65] mb-7 max-w-md tracking-[-0.01em]">
            Tell us about your product vision. We&apos;ll respond within one business day with a clear path forward — no fluff, just a concrete plan.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={`mailto:${BRAND_EMAIL}`}
              className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-full btn-shine inline-flex items-center gap-2"
            >
              <Mail size={15} />
              {BRAND_EMAIL}
            </a>
            <Link
              to="/services"
              className="bg-white border border-emerald-200 text-emerald-700 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
            >
              View capabilities
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
