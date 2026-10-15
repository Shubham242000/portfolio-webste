import Story from "./Story";
import { useProgress, useStory } from "./useStory";

const BUILD_SECONDS = 1.8;

const steps = [
  { caption: "A visitor opens a page on their phone. The site serves the mobile version.", duration: 2800 },
  { caption: "First visit: the page is built once.", duration: 3000 },
  { caption: "Everyone after gets the saved copy, almost instantly.", duration: 2600 },
  { caption: "A minute later it’s refreshed quietly in the background. Still instant.", duration: 3200 },
];
const durations = steps.map((item) => item.duration);

const visits = [
  { from: 1, who: "Visitor 1", time: `${BUILD_SECONDS}s`, note: "Built once", slow: true },
  { from: 2, who: "Visitor 2", time: "0.04s", note: "Saved copy" },
  { from: 3, who: "A minute later", time: "0.04s", note: "Saved copy, refreshed after" },
];

const FastPagesStory = () => {
  const story = useStory(durations);
  const { step, running } = story;
  const building = useProgress(step === 1 && running, 2200);

  return <Story story={story} steps={steps}>
    <div className="pages">
      <div className="phone" aria-label="Phone showing a hospital page">
        <span className="phone-tag">Mobile version</span>
        <div className="phone-bar">…/hospital/apollo-pune</div>
        <div className="phone-screen">
          {step === 0 && <p className="phone-loading"><span className="pulse" aria-hidden="true" />Loading…</p>}
          {step === 1 && <div className="phone-building">
            <p>Building…</p>
            <div className="meter"><i style={{ width: `${building * 100}%` }} /></div>
            <span>{(building * BUILD_SECONDS).toFixed(1)}s</span>
          </div>}
          {step >= 2 && <div className="phone-page">
            <div className="phone-hero" />
            <strong>Apollo Hospital, Pune</strong>
            <i /><i /><i className="short" />
            <span className="phone-cta">Book appointment</span>
          </div>}
        </div>
      </div>

      <ol className="visits">
        {visits.filter((visit) => step > visit.from || (step === visit.from && (!visit.slow || building === 1))).map((visit) => <li key={visit.who} className={visit.slow ? "is-slow" : ""}>
          <span>{visit.who}</span>
          <strong>{visit.time}</strong>
          <span>{visit.note}</span>
        </li>)}
      </ol>
    </div>
  </Story>;
};

export default FastPagesStory;
