import Story from "./Story";
import { useProgress, useStory } from "./useStory";

const QUESTION = "How did each region do last quarter?";
const ANSWER = "North led with ₹4.2 Cr, up 18%. East dipped 6% on late renewals.";
const MISSING_COLUMN = "revenue_q3_inr";
const ROWS = [["North", 4.2], ["West", 3.6], ["South", 3.1], ["East", 1.9]];
const MAX = Math.max(...ROWS.map(([, value]) => value));

const steps = [
  { caption: "Someone asks a question in plain words.", duration: 2400 },
  { caption: "The answer streams in word by word. No spinner.", duration: 3000 },
  { caption: "The AI’s chart asks for data that doesn’t exist. A check catches it.", duration: 3400 },
  { caption: "The corrected chart appears. Nobody sees a broken one.", duration: 3200 },
];
const durations = steps.map((item) => item.duration);

const AiChartStory = () => {
  const story = useStory(durations);
  const { step, running } = story;
  const typing = useProgress(step === 1 && running, 2400);
  const answer = step === 1 ? ANSWER.slice(0, Math.round(ANSWER.length * typing)) : ANSWER;

  return <Story story={story} steps={steps}>
    <div className="chat">
      <p className="chat-question">{QUESTION}</p>

      {step === 0 && <p className="chat-status"><span className="pulse" aria-hidden="true" />Looking up sales data…</p>}

      {step >= 1 && <p className="chat-answer">
        {answer}{step === 1 && typing < 1 && <span className="caret" aria-hidden="true" />}
      </p>}

      {step >= 2 && <figure className={step === 2 ? "chat-chart is-broken" : "chat-chart"}>
        <figcaption>Revenue by region, Q3 <span>₹ Cr</span></figcaption>
        {step === 2 && <>
          <p className="chat-note is-error">✕ Chart asks for “{MISSING_COLUMN}”, which isn’t in the data.</p>
          <p className="chat-note"><span className="pulse" aria-hidden="true" />Caught. Asking the AI to fix it…</p>
        </>}
        {step >= 3 && ROWS.map(([label, value]) => <div className="bar" key={label}>
          <span>{label}</span>
          <div><i style={{ width: `${(value / MAX) * 100}%` }} /></div>
          <span>{value}</span>
        </div>)}
      </figure>}
    </div>
  </Story>;
};

export default AiChartStory;
