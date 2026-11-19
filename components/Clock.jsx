import { useEffect, useState } from "react";

// Shubham's local time in Gurugram (IST), ticking live — a small "a real person is
// behind this" signal for the hero status row. Always shows IST regardless of where
// the visitor is, so it reads as my clock, not theirs.
const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

const Clock = ({ className = "eyebrow clock" }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // e.g. "THU · 5:12:47 PM IST" (CSS uppercases it to match the eyebrow).
  const part = (parts, type) => parts.find((p) => p.type === type)?.value ?? "";
  const parts = formatter.formatToParts(now);
  const label = `${part(parts, "weekday")} · ${part(parts, "hour")}:${part(parts, "minute")}:${part(parts, "second")} ${part(parts, "dayPeriod")} IST`;

  return <div className={className} aria-label={`Current time in Gurugram, ${label}`}>{label}</div>;
};

export default Clock;
