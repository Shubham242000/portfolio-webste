import { useState } from "react";
import { experience } from "../content/portfolio";

const main = experience.filter((item) => !item.early);
const early = experience.filter((item) => item.early);

// Full-time roles and internships, plus which roles have their outcomes expanded.
export const useExperience = () => {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (key) => setOpen((current) => {
    const next = new Set(current);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  });

  return { main, early, isOpen: (key) => open.has(key), toggle };
};
