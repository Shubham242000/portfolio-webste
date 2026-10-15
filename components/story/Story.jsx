import "./story.css";

// A compact, looping story: story-style progress segments, one caption line, and the visual.
const Story = ({ story, steps, children }) => {
  const { ref, step, status, cycle, running, play, pause, resume, jump } = story;
  const control = status === "playing" ? ["Pause", "❚❚", pause] : status === "done" ? ["Replay", "↺", play] : ["Play", "▶", status === "idle" ? play : resume];

  return <div className="story" ref={ref}>
    <div className="story-bar">
      <div className="story-segments">
        {steps.map((item, index) => {
          const current = index === step && status !== "done";
          const state = current && running ? "is-running" : index < step || index === step || status === "done" ? "is-full" : "";
          return <button
            key={item.caption}
            type="button"
            className={state}
            onClick={() => jump(index)}
            aria-label={`Step ${index + 1}: ${item.caption}`}
            aria-current={current ? "step" : undefined}
          >
            <i key={current ? `${cycle}-${step}` : "static"} style={current ? { animationDuration: `${item.duration}ms` } : undefined} />
          </button>;
        })}
      </div>
      <button type="button" className="story-control" onClick={control[2]} aria-label={control[0]}>{control[1]}</button>
    </div>

    <p className="story-caption" key={`${cycle}-${step}`}>{steps[step].caption}</p>

    <div className="story-stage">{children}</div>
  </div>;
};

export default Story;
