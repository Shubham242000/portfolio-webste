import { useEffect } from "react";

const AWAY_TITLE = "i noticed you left";

const AwayTitle = () => {
  useEffect(() => {
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? AWAY_TITLE : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, []);

  return null;
};

export default AwayTitle;
