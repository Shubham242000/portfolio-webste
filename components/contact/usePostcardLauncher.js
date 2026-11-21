import { useState } from "react";

// Open/closed state for the lazy postcard modal. `mounted` stays true after the first open
// so a half-written postcard survives closing the modal.
export const usePostcardLauncher = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const show = () => {
    setMounted(true);
    setOpen(true);
  };

  return { mounted, open, show, hide: () => setOpen(false) };
};
