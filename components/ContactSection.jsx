import DecodeText from "./DecodeText";
import QuoteBlock from "./QuoteBlock";

const ContactSection = () => (
  <section className="contact">
    <div className="contact-scenery" aria-hidden="true" />
    <DecodeText className="section-label" text="04 / Get in touch" />
    <div className="contact-stage">
      <h2>Have something meaningful to build?</h2>
      <a className="contact-cta" href="mailto:shubhamshrivastava2000@gmail.com"><span className="contact-cta-text">Let’s talk</span><span className="contact-cta-arrow" aria-hidden="true">↗</span></a>
      <p className="contact-note">Always happy to talk code, swap travel tips, or share a playlist.</p>
    </div>
    <QuoteBlock />
    <div className="contact-footer">
      <span>© {new Date().getFullYear()} Shubham Shrivastava</span>
      <div>
        <a href="https://github.com/Shubham242000" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/shubham-shrivastava-2000/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://medium.com/@shubhamshrivastava2000" target="_blank" rel="noreferrer">Writing</a>
        <a href="https://github.com/Shubham242000/portfolio-webste" target="_blank" rel="noreferrer">Source ↗</a>
      </div>
    </div>
  </section>
);

export default ContactSection;
