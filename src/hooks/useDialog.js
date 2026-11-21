import { useEffect, useRef } from "react";

// Keeps a native <dialog> in step with `open`, opening it as a modal. Returns the ref for the <dialog>.
export const useDialog = (open) => {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return ref;
};
