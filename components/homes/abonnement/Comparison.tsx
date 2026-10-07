import { painPoints, raceRows } from "@/data/subscription";
import { Check } from "./icons";
import s from "./landing.module.scss";

const axis = ["Aujourd'hui", "M+1", "M+2", "M+3", "M+4", "M+5", "M+6"];
// Livraisons qui s'enchaînent sur la piste Fyliz pendant que les autres démarrent.
const deliveries = [10, 18, 26, 34, 42, 50, 58, 66, 74, 82, 90];

export default function Comparison() {
  return (
    <section id="pourquoi" className={s.section}>
      <div className={s.container}>
        <div className={s.sectionHead} data-reveal>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} />
            Le constat
          </span>
          <h2 className={s.h2}>
            Recruter prend des mois.{" "}
            <span className={s.serif}>Nous, on démarre cette semaine.</span>
          </h2>
          <p className={s.lead}>
            Tu sais que l&apos;IA peut faire gagner des heures à tes équipes. Le
            vrai coût, c&apos;est chaque mois passé à attendre.
          </p>
        </div>

        <figure className={s.race} data-reveal>
          <figcaption className={s.raceCaption}>
            Délai avant la première automatisation en production
          </figcaption>

          <div className={s.raceAxis} aria-hidden>
            {axis.map((label, index) => (
              <span key={label} style={{ "--i": index } as React.CSSProperties}>
                {label}
              </span>
            ))}
          </div>

          <ul className={s.raceRows}>
            {raceRows.map((row, index) => (
              <li key={row.label} className={row.us ? s.raceUs : undefined}>
                <div className={s.raceLabel}>
                  <strong>{row.label}</strong>
                  <span className={s.raceResult}>{row.result}</span>
                  <span>{row.detail}</span>
                </div>
                <div className={s.raceTrack} aria-hidden>
                  <span
                    className={s.raceBar}
                    style={
                      {
                        "--end": `${row.end}%`,
                        "--solid": `${row.solid}%`,
                        "--dur": row.us ? 500 : 2400 - index * 600,
                      } as React.CSSProperties
                    }
                  />
                  {row.us &&
                    deliveries.map((left, dot) => (
                      <span
                        key={left}
                        className={s.raceDelivery}
                        style={{ left: `${left}%`, "--delay": 700 + dot * 140 } as React.CSSProperties}
                      >
                        <Check width={10} height={10} />
                      </span>
                    ))}
                </div>
              </li>
            ))}
          </ul>

          <p className={s.raceLegend}>
            <span className={s.raceDelivery} aria-hidden>
              <Check width={10} height={10} />
            </span>
            Avec Fyliz, les livraisons s&apos;enchaînent pendant que les autres
            options en sont encore au démarrage.
          </p>
        </figure>

        <ul className={s.pains}>
          {painPoints.map((pain, index) => (
            <li
              key={pain.value}
              className={s.pain}
              data-reveal
              style={{ "--delay": index * 90 } as React.CSSProperties}
            >
              <strong>{pain.value}</strong>
              <p>{pain.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
