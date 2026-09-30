"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

const sections = [
  { id: "top", label: "Top" },
  { id: "products", label: "Products" },
  { id: "m33ra", label: "M33RA" },
  { id: "codetap", label: "CodeTap" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

export function SectionNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const targets = sections.map(({ id }) => document.getElementById(id));
    let frame = 0;

    const update = () => {
      frame = 0;
      // Use a reading line near the top; retain the preceding section in gaps.
      const readingLine = Math.min(window.innerHeight * 0.25, 160);
      let current = 0;
      targets.forEach((target, index) => {
        if (target && target.getBoundingClientRect().top <= readingLine) current = index;
      });

      // The last section may be too short to reach the reading line.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections.length - 1;
      }
      setActiveIndex(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    targets.forEach((target) => { if (target) resizeObserver.observe(target); });
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    // Keep native link behavior for modified clicks and opening a new tab.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || event.detail === 0) {
      target.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((element) => {
        element.dataset.revealImmediate = "true";
        element.dataset.revealState = "visible";
      });
    }
    // Keyboard navigation moves immediately. Pointer navigation preserves orientation.
    target.scrollIntoView({ behavior: reduceMotion || event.detail === 0 ? "instant" : "smooth", block: "start" });
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
  }

  return (
    <nav className="section-navigation" aria-label="セクションナビゲーション">
      <span className="section-navigation-track" aria-hidden="true">
        <span style={{ transform: `scaleY(${activeIndex / (sections.length - 1)})` }} />
      </span>
      <ol>
        {sections.map(({ id, label }, index) => (
          <li key={id}>
            <a href={`#${id}`} aria-label={`${label} セクションへ移動`} aria-current={index === activeIndex ? "location" : undefined} data-complete={index < activeIndex ? "true" : undefined} onClick={(event) => navigate(event, id)}>
              <span className="section-navigation-label" aria-hidden="true">{label}</span>
              <span className="section-navigation-dot" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
