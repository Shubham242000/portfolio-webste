import { capabilities } from "../content/portfolio";

const CapabilitiesSection = () => (
  <section className="section capabilities">
    <div className="section-label">02 / Capabilities</div>
    <div className="capability-grid">
      {capabilities.map(([title, description], index) => <div className="capability" key={title}>
        <span>0{index + 1}</span><h3>{title}</h3><p>{description}</p>
      </div>)}
    </div>
  </section>
);

export default CapabilitiesSection;
