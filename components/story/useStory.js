import { useCallback, useEffect, useRef, useState } from "react";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Steps through a story on a timer and loops it while it is on screen. `durations` must be stable
// (define it at module level). Visitors who prefer reduced motion get the final step, static.
export function useStory(durations, { hold = 2600 } = {}) {
  const last = durations.length - 1;
  const [step, setStep] = useState(() => (prefersReducedMotion() ? last : 0));
  const [status, setStatus] = useState(() => (prefersReducedMotion() ? "paused" : "idle"));
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);
  const ref = useRef(null);
  const running = status === "playing" && visible;

  const play = useCallback(() => {
    setStep(0);
    setCycle((value) => value + 1);
    setStatus("playing");
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible && status === "idle") play();
  }, [visible, status, play]);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setTimeout(() => {
      if (step < last) setStep(step + 1);
      else setStatus("done");
    }, durations[step]);
    return () => clearTimeout(timer);
  }, [running, step, last, durations]);

  // Hold on the final frame for a moment, then start over.
  useEffect(() => {
    if (status !== "done" || !visible) return undefined;
    const timer = setTimeout(play, hold);
    return () => clearTimeout(timer);
  }, [status, visible, hold, play]);

  return {
    ref,
    step,
    status,
    cycle,
    running,
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
