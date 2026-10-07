import { pricingFeatures, subscription } from "@/data/subscription";
import { siteConfig } from "@/lib/config";
import CtaLink from "./CtaLink";
import { ArrowRight, Check } from "./icons";
import s from "./landing.module.scss";

export default function Pricing() {
  return (
    <section id="tarif" className={`${s.section} ${s.pricingSection}`}>
      <div className={s.container}>
        <div className={s.sectionHeadCenter} data-reveal>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} />
            Tarif
          </span>
          <h2 className={s.h2}>
            Un prix. <span className={s.serif}>Tout compris.</span>
          </h2>
          <p className={s.lead}>
            Moins cher qu&apos;un recrutement, sans les délais ni l&apos;engagement.
          </p>
        </div>

        <div className={s.pricingGrid}>
          <div className={s.priceCard} data-reveal>
            <div className={s.priceTop}>
              <div>
                <h3 className={s.h3}>Abonnement Fyliz</h3>
                <p style={{ color: "var(--ink-2)", marginTop: 6 }}>
                  Ton équipe IA externalisée
                </p>
              </div>
              <span className={s.priceBadge}>Sans engagement</span>
            </div>

            <div className={s.price}>
              <strong>{subscription.priceLabel}</strong>
              <span>{subscription.priceSuffix}</span>
            </div>

            <ul className={s.priceFeatures}>
              {pricingFeatures.map((feature) => (
                <li key={feature}>
                  <Check width={16} height={16} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className={s.priceCta}>
              <CtaLink
                href={siteConfig.cta.buttonLink}
                ctaName="tarif_appel_decouverte"
                className={s.btnPrimary}
              >
                Réserver un appel découverte
                <ArrowRight />
              </CtaLink>
              <p>30 min, gratuit. On regarde ensemble si l&apos;abonnement est fait pour toi.</p>
            </div>
          </div>

          <div className={s.projectCard} data-reveal style={{ "--delay": 120 } as React.CSSProperties}>
            <span className={s.eyebrow}>Besoin ponctuel</span>
            <h3 className={s.h3}>Projet défini</h3>
            <span className={s.projectPrice}>Sur devis</span>
            <p>
              Un besoin précis et unique ? On cadre le périmètre, le prix et les
              critères de réussite avant de construire.
            </p>
            <ul className={s.projectList}>
              <li>Diagnostic du processus</li>
              <li>Proposition au forfait</li>
              <li>Livraison, tests et documentation</li>
            </ul>
            <CtaLink
              href={siteConfig.cta.buttonLink}
              ctaName="tarif_projet_devis"
              className={s.btnOnDark}
            >
              Demander un devis
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
