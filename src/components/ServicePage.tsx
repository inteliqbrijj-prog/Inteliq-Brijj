import type { ComponentType } from 'react';
import { Showcase, SaasHero, Head, Bento, Paths, Marquee, Faq, FinalCta, Reveal, SK_CSS, type Feature, type Step } from './SaasKit';
import type { Logo } from '../techLogos';
import { ImageReveal, StackSteps, TileWave, S3_CSS } from './Saas3D';

export type ServiceConfig = {
  hero: { eyebrow: string; title: string; accent: string; text: string; primary?: string; secondary: { label: string; to: string }; chips: { label: string; value: string }[] };
  reveal: { label: string; title: string; text: string; image: string; cta: { label: string; to: string } };
  show: { label: string; title: string; text: string; items: Feature[] };
  tiles: { label: string; title: string; text: string; items: { title: string; text: string }[] };
  steps: { label: string; title: string; text: string; data: Step[] };
  marquee: { label: string; title: string; items: (string | Logo)[] };
  why: { label: string; title: string; items: { title: string; text: string; icon: ComponentType<{ size?: number | string }> }[] };
  paths: { label: string; title: string; items: { title: string; stack: string; path: string }[] };
  faqs: { q: string; a: string }[];
  cta: { title: string; text: string };
};

/** One shared layout for IT Solutions + Digital Marketing */
export default function ServicePage({ c }: { c: ServiceConfig }) {
  return (
    <div className="sk">
      <SaasHero {...c.hero} />
      <ImageReveal {...c.reveal} />
      <section className="sk-sec">
        <div className="sk-wrap">
          <Head label={c.show.label} title={c.show.title} text={c.show.text} />
          <Showcase items={c.show.items} />
        </div>
      </section>
      <section className="sk-sec sk-sec-w">
        <div className="sk-wrap">
          <Head label={c.tiles.label} title={c.tiles.title} text={c.tiles.text} />
          <TileWave items={c.tiles.items} />
        </div>
      </section>
      <section className="sk-sec">
        <div className="sk-wrap">
          <Head label={c.steps.label} title={c.steps.title} text={c.steps.text} />
          <StackSteps steps={c.steps.data} />
        </div>
      </section>
      <section className="sk-sec sk-sec-w">
        <div className="sk-wrap">
          <Head label={c.marquee.label} title={c.marquee.title} />
          <Marquee items={c.marquee.items} />
          <div style={{ height: '3.5rem' }} />
          <Head label={c.why.label} title={c.why.title} />
          <Bento items={c.why.items.map((w, i) => { const I = w.icon; return { title: w.title, text: w.text, icon: <I size={19} />, wide: i === 0 }; })} />
        </div>
      </section>
      <section className="sk-sec">
        <div className="sk-wrap">
          <Head label={c.paths.label} title={c.paths.title} />
          <Paths items={c.paths.items} />
        </div>
      </section>
      <section className="sk-sec sk-sec-w">
        <div className="sk-wrap">
          <Head label="FAQ" title="Frequently Asked Questions" />
          <Reveal><Faq items={c.faqs} /></Reveal>
        </div>
      </section>
      <FinalCta {...c.cta} />
      <style>{SK_CSS}{S3_CSS}</style>
    </div>
  );
}
