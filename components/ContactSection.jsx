import DecodeText from "./DecodeText";

const ContactSection = () => (
  <section className="contact">
    <DecodeText className="section-label" text="04 / Get in touch" />
    <h2>Have something meaningful to build?</h2>
    <p className="contact-note">Always happy to talk frontend, swap travel tips, or share a playlist.</p>
    <a className="email-link" href="mailto:shubhamshrivastava2000@gmail.com">Let’s talk <span>↗</span></a>
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
