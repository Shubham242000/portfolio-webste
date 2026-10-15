import { useCallback, useEffect, useRef, useState } from "react";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Steps through a story on a timer. `durations` must be stable (define it at module level).
// The story starts by itself once it scrolls into view, unless the visitor prefers reduced motion.
export function useStory(durations) {
  const [step, setStep] = useState(-1);
  const [status, setStatus] = useState("idle");
  const ref = useRef(null);

  useEffect(() => {
    if (status !== "playing") return undefined;
    const timer = setTimeout(() => {
      if (step >= durations.length - 1) setStatus("done");
      else setStep(step + 1);
    }, durations[step]);
    return () => clearTimeout(timer);
  }, [status, step, durations]);

  const play = useCallback(() => {
    setStep(0);
    setStatus("playing");
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        play();
      }
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [play]);

  return {
    ref,
    step,
    status,
    play,
    pause: () => setStatus("paused"),
    resume: () => setStatus("playing"),
    jump: (index) => {
      setStep(index);
      setStatus("paused");
    },
  };
}

// 0 → 1 over `duration` while `active`; 1 otherwise, so a paused or revisited step shows its finished state.
export function useProgress(active, duration) {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (!active || prefersReducedMotion()) {
      setValue(1);
      return undefined;
    }
    setValue(0);
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const next = Math.min(1, (now - start) / duration);
      setValue(next);
      if (next < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration]);

  return value;
}
