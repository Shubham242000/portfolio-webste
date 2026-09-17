const ContactSection = () => (
  <section className="contact">
    <div className="section-label">03 / Get in touch</div>
    <h2>Have something meaningful to build?</h2>
    <a className="email-link" href="mailto:shubhamshrivastava2000@gmail.com">Let’s talk <span>↗</span></a>
    <div className="contact-footer">
      <span>© {new Date().getFullYear()} Shubham Shrivastava</span>
      <div>
        <a href="https://github.com/Shubham242000" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/shubham-shrivastava-2000/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://medium.com/@shubhamshrivastava2000" target="_blank" rel="noreferrer">Writing</a>
      </div>
    </div>
  </section>
);

export default ContactSection;
