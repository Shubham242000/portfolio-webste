import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

// Steps an index through 0..count-1 every `interval` ms. Pausable; stays put for reduced motion.
export const useCycle = (count, interval) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduced) return undefined;
    const timer = setInterval(() => setIndex((value) => (value + 1) % count), interval);
    return () => clearInterval(timer);
  }, [paused, reduced, count, interval]);

  return { index, pause: () => setPaused(true), resume: () => setPaused(false) };
};
