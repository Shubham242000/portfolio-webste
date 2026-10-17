import { capabilities } from "../content/portfolio";
import DecodeText from "./DecodeText";

const CapabilitiesSection = () => (
  <section className="section capabilities">
    <DecodeText className="section-label" text="02 / Capabilities" />
    <div className="capability-grid">
      {capabilities.map(([title, description], index) => <div className="capability" key={title} data-reveal style={{ "--reveal-delay": `${index * 60}ms` }}>
        <span>0{index + 1}</span><h3>{title}</h3><p>{description}</p>
      </div>)}
    </div>
  </section>
);

export default CapabilitiesSection;
