"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        (target as HTMLElement).dataset.revealState = "visible";
        observer.unobserve(target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -32px 0px" });

    elements.forEach((element) => {
      // Enhance only content below the viewport. Deep links and no-JS rendering
      // remain immediately readable, and the section anchors never move.
      if (reducedMotion.matches || element.getBoundingClientRect().top < window.innerHeight) {
        element.dataset.revealState = "visible";
      } else {
        element.dataset.revealState = "pending";
        observer.observe(element);
      }
    });

    const revealAll = () => {
      if (!reducedMotion.matches) return;
      elements.forEach((element) => { element.dataset.revealState = "visible"; });
      observer.disconnect();
    };

    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-scroll-reveal]");
      if (!element) return;
      element.dataset.revealImmediate = "true";
      element.dataset.revealState = "visible";
      observer.unobserve(element);
    };

    reducedMotion.addEventListener("change", revealAll);
    document.addEventListener("focusin", revealFocused);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", revealAll);
      document.removeEventListener("focusin", revealFocused);
      elements.forEach((element) => {
        delete element.dataset.revealState;
        delete element.dataset.revealImmediate;
      });
    };
  }, []);

  return null;
}
