import { testimonials5 } from "@/data/testimonials";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import CtaLink from "./CtaLink";
import HeroEngine from "./HeroEngine";
import { ArrowRight, Clock, Star, TrendUp, Users } from "./icons";
import s from "./landing.module.scss";

const heroOutcomes = [
  { Icon: Users, title: "Plus de clients", text: "Chaque lead traité et relancé" },
  { Icon: Clock, title: "Plus de temps", text: "Les tâches répétitives disparaissent" },
  { Icon: TrendUp, title: "Plus de marge", text: "Moins de coûts, moins d'erreurs" },
];

export default function Hero() {
  // Uniquement les vraies photos, pas les logos de marque.
  const avatars = testimonials5.filter((person) => person.imgSrc.includes("/avatars/"));

  return (
    <section className={s.hero}>
      <div className={s.heroGlow} aria-hidden />
      <div className={`${s.container} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <span className={s.pill} data-reveal>
            <span className={s.pillTag}>Sans engagement</span>
            Agents IA & automatisations sur mesure
          </span>

          <h1 className={s.h1} data-reveal style={{ "--delay": 80 } as React.CSSProperties}>
            Ton équipe IA externalisée.
            <br />
            <span className={s.serif}>Tes idées deviennent du&nbsp;chiffre.</span>
          </h1>

          <p className={s.lead} data-reveal style={{ "--delay": 160 } as React.CSSProperties}>
            Tu as des idées pour gagner des clients, du temps ou de l&apos;argent
            avec l&apos;IA ? On les conçoit, on les met en production et on les
            fait évoluer. Toi, tu récoltes les résultats, sans recruter.
          </p>

          <ul className={s.heroOutcomes} data-reveal style={{ "--delay": 200 } as React.CSSProperties}>
            {heroOutcomes.map(({ Icon, title, text }) => (
              <li key={title}>
                <span className={s.heroOutcomeIcon}>
                  <Icon />
                </span>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className={s.heroActions} data-reveal style={{ "--delay": 240 } as React.CSSProperties}>
            <CtaLink
              href={siteConfig.cta.buttonLink}
              ctaName="hero_appel_decouverte"
              className={s.btnPrimary}
            >
              Réserver un appel découverte
              <ArrowRight />
            </CtaLink>
            <a href="#automatisations" className={s.btnGhost}>
              Voir des exemples
            </a>
          </div>

          <div className={s.proof} data-reveal style={{ "--delay": 320 } as React.CSSProperties}>
            <div className={s.avatars}>
              {avatars.map((person) => (
                <Image key={person.name} src={person.imgSrc} alt="" width={72} height={72} />
              ))}
            </div>
            <div>
              <div className={s.stars} aria-label="Note de 5 sur 5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              +50 entreprises accompagnées
            </div>
          </div>
        </div>

        <HeroEngine />
      </div>
    </section>
  );
}
