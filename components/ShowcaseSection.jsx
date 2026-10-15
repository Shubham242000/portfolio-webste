import { useRef, useState } from "react";
import AiChartStory from "./story/AiChartStory";
import FastPagesStory from "./story/FastPagesStory";
import { articles } from "../content/portfolio";

const showcases = [
  { id: "ai-charts", label: "AI that draws its own charts", context: "Tellius · 2025–26", article: articles[0], Demo: AiChartStory },
  { id: "fast-pages", label: "Pages that load instantly", context: "Bajaj Finserv Health · 2024", article: articles[1], Demo: FastPagesStory },
];

const ShowcaseSection = () => {
  const [active, setActive] = useState(showcases[0].id);
  const tabRefs = useRef({});
  const showcase = showcases.find((item) => item.id === active);
  const { Demo } = showcase;

  const onKeyDown = (event) => {
    const index = showcases.findIndex((item) => item.id === active);
    const offset = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!offset) return;
    const next = showcases[(index + offset + showcases.length) % showcases.length];
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return <section className="section">
    <div className="section-label">01 / In practice</div>
    <div className="section-heading section-heading--split">
      <div>
        <h2>Things I’ve built, and written about.</h2>
        <p className="section-note">Short stories from real projects. They play on their own; tap any step to jump to it.</p>
      </div>
      <a className="text-link" href="https://medium.com/@shubhamshrivastava2000" target="_blank" rel="noreferrer">All writing <span>↗</span></a>
    </div>

    <div className="tabs" role="tablist" aria-label="Stories" onKeyDown={onKeyDown}>
      {showcases.map((item) => <button
        key={item.id}
        ref={(element) => { tabRefs.current[item.id] = element; }}
        type="button"
        role="tab"
        id={`tab-${item.id}`}
        aria-selected={active === item.id}
        aria-controls={`panel-${item.id}`}
        tabIndex={active === item.id ? 0 : -1}
        className="tab"
        onClick={() => setActive(item.id)}
      >{item.label}<span>{item.context}</span></button>)}
    </div>

    <div role="tabpanel" id={`panel-${showcase.id}`} aria-labelledby={`tab-${showcase.id}`}>
      <Demo key={showcase.id} />
      <a className="showcase-article" href={showcase.article.href} target="_blank" rel="noreferrer">
        <span>The full story · {showcase.article.date}</span>
        {showcase.article.title} <i>↗</i>
      </a>
    </div>
  </section>;
};

export default ShowcaseSection;
