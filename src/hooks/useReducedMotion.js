import { useState } from "react";

// Read once on mount: whether the visitor has asked the OS for less motion.
export const useReducedMotion = () =>
  useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)[0];
