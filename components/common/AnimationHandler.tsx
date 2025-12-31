"use client";
import anime from "animejs";
import { useEffect, useRef } from "react";

export default function AnimationHandler() {
  const animatedElements = useRef(new Set<Element>());
  const animationInstances = useRef(new Map<Element, any>());

  useEffect(() => {
    const elements = document.querySelectorAll("[data-anime]");

    const parseAnimeData = (data: string) => {
      const settings: Record<string, any> = {};
      data.split(";").forEach((param) => {
        const [key, value] = param.split(":").map((item) => item.trim());
        if (key && value) {
          settings[key] = value;
        }
      });
      return settings;
    };

    const createAnimation = (element: Element, animeSettings: Record<string, any>) => {
      let targets;
      const targetsKey = animeSettings.targets;
      if (targetsKey === ">*") {
        targets = element.children;
      } else if (targetsKey) {
        targets = element?.querySelectorAll(targetsKey);
      } else {
        targets = element;
      }

      const isLoop = Boolean(animeSettings?.["loop"] === "true" || animeSettings?.["loop"] === true);

      // Build animation config
      const animationConfig: any = {
        loop: isLoop,
        targets: targets,
        easing: animeSettings?.easing || "spring(1, 80, 10, 0)",
        duration: Number(animeSettings?.duration) || 450,
      };

      // Only apply translateX if specified
      if (animeSettings?.["translateX"]) {
        animationConfig.translateX = JSON.parse(animeSettings["translateX"]);
      }

      // Only apply translateY if specified
      if (animeSettings?.["translateY"]) {
        animationConfig.translateY = JSON.parse(animeSettings["translateY"]);
      } else if (!isLoop) {
        animationConfig.translateY = [48, 0];
      }

      // Only apply opacity if specified
      if (animeSettings?.["opacity"]) {
        animationConfig.opacity = JSON.parse(animeSettings["opacity"]);
      } else if (!isLoop) {
        animationConfig.opacity = [0, 1];
      }

      // Handle direction for loop animations
      if (isLoop && animeSettings?.["direction"]) {
        animationConfig.direction = animeSettings["direction"];
      }

      // Handle delay
      if (animeSettings?.["delay"]) {
        if (typeof animeSettings["delay"] === "string" && animeSettings["delay"].includes(",")) {
          animationConfig.delay = anime.stagger(
            Number(animeSettings["delay"].split(",")[0]),
            { start: Number(animeSettings["delay"].split(",")[1]) }
          );
        } else {
          animationConfig.delay = Number(animeSettings["delay"]);
        }
      }

      return anime(animationConfig);
    };

    // Handle loop animations immediately (they should start right away)
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      elements.forEach((element) => {
        if (animatedElements.current.has(element)) {
          return;
        }

        const dataAnime = element.getAttribute("data-anime");
        if (!dataAnime) return;

        const modifieddataAnime = dataAnime.replace(
          /anime\.stagger\((\d+),\s*\{start:\s*(\d+)\}\)/,
          "$1,$2"
        );

        const animeSettings = parseAnimeData(modifieddataAnime);
        const isLoop = Boolean(animeSettings?.["loop"] === "true" || animeSettings?.["loop"] === true);

        // Start loop animations immediately
        if (isLoop) {
          const instance = createAnimation(element, animeSettings);
          animationInstances.current.set(element, instance);
          animatedElements.current.add(element);
        }
      });
    });

    // Intersection Observer for non-loop animations
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Skip if already animated
          if (animatedElements.current.has(element)) {
            return;
          }

          const dataAnime = element.getAttribute("data-anime");
          if (!dataAnime) return;

          const modifieddataAnime = dataAnime.replace(
            /anime\.stagger\((\d+),\s*\{start:\s*(\d+)\}\)/,
            "$1,$2"
          );

          const animeSettings = parseAnimeData(modifieddataAnime);
          const isLoop = Boolean(animeSettings?.["loop"] === "true" || animeSettings?.["loop"] === true);

          // Skip loop animations (already handled above)
          if (isLoop) {
            return;
          }

          const instance = createAnimation(element, animeSettings);
          animationInstances.current.set(element, instance);
          animatedElements.current.add(element);
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });

    // Only observe non-loop animations
    elements.forEach((element) => {
      if (animatedElements.current.has(element)) {
        return;
      }

      const dataAnime = element.getAttribute("data-anime");
      if (!dataAnime) return;

      const modifieddataAnime = dataAnime.replace(
        /anime\.stagger\((\d+),\s*\{start:\s*(\d+)\}\)/,
        "$1,$2"
      );

      const animeSettings = parseAnimeData(modifieddataAnime);
      const isLoop = Boolean(animeSettings?.["loop"] === "true" || animeSettings?.["loop"] === true);

      if (!isLoop) {
        observer.observe(element);
      }
    });

    return () => {
      // Clean up animations
      animationInstances.current.forEach((instance) => {
        if (instance && typeof instance.pause === "function") {
          instance.pause();
        }
      });
      animationInstances.current.clear();
      animatedElements.current.clear();

      // Clean up observer
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return null;
}

