import { subscriptionFaq } from "@/data/subscription";
import { siteConfig } from "@/lib/config";
import CtaLink from "./CtaLink";
import { Plus } from "./icons";
import s from "./landing.module.scss";

export default function Faq() {
  return (
    <section id="faq" className={s.section}>
      <div className={`${s.container} ${s.faqGrid}`}>
        <div className={s.faqAside} data-reveal>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} />
            FAQ
          </span>
          <h2 className={s.h2}>
            Tes questions, <span className={s.serif}>nos réponses.</span>
          </h2>
          <p className={s.lead}>Une autre question ? Le plus simple, c&apos;est d&apos;en parler.</p>
          <CtaLink
            href={siteConfig.cta.buttonLink}
            ctaName="faq_appel_decouverte"
            className={s.btnGhost}
          >
            Poser ma question en appel
          </CtaLink>
        </div>

        <div className={s.faqList} data-reveal>
          {subscriptionFaq.map((item, index) => (
            <details key={item.question} className={s.faqItem} open={index === 0}>
              <summary>
                {item.question}
                <span className={s.faqIcon} aria-hidden>
                  <Plus />
                </span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
