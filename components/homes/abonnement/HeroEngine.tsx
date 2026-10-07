"use client";
import { heroIdeas } from "@/data/subscription";
import { useEffect, useState } from "react";
import { Check } from "./icons";
import s from "./landing.module.scss";
import { useLoop } from "./useLoop";

// Une idée = 8 temps : l'idée arrive, 3 étapes de mise en place, puis le résultat reste affiché.
const STEP_MS = 750;
const PHASES = 8;
const stages = ["Cadrage", "Construction", "En production"];

function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      setShown(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{shown}</>;
}

export default function HeroEngine() {
  const { ref, tick } = useLoop<HTMLDivElement>(STEP_MS, PHASES - 1);
  const cycle = Math.floor(tick / PHASES);
  const phase = tick % PHASES;
  const active = cycle % heroIdeas.length;
  const current = heroIdeas[active];
  const delivered = phase >= 4;

  return (
    <div className={s.engineWrap}>
      <div ref={ref} className={s.engine} aria-hidden>
        <div className={s.ideaTabs}>
          {heroIdeas.map((item, index) => (
            <span key={item.goal} data-active={index === active ? "" : undefined}>
              {item.goal}
              {index === active && (
                <i
                  key={cycle}
                  className={s.ideaTabFill}
                  style={{ "--dur": PHASES * STEP_MS } as React.CSSProperties}
                />
              )}
            </span>
          ))}
        </div>

        <div className={s.ideaBody}>
          <p className={s.ideaLabel}>Ton idée</p>
          <p key={cycle} className={s.ideaQuote}>
            « {current.idea} »
          </p>

          <ol
            className={s.ideaStages}
            style={{ "--fill": phase <= 1 ? 0 : phase === 2 ? 0.5 : 1 } as React.CSSProperties}
          >
            {stages.map((stage, index) => (
              <li
                key={stage}
                data-state={phase > index + 1 ? "done" : phase === index + 1 ? "active" : "idle"}
              >
                <span className={s.ideaDot}>
                  <Check width={10} height={10} />
                </span>
                {stage}
              </li>
            ))}
          </ol>

          <div className={s.ideaResult} data-visible={delivered ? "" : undefined}>
            <p className={s.ideaLabel}>Résultat</p>
            <strong>
              {current.prefix}
              {delivered ? <CountUp key={cycle} value={current.value} /> : 0}
              {current.suffix}
            </strong>
            <span>{current.result}</span>
          </div>
        </div>
      </div>
      <p className={s.engineCaption}>Exemples illustratifs</p>
    </div>
  );
}
