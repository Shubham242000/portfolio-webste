import { Suspense, useEffect, useRef, useState } from "react";

const DeferredSection = ({ id, children }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div id={id} ref={ref} className="deferred-section">
    {shouldLoad ? <Suspense fallback={<div className="section-loading" aria-live="polite">Loading portfolio…</div>}>{children}</Suspense> : <div className="section-placeholder" />}
  </div>;
};

export default DeferredSection;
