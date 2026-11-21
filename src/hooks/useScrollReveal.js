import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

// Adds .is-visible to every [data-reveal] element the first time it scrolls into view.
export const useScrollReveal = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced]);
};
