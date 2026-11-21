import { useEffect } from "react";

// Swaps the tab title while the visitor is on another tab, and puts it back when they return.
export const useAwayTitle = (awayTitle) => {
  useEffect(() => {
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? awayTitle : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, [awayTitle]);
};
