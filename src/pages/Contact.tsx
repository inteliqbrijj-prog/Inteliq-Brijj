import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { BRAND_EMAIL, BRAND_NAME } from '../data';
import { useInView } from '../hooks/useInView';
import { FloatingOrbs } from '../components/Shared';

export default function Contact() {
  const heroView = useInView(0.12);
  const formView = useInView(0.08);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Demo submit — opens mailto as fallback for production readiness
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const company = String(data.get('company') || '');
    const message = String(data.get('message') || '');
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`
    );
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      window.location.href = `mailto:${BRAND_EMAIL}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <div className="bg-[#fbfcfb] min-h-screen">
      <section className="relative pt-32 sm:pt-40 pb-10 sm:pb-14 section-glow overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative">
          <div
            ref={heroView.ref}
            className={`max-w-2xl transition-all duration-700 ${
              heroView.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-emerald-600 text-sm font-semibold tracking-[0.18em] uppercase mb-3">
              Contact
            </p>
            <h1
              className="text-[2.1rem] sm:text-[2.75rem] lg:text-[3.1rem] font-semibold tracking-[-0.03em] text-slate-900 mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tell us what you want to build
            </h1>
            <p className="text-slate-500 text-[16px] leading-[1.7]">
              Share a short brief. We typically respond within one business day with a clear
              next step — no generic pitch decks.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div
            ref={formView.ref}
            className={`grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 transition-all duration-700 ${
              formView.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Info column */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
                <h2
                  className="text-[17px] font-semibold text-slate-900 mb-5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Reach {BRAND_NAME}
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Mail size={15} className="text-emerald-600" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold tracking-wide uppercase text-slate-400 mb-0.5">
                        Email
                      </p>
                      <a
                        href={`mailto:${BRAND_EMAIL}`}
                        className="text-[14px] font-medium text-slate-800 hover:text-emerald-700 transition-colors"
                      >
                        {BRAND_EMAIL}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <MapPin size={15} className="text-emerald-600" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold tracking-wide uppercase text-slate-400 mb-0.5">
                        Location
                      </p>
                      <p className="text-[14px] font-medium text-slate-800">
                        Jaipur · Serving across India
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Phone size={15} className="text-emerald-600" />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold tracking-wide uppercase text-slate-400 mb-0.5">
                        Call
                      </p>
                      <p className="text-[14px] font-medium text-slate-800">
                        Available on request
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-6 sm:p-7">
                <p className="text-[13px] font-semibold text-emerald-800 mb-2">
                  What happens next
                </p>
                <ol className="space-y-2.5 text-[13.5px] text-slate-600">
                  {[
                    'We review your brief and goals.',
                    'You receive a clear response within one business day.',
                    'If it is a fit, we propose scope, timeline and next steps.',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[11px] font-bold text-emerald-600 mt-0.5">
                        0{i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.1)]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <span className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                    <CheckCircle2 size={28} className="text-emerald-600" />
                  </span>
                  <h3
                    className="text-[1.25rem] font-semibold text-slate-900 mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Message ready
                  </h3>
                  <p className="text-[14px] text-slate-500 max-w-sm">
                    Your email client should open with the enquiry. If it did not, write to{' '}
                    <a href={`mailto:${BRAND_EMAIL}`} className="text-emerald-700 font-medium">
                      {BRAND_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="text-[12px] font-semibold text-slate-600 mb-1.5 block">
                        Name *
                      </span>
                      <input
                        name="name"
                        required
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[12px] font-semibold text-slate-600 mb-1.5 block">
                        Email *
                      </span>
                      <input
                        name="email"
                        required
                        type="email"
                        placeholder="you@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-[12px] font-semibold text-slate-600 mb-1.5 block">
                      Company
                    </span>
                    <input
                      name="company"
                      type="text"
                      placeholder="Organisation (optional)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[12px] font-semibold text-slate-600 mb-1.5 block">
                      Project brief *
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="What are you building? Goals, timeline, or any constraints help us respond faster."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all resize-y min-h-[120px]"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[14px] font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-70 transition-all"
                  >
                    {sending ? (
                      'Preparing…'
                    ) : (
                      <>
                        <Send size={15} />
                        Send enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
