import { useState } from "react";

// Open/closed state for the lazy postcard modal. `mounted` stays true after the first open
// so reopening doesn't wait on the lazy chunk again.
export const usePostcardLauncher = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const show = () => {
    setMounted(true);
    setOpen(true);
  };

  return { mounted, open, show, hide: () => setOpen(false) };
};
