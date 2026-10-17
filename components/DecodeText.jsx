import { useEffect, useRef, useState } from "react";

// Glyph pool for the scramble — monospace-safe so the label never changes width.
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/+=<>*·#%";
const DURATION = 440;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A label that "decodes" — each character locks in left-to-right out of random
// glyphs — the first time it scrolls into view. Whitespace is left intact.
const DecodeText = ({ text, className }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const frame = (now) => {
        const t = Math.min((now - start) / DURATION, 1);
        const locked = Math.floor(t * text.length);
        let out = "";
        for (let i = 0; i < text.length; i += 1) {
          const ch = text[i];
          if (ch === " ") out += " ";
          else if (i < locked) out += ch;
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        if (t < 1) raf = requestAnimationFrame(frame);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        run();
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return <div ref={ref} className={className}>{display}</div>;
};

export default DecodeText;
