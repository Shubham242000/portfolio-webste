import { useState } from "react";
import { useDialog } from "../src/hooks/useDialog";

// Which photo (if any) is open in the lightbox, with wrap-around stepping by button or arrow key.
export const useLightbox = (count) => {
  const [index, setIndex] = useState(null);
  const dialogRef = useDialog(index !== null);

  const close = () => setIndex(null);
  const step = (offset) => setIndex((current) => (current + offset + count) % count);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  const onBackdropClick = (event) => { if (event.target === event.currentTarget) close(); };

  return { dialogRef, index, open: setIndex, close, step, onKeyDown, onBackdropClick };
};
