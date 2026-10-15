import { useState } from "react";
import "./story.css";

// Layout shared by every story: the visual on the left, numbered plain-language steps on the right.
const Story = ({ story, steps, result, children }) => {
  const [showTech, setShowTech] = useState(false);
  const { ref, step, status, play, pause, resume, jump } = story;

  const control = {
    idle: ["Play ▶", play],
    playing: ["Pause ❚❚", pause],
    paused: ["Resume ▶", resume],
    done: ["Replay ↺", play],
  }[status];

  return <div className="story" ref={ref}>
    <div className="story-stage">
      {step < 0 ? <button type="button" className="story-start" onClick={play}>Play the story ▶</button> : <>
        <p className="story-caption" aria-hidden="true"><span>{String(step + 1).padStart(2, "0")}</span>{steps[step].caption}</p>
        {children}
      </>}
    </div>

    <div className="story-side">
      <div className="story-head">
        <span>{status === "done" ? "Finished" : step < 0 ? `${steps.length} steps` : `Step ${step + 1} of ${steps.length}`}</span>
        <button type="button" className="chip" onClick={control[1]}>{control[0]}</button>
      </div>

      <ol className="story-steps">
        {steps.map((item, index) => {
          const state = index === step && status !== "done" ? "is-current" : index <= step ? "is-past" : "";
          return <li key={item.caption} className={state}>
            <button type="button" onClick={() => jump(index)} aria-current={state === "is-current" ? "step" : undefined}>
              <span className="story-num">{String(index + 1).padStart(2, "0")}</span>
              <span>
                {item.caption}
                {showTech && <code>{item.tech}</code>}
              </span>
            </button>
          </li>;
        })}
      </ol>

      <p className={status === "done" ? "story-result is-visible" : "story-result"} aria-live="polite">{status === "done" ? result : ""}</p>

      <label className="story-tech">
        <input type="checkbox" checked={showTech} onChange={(event) => setShowTech(event.target.checked)} />
        Show technical details
      </label>
    </div>
  </div>;
};

export default Story;
