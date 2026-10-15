import { useRef, useState } from "react";
import AiChartStory from "./story/AiChartStory";
import FastPagesStory from "./story/FastPagesStory";
import { articles } from "../content/portfolio";

const work = [
  {
    id: "ai-charts",
    title: "AI that draws its own charts",
    context: "Tellius · 2025–26",
    metrics: [["<200ms", "until the answer starts"], ["1 layer", "of chart translation removed"]],
    part: "Redesigned the pipeline so the AI’s chart config renders directly in React, with validation and retry, and built the streaming answer UI.",
    tags: ["React", "SSE streaming", "Highcharts", "LLM output validation"],
    article: articles[0],
    Demo: AiChartStory,
  },
  {
    id: "fast-pages",
    title: "Pages that load instantly",
    context: "Bajaj Finserv Health · 2024",
    metrics: [["70%", "faster page loads"], ["100K+", "visitors a month"]],
    part: "Set up Incremental Static Regeneration with Next.js middleware, plus device-aware rewrites so phones get a lighter page.",
    tags: ["Next.js ISR", "Middleware", "Rewrites", "Core Web Vitals"],
    article: articles[1],
    Demo: FastPagesStory,
  },
];

const ShowcaseSection = () => {
  const gridRef = useRef(null);
  const [active, setActive] = useState(0);

  // On phones the cards become a swipeable row; track which one is in view for the dots.
  const onScroll = () => {
    const grid = gridRef.current;
    const card = grid.firstElementChild;
    setActive(Math.round(grid.scrollLeft / (card.offsetWidth + 12)));
  };

  const goTo = (index) => {
    const grid = gridRef.current;
    grid.scrollTo({ left: grid.children[index].offsetLeft - grid.offsetLeft - 20, behavior: "smooth" });
  };

  return <section className="section">
    <div className="section-label">01 / In practice</div>
    <div className="section-heading section-heading--split">
      <div>
        <h2>Things I’ve built, and written about.</h2>
        <p className="section-note">Two problems I solved, each played out in a few seconds.</p>
      </div>
      <a className="text-link" href="https://medium.com/@shubhamshrivastava2000" target="_blank" rel="noreferrer">All writing <span>↗</span></a>
    </div>

    <div className="work-grid" ref={gridRef} onScroll={onScroll}>
      {work.map((item) => {
        const { id, title, context, metrics, part, tags, article, Demo } = item;
        return <article className="work-card" key={id}>
        <header>
          <span className="work-context">{context}</span>
          <h3>{title}</h3>
          <dl className="work-metrics">
            {metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </header>

        <Demo />

        <footer>
          <p className="work-part"><span>My part</span>{part}</p>
          <ul className="work-tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          <a className="work-article" href={article.href} target="_blank" rel="noreferrer">Read the story · {article.date} <span>↗</span></a>
        </footer>
      </article>;
      })}
    </div>

    <div className="work-dots" aria-hidden="true">
      {work.map((item, index) => <button key={item.id} type="button" tabIndex={-1} className={index === active ? "is-active" : ""} onClick={() => goTo(index)} />)}
    </div>
  </section>;
};

export default ShowcaseSection;
