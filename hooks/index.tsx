import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    function handleResize() {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    }
    handleResize(); // set initial value on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return hasMounted ? isMobile : null;
}
