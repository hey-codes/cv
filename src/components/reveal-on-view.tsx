"use client";

import { useEffect } from "react";

/**
 * Section entrance: every [data-reveal] section that starts below the fold
 * rises 8px and fades in the first time it scrolls into view.
 *
 * Safe by construction against the frozen-timeline bug in
 * design-system/OPEN.md (an opacity transition that never runs leaves text
 * invisible). Nothing is hidden in the server HTML. Sections are hidden only
 * from inside a requestAnimationFrame callback, which the browser runs only
 * once the page is painting in a visible tab, and only if they are still off
 * screen. Reduced motion, print, and a hidden tab all show everything.
 */
export function RevealOnView() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | null = null;
    let armed: HTMLElement[] = [];
    const showAll = () => {
      for (const el of armed) el.classList.remove("reveal-pending");
      observer?.disconnect();
    };

    const frame = requestAnimationFrame(() => {
      if (document.visibilityState !== "visible") return;
      const fold = window.innerHeight;
      armed = [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter(
        (el) => el.getBoundingClientRect().top > fold
      );
      if (armed.length === 0) return;

      for (const el of armed) el.classList.add("reveal-pending");
      // Turn transitions on a frame later, so hiding them is instant.
      requestAnimationFrame(() => {
        for (const el of armed) el.classList.add("reveal-armed");
      });

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.remove("reveal-pending");
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      for (const el of armed) observer.observe(el);
    });

    window.addEventListener("beforeprint", showAll);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") showAll();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      showAll();
      window.removeEventListener("beforeprint", showAll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
