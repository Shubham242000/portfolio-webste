import { useState } from "react";

const HighlightSpan = ({ children }) => {
  const [bg, setBg] = useState("");

  return (
    <span
      style={{
        background: bg,
        transition: "background 0.2s",
      }}
      onMouseEnter={() => setBg("#ffb300")}
      onMouseLeave={() => setBg("")}
    >
      {children}
    </span>
  );
};

export default HighlightSpan;
