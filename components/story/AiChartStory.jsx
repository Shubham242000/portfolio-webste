import Story from "./Story";
import { useProgress, useStory } from "./useStory";

const QUESTION = "How did each region do last quarter?";
const ANSWER = "North led with ₹4.2 Cr, up 18%. West held steady and South grew 9%. East dipped 6%, mostly because two large customers renewed late.";
const MISSING_COLUMN = "revenue_q3_inr";
const ROWS = [["North", 4.2], ["West", 3.6], ["South", 3.1], ["East", 1.9]];
const MAX = Math.max(...ROWS.map(([, value]) => value));

const steps = [
  { caption: "You ask a question in everyday language.", tech: "POST /chat opens a server-sent events (SSE) stream", duration: 2200 },
  { caption: "The AI looks up the right numbers.", tech: "tool_use event · query sales.revenue_by_region", duration: 2400 },
  { caption: "The answer appears word by word, so you’re never left staring at a spinner.", tech: "text deltas rendered as they arrive · first token ≈ 120ms", duration: 4200 },
  { caption: "The AI also writes the chart, but it points at a column that isn’t in the data.", tech: `LLM returns Highcharts config directly; a series references "${MISSING_COLUMN}"`, duration: 3200 },
  { caption: "A quick check catches the mistake before anyone sees a broken chart, and asks the AI to try again.", tech: "config fields validated against dataset columns → 1 missing → regenerate", duration: 3200 },
  { caption: "The corrected chart appears.", tech: "valid config rendered as-is, with no intermediate chart format to translate", duration: 3000 },
];
const durations = steps.map((item) => item.duration);

const AiChartStory = () => {
  const story = useStory(durations);
  const { step, status } = story;
  const typing = useProgress(step === 2 && status === "playing", 3400);
  const answer = step === 2 ? ANSWER.slice(0, Math.round(ANSWER.length * typing)) : ANSWER;

  return <Story
    story={story}
    steps={steps}
    result="Answers start appearing almost immediately, and a broken chart never reaches the screen."
  >
    <div className="chat">
      <p className="chat-question">{QUESTION}</p>

      {step === 1 && <p className="chat-status"><span className="pulse" aria-hidden="true" />Looking up sales data…</p>}

      {step >= 2 && <p className="chat-answer">
        {answer}{step === 2 && typing < 1 && <span className="caret" aria-hidden="true" />}
      </p>}

      {step >= 3 && <figure className={step === 3 ? "chat-chart is-broken" : step === 4 ? "chat-chart is-checking" : "chat-chart"}>
        <figcaption>Revenue by region, Q3 <span>₹ Cr</span></figcaption>
        {step === 3 && <p className="chat-note is-error">This chart asks for “{MISSING_COLUMN}”, a column that isn’t in the data.</p>}
        {step === 4 && <p className="chat-note"><span className="pulse" aria-hidden="true" />Caught it. Asking the AI for a corrected chart…</p>}
        {step >= 5 && ROWS.map(([label, value]) => <div className="bar" key={label}>
          <span>{label}</span>
          <div><i style={{ width: `${(value / MAX) * 100}%` }} /></div>
          <span>{value}</span>
        </div>)}
      </figure>}
    </div>
  </Story>;
};

export default AiChartStory;
