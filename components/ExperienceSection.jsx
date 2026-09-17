import { experience } from "../content/portfolio";

const ExperienceSection = () => (
  <section className="section">
    <div className="section-label">01 / Experience</div>
    <div className="section-heading"><h2>A few places I’ve helped move things forward.</h2></div>
    <div className="experience-list">
      {experience.map((item) => <article className="experience-item" key={`${item.company}-${item.role}`}>
        <div className="experience-meta"><span>{item.period}</span><span>{item.place}</span></div>
        <div className="experience-body">
          <h3><a href={item.href} target="_blank" rel="noreferrer">{item.company} <span>↗</span></a></h3>
          <p className="role">{item.role}</p>
          <p>{item.summary}</p>
          {item.outcomes && <ul>{item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>}
        </div>
      </article>)}
    </div>
    <a className="button-link" href="https://drive.google.com/file/d/1secfLjG2jAxmV4wsVbBCw9oLqwsDtO97/view?usp=sharing" target="_blank" rel="noreferrer">View résumé <span>↗</span></a>
  </section>
);

export default ExperienceSection;
