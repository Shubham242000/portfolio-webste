import { useEffect, useState } from "react";

const readStoredTheme = () => {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
};

// Light/dark theme on <html data-theme>. A choice made with the toggle is remembered; until then
// the site follows the OS setting, including changes to it while the page is open.
export const useTheme = () => {
  // index.html sets data-theme before first paint, so this never flashes the wrong theme.
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      if (!readStoredTheme()) setTheme(event.matches ? "dark" : "light");
    };
    preference.addEventListener("change", handleChange);
    return () => preference.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit only.
    }
  };

  return [theme, toggleTheme];
};
