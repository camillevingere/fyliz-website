"use client";
import { useEffect, useRef, useState } from "react";

// Compteur qui avance toutes les `stepMs` tant que l'élément est visible.
// Avec prefers-reduced-motion, il reste figé sur `reducedTick`.
export function useLoop<T extends HTMLElement>(stepMs: number, reducedTick = 0) {
  const ref = useRef<T>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(reducedTick);
      return;
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) {
        timer = window.setInterval(() => setTick((value) => value + 1), stepMs);
      }
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [stepMs, reducedTick]);

  return { ref, tick };
}
