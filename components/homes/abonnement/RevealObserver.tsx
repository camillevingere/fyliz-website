"use client";
import { useEffect } from "react";

// Révèle les éléments [data-reveal] à l'entrée dans le viewport.
// Sans JS, `data-js` n'est jamais posé et tout reste visible.
export default function RevealObserver({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    root.setAttribute("data-js", "");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rootId]);

  return null;
}
