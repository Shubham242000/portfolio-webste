import { useIstClock } from "./useIstClock";

// The CSS uppercases the label to match the eyebrow.
const Clock = ({ className = "eyebrow clock" }) => {
  const label = useIstClock();
  return <div className={className} aria-label={`Current time in Gurugram, ${label}`}>{label}</div>;
};

export default Clock;
