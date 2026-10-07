import { steps } from "@/data/subscription";
import s from "./landing.module.scss";

export default function Method() {
  return (
    <section id="methode" className={s.section} style={{ paddingTop: 0 }}>
      <div className={s.container}>
        <div className={s.sectionHead} data-reveal>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} />
            Comment ça marche
          </span>
          <h2 className={s.h2}>
            Aussi simple qu&apos;un <span className={s.serif}>abonnement.</span>
          </h2>
        </div>

        <ol className={s.steps}>
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={s.step}
              data-reveal
              style={{ "--delay": index * 90 } as React.CSSProperties}
            >
              <span className={s.stepNumber} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={s.h3}>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
