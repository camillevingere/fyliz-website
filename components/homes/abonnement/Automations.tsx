import { automationAreas, tools } from "@/data/subscription";
import { InvoiceVisual, LeadVisual, OpsVisual, SupportVisual } from "./AutomationVisuals";
import { Check } from "./icons";
import s from "./landing.module.scss";

const areaStyles = [
  { className: s.areaOrange, Visual: LeadVisual },
  { className: s.areaBlue, Visual: InvoiceVisual },
  { className: s.areaGreen, Visual: OpsVisual },
  { className: s.areaViolet, Visual: SupportVisual },
];

export default function Automations() {
  return (
    <section id="automatisations" className={s.section} style={{ paddingTop: 0 }}>
      <div className={s.container}>
        <div className={s.sectionHead} data-reveal>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} />
            Ce qu&apos;on automatise
          </span>
          <h2 className={s.h2}>
            Tout ce qui fait perdre du temps <span className={s.serif}>à tes équipes.</span>
          </h2>
          <p className={s.lead}>
            Ventes, finance, opérations, support : ton équipe IA externalisée
            prend en charge les tâches répétitives de chaque pôle.
          </p>
        </div>

        <div className={s.areas}>
          {automationAreas.map((area, index) => {
            const { className, Visual } = areaStyles[index % areaStyles.length];
            return (
              <article
                key={area.title}
                className={`${s.area} ${className}`}
                data-reveal
                style={{ "--delay": (index % 2) * 90 } as React.CSSProperties}
              >
                <Visual />
                <div className={s.areaBody}>
                  <span className={s.areaTag}>{area.title}</span>
                  <h3 className={s.h3}>{area.outcome}</h3>
                  <ul className={s.areaBenefits}>
                    {area.benefits.map((benefit) => (
                      <li key={benefit}>
                        <Check width={14} height={14} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <ul className={s.tools} aria-label="Outils avec lesquels on travaille">
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
