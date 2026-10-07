import { siteConfig } from "@/lib/config";
import CtaLink from "./CtaLink";
import { ArrowRight } from "./icons";
import s from "./landing.module.scss";

export default function FinalCta() {
  return (
    <section className={s.finalCta}>
      <div className={s.container}>
        <div className={s.finalCtaBox} data-reveal>
          <div className={s.finalCtaRings} aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <h2 className={s.h2}>
            Prêt à déléguer tes <span className={s.serif}>automatisations ?</span>
          </h2>
          <p>
            Un appel de 30 minutes pour repérer ce qu&apos;on peut automatiser chez
            toi dès le premier mois.
          </p>
          <CtaLink
            href={siteConfig.cta.buttonLink}
            ctaName="final_appel_decouverte"
            className={s.btnDark}
          >
            Réserver un appel découverte
            <ArrowRight />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
