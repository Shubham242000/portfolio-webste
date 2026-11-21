import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

// Shubham's local time in Gurugram (IST), ticking every second, e.g. "Thu · 5:12:47 PM IST".
// Always IST regardless of where the visitor is, so it reads as my clock, not theirs.
export const useIstClock = () => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = formatter.formatToParts(now);
  const part = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${part("weekday")} · ${part("hour")}:${part("minute")}:${part("second")} ${part("dayPeriod")} IST`;
};
