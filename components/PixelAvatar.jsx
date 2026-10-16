import { useEffect, useRef, useState } from "react";

// Hand-drawn 32×32 pixel portrait. Each character is one pixel; see PALETTE for the colours.
// The eyes are drawn separately (see EYES) so they can blink and follow the cursor.
const PIXELS = [
  "................HHHH............",
  "..............HHhhHHH...........",
  "............HHhhHHHHHH..........",
  "...........HHHHHHhHHHH..........",
  "..........HHHHHHHHhHHH..........",
  ".........HHHHHHHHHHhHHH.........",
  ".........HHHHHHHHHHHHHH.........",
  ".........HHHHHHHHHHHHHH.........",
  ".........HHHHllSSSSSSsH.........",
  ".........HSHHHSSSSHHHsH.........",
  "..........sSSSSSSSSSSs..........",
  ".........sSSSSSSSSSSSss.........",
  ".........sSlSSSSSSSSSss.........",
  "..........sllSSSsSSSSs..........",
  "..........ddSSSssSSSdd..........",
  "..........ddSSSSSSSSdd..........",
  "..........ddSDDDDDDSdd..........",
  "...........dSdWWWWdSdd..........",
  "...........dSddmmddSd...........",
  "............dddddddd............",
  "..............dddd..............",
  "..............ssss..............",
  "..............ssss..............",
  "...........KKKKKKKKKK...........",
  ".........JJKKKKKKKKKKJL.........",
  ".......OJJJJKKKKKKKKJLGJJ.......",
  ".....GJJOJJJKKKKKKKKLGJJJJJ.....",
  "...LGJJJJOJJKKKKKKKKJJJJJJJLG...",
  "..LGJJJJJJLJKKKKKKKKJJJJJJLGJJ..",
  ".LGJJJJJJLGJKKKKKKKKJOJJJLGJJJJ.",
  "LGOJJJJJLGJJKKKKKKKKJJOJLGJJJJJJ",
  "GJJOJJJLGJJJKKKKKKKKJJJLGJJJJJJL",
];

// A raised hand in two frames (tilted left, then right), drawn from (x: 1, y: 14) down to the shoulder.
const WAVE = [
  [
    ".s.s.s..",
    ".S.S.S..",
    ".SSSSS..",
    "sSSSSSs.",
    ".sSSSSs.",
    "..sSSs..",
    "..JJJ...",
    "..JJJ...",
    "...JJJ..",
    "...JJJ..",
    "....JJ..",
    "....JJJ.",
  ],
  [
    "..s.s.s.",
    "..S.S.S.",
    "..SSSSS.",
    ".sSSSSSs",
    "..sSSSSs",
    "...sSSs.",
    "...JJJ..",
    "..JJJ...",
    "...JJJ..",
    "...JJJ..",
    "....JJ..",
    "....JJJ.",
  ],
];

const PALETTE = {
  H: "#17110f", h: "#3d2e27", E: "#17110f",
  S: "#e0ad86", s: "#c78f68", l: "#efc29f", d: "#8f6c5a", D: "#3b2a22", m: "#a5483d", W: "#ffffff",
  K: "#121214", J: "#26262b", G: "#8b8c93", L: "#dadbe0", O: "#e07a35",
};

const EYES = [12, 18]; // left x of each 2-pixel eye, on row 11
const EYE_ROW = 11;

// Merge horizontal runs of the same colour so the SVG stays small.
const toRuns = (rows, offsetX = 0, offsetY = 0) => rows.flatMap((row, y) => {
  const out = [];
  for (let x = 0; x < row.length;) {
    let width = 1;
    while (row[x + width] === row[x]) width += 1;
    if (row[x] !== ".") out.push({ x: x + offsetX, y: y + offsetY, width, fill: PALETTE[row[x]] });
    x += width;
  }
  return out;
});

const base = toRuns(PIXELS);
const waveFrames = WAVE.map((frame) => toRuns(frame, 1, 14));

const Pixels = ({ runs }) => runs.map(({ x, y, width, fill }) => <rect key={`${x}-${y}`} x={x} y={y} width={width} height="1" fill={fill} />);

const PixelAvatar = () => {
  const ref = useRef(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [wave, setWave] = useState(null);

  // Blink at irregular intervals, occasionally twice in a row.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let timer;
    const blink = (times) => {
      setBlinking(true);
      timer = setTimeout(() => {
        setBlinking(false);
        timer = times > 1 ? setTimeout(() => blink(times - 1), 160) : setTimeout(() => blink(Math.random() < 0.2 ? 2 : 1), 2500 + Math.random() * 3500);
      }, 140);
    };
    timer = setTimeout(() => blink(1), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Eyes follow a mouse pointer by one pixel: left, right and down (looking up would merge into the eyebrows).
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let frame;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = ref.current.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height * 0.36);
        const next = { x: Math.abs(dx) > 60 ? Math.sign(dx) : 0, y: dy > 80 ? 1 : 0 };
        setLook((current) => (current.x === next.x && current.y === next.y ? current : next));
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Wave: alternate two hand frames for a moment, with a speech bubble.
  useEffect(() => {
    if (wave === null) return undefined;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setWave(wave >= 7 ? null : still ? wave + 7 : wave + 1), still ? 1600 : 220);
    return () => clearTimeout(timer);
  }, [wave]);

  const eyeColor = blinking ? PALETTE.s : PALETTE.E;

  return <button
    type="button"
    ref={ref}
    className="hero-photo"
    onClick={() => setWave((current) => current ?? 0)}
    aria-label="Pixel-art portrait of Shubham Shrivastava. Press to say hi."
  >
    <svg className="pixel-avatar" viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">
      <Pixels runs={base} />
      {EYES.map((x) => <rect key={x} x={x + look.x} y={EYE_ROW + (blinking ? 0 : look.y)} width="2" height="1" fill={eyeColor} />)}
      {wave !== null && <Pixels runs={waveFrames[wave % 2]} />}
    </svg>
    {wave !== null && <span className="hero-photo-bubble" aria-live="polite">Hi there! 👋</span>}
  </button>;
};

export default PixelAvatar;
