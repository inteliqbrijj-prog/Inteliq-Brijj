import { Layers } from 'lucide-react';
import { capabilities } from '../data';
import { useInView } from '../hooks/useInView';
import { CTASection } from '../components/Shared';

export default function Work() {
  const headerView = useInView(0.15);
  const gridView = useInView(0.05);

  return (
    <div>
      <section className="relative pt-40 pb-24 sm:pb-32 section-glow">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={headerView.ref}
            className={`max-w-2xl mb-14 transition-all duration-700 ${
              headerView.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-3">What we build</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 mb-5">
              The kind of products we're built to deliver
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              As a newly founded studio, our focus right now is on the founding engagements that will become our first case studies. Here's the shape of work we're set up to execute well.
            </p>
          </div>

          <div ref={gridView.ref} className="grid lg:grid-cols-3 gap-6">
            {capabilities.map((item, i) => (
              <article
                key={item.title}
                className={`reveal-3d group relative overflow-hidden rounded-2xl liquid-glass-light card-3d ${
                  gridView.inView ? 'in-view' : ''
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`h-40 bg-gradient-to-br ${item.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <Layers size={26} className="text-slate-700" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium text-emerald-600 tracking-wide mb-1">{item.category}</p>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 liquid-glass-light rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <p className="text-slate-600 text-sm leading-relaxed">
              Want to be one of our first partnerships? Early collaborators get closer collaboration with our founding team and pricing that reflects it.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
