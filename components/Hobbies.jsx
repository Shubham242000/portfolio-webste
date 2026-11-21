import { useEffect, useState } from "react";

const activities = [
  ["gym", "lifting at the gym"],
  ["travel", "planning the next trip"],
  ["sports", "watching a match"],
  ["music", "lost in a playlist"],
];

const Hobbies = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setIndex((value) => (value + 1) % activities.length), 1600);
    return () => clearInterval(timer);
  }, [paused]);

  const [key, label] = activities[index];

  return <p className="hobbies" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    Off the clock, I’m probably{" "}
    <a className="hobbies-now" key={key} href="#off-the-clock">
      {label}
    </a>
  </p>;
};

export default Hobbies;
