import { PenLine } from 'lucide-react';
import { techStack, values } from '../data';
import { useInView } from '../hooks/useInView';
import { CTASection } from '../components/Shared';

export default function Insights() {
  const headerView = useInView(0.15);

  return (
    <div>
      <section className="relative pt-40 pb-24 sm:pb-28 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-600 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div
            ref={headerView.ref}
            className={`max-w-2xl mb-16 transition-all duration-700 ${
              headerView.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Insights</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-5">
              Modern stack. Timeless craft.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              We choose tools that age well — TypeScript, proven frameworks and cloud-native patterns — while never losing sight of product quality, accessibility and long-term maintainability. These are the principles behind every decision we make.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="grid grid-cols-2 gap-4">
                {values.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-slate-300 liquid-glass rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-emerald-400" />
                    </div>
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="mt-10 liquid-glass rounded-2xl p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                  <PenLine size={18} className="text-white" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1.5">Long-form articles are coming</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We're writing up the technical decisions and trade-offs behind our early projects. First posts land once we have real engagements to draw from — no filler content in the meantime.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-sm font-medium tracking-wide uppercase mb-4">Our toolkit</p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-emerald-500/40 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
