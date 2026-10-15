import { useEffect, useState } from "react";

// Tiny pixel icons drawn on a 9×9 grid, in the same style as the avatar and cursor.
const ICONS = {
  gym: [
    ".........",
    "XX.....XX",
    "XX.....XX",
    "XXX...XXX",
    "XXXXXXXXX",
    "XXX...XXX",
    "XX.....XX",
    "XX.....XX",
    ".........",
  ],
  travel: [
    "....X....",
    "...XXX...",
    "...XXX...",
    "..XXXXX..",
    ".XXXXXXX.",
    "XXX.X.XXX",
    "....X....",
    "...XXX...",
    "..XX.XX..",
  ],
  sports: [
    "..XXXXX..",
    ".XX...XX.",
    "XX.XXX.XX",
    "X.XXXXX.X",
    "X.XXXXX.X",
    "X.XXXXX.X",
    "XX.XXX.XX",
    ".XX...XX.",
    "..XXXXX..",
  ],
  music: [
    "..XXXXX..",
    ".XX...XX.",
    "XX.....XX",
    "X.......X",
    "X.......X",
    "XXX...XXX",
    "XXX...XXX",
    "XXX...XXX",
    ".XX...XX.",
  ],
};

const activities = [
  ["gym", "lifting at the gym"],
  ["travel", "planning the next trip"],
  ["sports", "watching a match"],
  ["music", "lost in a playlist"],
];

const PixelIcon = ({ rows }) => <svg className="hobby-icon" viewBox="0 0 9 9" shapeRendering="crispEdges" aria-hidden="true">
  {rows.flatMap((row, y) => [...row].map((cell, x) => cell === "X" && <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />))}
</svg>;

const Hobbies = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setIndex((value) => (value + 1) % activities.length), 2600);
    return () => clearInterval(timer);
  }, [paused]);

  const [icon, label] = activities[index];

  return <p className="hobbies" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    Off the clock, I’m probably{" "}
    <a className="hobbies-now" key={icon} href="#off-the-clock">
      <PixelIcon rows={ICONS[icon]} />{label}
    </a>
  </p>;
};

export default Hobbies;
