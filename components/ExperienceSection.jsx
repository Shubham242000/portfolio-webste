import { useState } from "react";
import { experience } from "../content/portfolio";
import DecodeText from "./DecodeText";

const ExperienceSection = () => {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (key) => setOpen((current) => {
    const next = new Set(current);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  });

  const main = experience.filter((item) => !item.early);
  const early = experience.filter((item) => item.early);

  return <section className="section">
    <DecodeText className="section-label" text="01 / Experience" />
    <div className="section-heading section-heading--split" data-reveal>
      <h2>Where I’ve helped move things forward.</h2>
      <a className="text-link" href="https://drive.google.com/file/d/1x1w2ND9Q5H6HVxhoruyR0NBjad696SMf/view?usp=sharing" target="_blank" rel="noreferrer">Résumé <span>↗</span></a>
    </div>
    <div className="experience-list">
      {main.map((item, index) => {
        const key = `${item.company}-${item.role}`;
        const expanded = open.has(key);
        return <article className="experience-item" key={key} data-reveal style={{ "--reveal-delay": `${index * 70}ms` }}>
          <div className="experience-meta"><span>{item.period}</span><span>{item.place}</span></div>
          <div className="experience-body">
            <h3><a href={item.href} target="_blank" rel="noreferrer">{item.company} <span>↗</span></a></h3>
            <p className="role">{item.role}</p>
            <p>{item.summary}</p>
            {item.caseStudy && <a className="case-study" href={item.caseStudy.href} target="_blank" rel="noreferrer">
              <span>Case study · {item.caseStudy.date}</span>
              <strong>{item.caseStudy.title} <i>↗</i></strong>
              {item.caseStudy.line}
            </a>}
            {item.outcomes && <>
              <button type="button" className="experience-toggle" aria-expanded={expanded} aria-controls={`outcomes-${key}`} onClick={() => toggle(key)}>
                {expanded ? "Hide outcomes −" : `${item.outcomes.length} outcomes +`}
              </button>
              <div id={`outcomes-${key}`} className={`experience-outcomes${expanded ? " is-open" : ""}`}>
                <ul>{item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
              </div>
            </>}
          </div>
        </article>;
      })}
      {early.length > 0 && <article className="experience-item">
        <div className="experience-meta"><span>Earlier</span><span>Internships</span></div>
        <div className="experience-body">
          {early.map((item) => <p className="experience-early" key={item.company}>
            <a href={item.href} target="_blank" rel="noreferrer">{item.company} <span>↗</span></a>
            <span>{item.role} · {item.period}</span>
          </p>)}
        </div>
      </article>}
    </div>
  </section>;
};

export default ExperienceSection;
