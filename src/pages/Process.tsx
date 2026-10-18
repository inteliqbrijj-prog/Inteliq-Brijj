import { processSteps } from '../data';
import { useInView } from '../hooks/useInView';
import { CTASection } from '../components/Shared';

export default function Process() {
  const headerView = useInView(0.15);
  const stepsView = useInView(0.05);

  return (
    <div>
      <section className="relative pt-40 pb-24 sm:pb-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={headerView.ref}
            className={`max-w-2xl mb-16 transition-all duration-700 ${
              headerView.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-3">How we work</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 mb-5">
              A process built for clarity and velocity
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              No black boxes. Transparent collaboration, measurable milestones and a shared definition of done.
            </p>
          </div>

          <div ref={stepsView.ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={`relative reveal-3d ${stepsView.inView ? 'in-view' : ''}`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <div className="liquid-glass-light rounded-2xl p-6 h-full card-3d">
                  <span className="text-5xl font-light text-emerald-100 tracking-tighter">{step.step}</span>
                  <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-slate-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
