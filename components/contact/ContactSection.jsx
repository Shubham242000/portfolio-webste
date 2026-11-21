import { useState } from "react";
import ContactForm from "./contactForm";
import DecodeText from "../DecodeText";

const ContactSection = () => {
  const [form, setForm] = useState(false);
  return <section className="contact">
    <DecodeText className="section-label" text="04 / Get in touch" />
    <h2>Have something meaningful to build?</h2>
    <p className="contact-note">Always happy to talk code, swap travel tips, or share a playlist.</p>
    <button className="email-link" onClick={() => setForm(true)}>Let's talk</button>

    {form && <ContactForm onClose={() => setForm(!form)} />}

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
};

export default ContactSection;
