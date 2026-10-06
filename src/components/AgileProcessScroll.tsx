import { Link } from 'react-router-dom';

export type ProcessStep = {
  count: string;
  title: string;
  description: string;
  cards: { heading: string; body: string }[];
};

/**
 * Cyntexa .agile-process sticky stack — compact spacing.
 * No Skip button (avoids overlap). Emerald theme.
 */
export default function AgileProcessScroll({
  heading = 'Process We Follow',
  description = 'Explore our approach customized for your business needs.',
  steps,
  skipHref,
}: {
  heading?: string;
  description?: string;
  steps: ProcessStep[];
  skipHref?: string;
}) {
  return (
    <section className="ib-agile">
      <div className="ib-agile-head">
        <h2 className="ib-agile-title" style={{ fontFamily: 'var(--font-display)' }}>
          {heading}
        </h2>
        <p className="ib-agile-desc">{description}</p>
      </div>

      <div className="ib-agile-wrapper">
        <div className="ib-agile-steps">
          {steps.map((step) => (
            <div key={step.count} className="ib-agile-step">
              <div className="ib-agile-step-left">
                <p className="ib-agile-count">{step.count}</p>
                <h3 className="ib-agile-heading" style={{ fontFamily: 'var(--font-display)' }}>
                  {step.title}
                </h3>
                <p className="ib-agile-step-desc">{step.description}</p>
              </div>
              <div className="ib-agile-cards">
                {step.cards.map((card, i) => (
                  <div
                    key={card.heading}
                    className="ib-agile-card"
                    style={{ ['--card-number' as string]: i + 1 }}
                  >
                    <h4 className="ib-agile-card-heading">{card.heading}</h4>
                    <p className="ib-agile-card-body">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {skipHref && (
        <div className="ib-agile-cta">
          <Link to={skipHref} className="ib-agile-cta-btn">
            Talk to Our Team
          </Link>
        </div>
      )}

      <style>{AGILE_CSS}</style>
    </section>
  );
}

const AGILE_CSS = `
.ib-agile {
  width: 100%;
  background: #fff;
  padding: 3.5rem 0 1.5rem;
}
.ib-agile-head {
  max-width: 80rem;
  margin: 0 auto 0.5rem;
  padding: 0 1.25rem;
}
@media (min-width: 640px) {
  .ib-agile-head { padding: 0 2rem; }
}
@media (min-width: 1024px) {
  .ib-agile-head { padding: 0 2.5rem; }
}
.ib-agile-title {
  font-size: clamp(1.5rem, 2.8vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.ib-agile-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #64748b;
  max-width: 36rem;
  margin-bottom: 1rem;
}

.ib-agile-wrapper {
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.25rem;
}
@media (min-width: 640px) {
  .ib-agile-wrapper { padding: 0 2rem; }
}
@media (min-width: 1024px) {
  .ib-agile-wrapper { padding: 0 2.5rem; }
}

/* Compact gap — closer steps like Cyntexa dense stack */
.ib-agile-steps {
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  margin-top: 2.5rem;
  position: relative;
  padding-bottom: 2rem;
}
@media (max-width: 750px) {
  .ib-agile-steps {
    gap: 2.75rem;
    margin-top: 1.5rem;
  }
}

.ib-agile-step {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.75rem;
}
@media (max-width: 750px) {
  .ib-agile-step {
    flex-direction: column;
    gap: 1rem;
  }
}

.ib-agile-step-left {
  width: 38%;
  position: sticky;
  top: calc(72px + 1.25rem);
  color: #0f172a;
}
@media (max-width: 750px) {
  .ib-agile-step-left {
    width: 100%;
    position: relative;
    top: auto;
  }
}
.ib-agile-count {
  font-size: 0.95rem;
  margin-bottom: 0.45rem;
  color: #94a3b8;
  font-weight: 500;
}
.ib-agile-heading {
  font-size: clamp(1.35rem, 2.2vw, 1.65rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #0f172a;
}
.ib-agile-step-desc {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.55;
  margin-top: 0.75rem;
}

.ib-agile-cards {
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-width: 34rem;
}
@media (max-width: 750px) {
  .ib-agile-cards {
    width: 100%;
    position: relative;
  }
}

.ib-agile-card {
  border-radius: 10px;
  padding: 1rem 1.15rem 1.15rem;
  background: #fff;
  position: sticky;
  z-index: 1;
  top: calc(72px + 1rem + 0.85rem * var(--card-number, 1));
  width: 100%;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.07);
}
@media (max-width: 750px) {
  .ib-agile-card {
    position: relative;
    top: auto !important;
  }
}

.ib-agile-card::before {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #34d399, #059669 55%, #0d9488);
  z-index: -2;
}
.ib-agile-card::after {
  content: "";
  display: block;
  position: absolute;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  transform: translate(1px, 1px);
  background: #fff;
  border-radius: 9px;
  z-index: -1;
  top: 0;
  left: 0;
}

.ib-agile-card-heading {
  color: #0f172a;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
  margin: 0;
}
.ib-agile-card-body {
  color: #64748b;
  font-size: 0.8125rem;
  line-height: 1.5;
  margin-top: 0.5rem;
}

.ib-agile-cta {
  max-width: 80rem;
  margin: 1.5rem auto 0;
  padding: 0 1.25rem 1.5rem;
  text-align: center;
}
.ib-agile-cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.35rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #10b981, #0d9488);
  text-decoration: none;
  box-shadow: 0 8px 24px -8px rgba(16, 185, 129, 0.4);
}

@media (prefers-reduced-motion: reduce) {
  .ib-agile-step-left,
  .ib-agile-card {
    position: relative !important;
    top: auto !important;
  }
  .ib-agile-steps { gap: 2rem; }
}
`;
