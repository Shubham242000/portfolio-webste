// Hand-drawn 32×32 pixel portrait. Each character is one pixel; see PALETTE for the colours.
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
  ".........sSSEESSSSEESss.........",
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

const PALETTE = {
  H: "#17110f", h: "#3d2e27", E: "#17110f",
  S: "#e0ad86", s: "#c78f68", l: "#efc29f", d: "#8f6c5a", D: "#3b2a22", m: "#a5483d", W: "#ffffff",
  K: "#121214", J: "#26262b", G: "#8b8c93", L: "#dadbe0", O: "#e07a35",
};

// Merge horizontal runs of the same colour so the SVG stays small.
const runs = PIXELS.flatMap((row, y) => {
  const out = [];
  for (let x = 0; x < row.length;) {
    let width = 1;
    while (row[x + width] === row[x]) width += 1;
    if (row[x] !== ".") out.push({ x, y, width, fill: PALETTE[row[x]] });
    x += width;
  }
  return out;
});

const PixelAvatar = () => <svg className="pixel-avatar" viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">
  {runs.map(({ x, y, width, fill }) => <rect key={`${x}-${y}`} x={x} y={y} width={width} height="1" fill={fill} />)}
</svg>;

export default PixelAvatar;
