import { useEffect } from "react";

// A modal dialog doesn't stop the page behind it from scrolling, so pin the page while `locked`.
export const useScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => { root.style.overflow = previous; };
  }, [locked]);
};
