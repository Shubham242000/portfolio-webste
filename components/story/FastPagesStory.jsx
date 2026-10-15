import Story from "./Story";
import { useProgress, useStory } from "./useStory";

const BUILD_SECONDS = 1.8;

const steps = [
  { caption: "Someone opens a hospital page on their phone.", tech: "GET /hospital/apollo-pune · User-Agent: iPhone Safari", duration: 2200 },
  { caption: "The site spots that it’s a phone and serves the mobile version. The web address stays the same.", tech: "Next.js middleware + ua-parser-js → rewrite to /mobile/hospital/apollo-pune", duration: 3200 },
  { caption: "Nobody has opened this page yet, so it’s built from scratch. That takes a moment.", tech: "ISR cache MISS → getStaticProps renders the page", duration: 3000 },
  { caption: "The finished page is saved. The next visitor gets it almost instantly.", tech: "ISR cache HIT → cached HTML served in ≈ 40ms", duration: 2800 },
  { caption: "A minute later the saved copy may be out of date, but visitors still get it instantly…", tech: "revalidate: 60 → page is stale, still served immediately", duration: 3000 },
  { caption: "…while a fresh copy is quietly built in the background for everyone after.", tech: "stale-while-revalidate: regeneration runs after the response is sent", duration: 3000 },
];
const durations = steps.map((item) => item.duration);

const visits = [
  { from: 2, who: "Visitor 1", time: `${BUILD_SECONDS}s`, note: "Built from scratch", slow: true },
  { from: 3, who: "Visitor 2", time: "0.04s", note: "Saved copy" },
  { from: 4, who: "Visitor 3 · a minute later", time: "0.04s", note: "Saved copy, slightly old" },
];

const FastPagesStory = () => {
  const story = useStory(durations);
  const { step, status } = story;
  const building = useProgress(step === 2 && status === "playing", 2200);
  const refreshing = useProgress(step === 5 && status === "playing", 2000);

  return <Story
    story={story}
    steps={steps}
    result="Almost every visitor gets an instant page, and the content is never more than a minute behind."
  >
    <div className="pages">
      <div className="phone" aria-label="Phone showing the hospital page">
        <div className="phone-bar">…/hospital/apollo-pune</div>
        <div className="phone-screen">
          {step <= 1 && <p className="phone-loading"><span className="pulse" aria-hidden="true" />Loading…</p>}
          {step === 2 && <div className="phone-building">
            <p>Building the page…</p>
            <div className="meter"><i style={{ width: `${building * 100}%` }} /></div>
            <span>{(building * BUILD_SECONDS).toFixed(1)}s</span>
          </div>}
          {step >= 3 && <div className="phone-page">
            <div className="phone-hero" />
            <strong>Apollo Hospital, Pune</strong>
            <i /><i /><i className="short" />
            <span className="phone-cta">Book appointment</span>
          </div>}
        </div>
        {step >= 1 && <span className="phone-tag">Mobile version</span>}
      </div>

      <div className="pages-side">
        {step === 1 && <p className="pages-callout">Phone detected → showing the mobile layout. The address doesn’t change.</p>}
        {step === 4 && <p className="pages-callout">One minute later</p>}
        {step === 5 && <p className="pages-callout">{refreshing < 1 ? <><span className="pulse" aria-hidden="true" />Refreshing the saved copy in the background…</> : "✓ Fresh copy saved for the next visitor"}</p>}

        <ol className="visits">
          {visits.filter((visit) => step > visit.from || (step === visit.from && (!visit.slow || building === 1))).map((visit) => <li key={visit.who} className={visit.slow ? "is-slow" : ""}>
            <span>{visit.who}</span>
            <strong>{visit.time}</strong>
            <span>{visit.note}</span>
          </li>)}
        </ol>
      </div>
    </div>
  </Story>;
};

export default FastPagesStory;
