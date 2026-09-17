import { lazy, useEffect, useState } from "react";
import DeferredSection from "../components/DeferredSection";
import "./App.css";

const ExperienceSection = lazy(() => import("../components/ExperienceSection"));
const CapabilitiesSection = lazy(() => import("../components/CapabilitiesSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(preference.matches);
    const handleChange = (event) => setDark(event.matches);
    preference.addEventListener("change", handleChange);
    return () => preference.removeEventListener("change", handleChange);
  }, []);

  return <main className={dark ? "site site--dark" : "site"}>
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label="Shubham Shrivastava, home">SS<span>·</span></a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">Capabilities</a><a href="#contact">Contact</a></nav>
      <button className="theme-toggle" onClick={() => setDark((value) => !value)} aria-label="Toggle colour theme">{dark ? "Light" : "Dark"}</button>
    </header>

    <section className="hero" id="top">
      <div className="eyebrow">Frontend engineer · India</div>
      <div className="hero-grid">
        <h1>I build calm,<br />capable interfaces<br />for complex products.</h1>
        <div className="hero-aside">
          <img src="/my-image.jpeg" alt="Shubham Shrivastava" />
          <p>Currently building consumer fintech experiences at <a href="https://paypay.co.in/" target="_blank" rel="noreferrer">PayPay India ↗</a>.</p>
        </div>
      </div>
      <div className="hero-intro">
        <p>I’m Shubham, a frontend engineer with 4+ years of experience shaping fast, thoughtful web products. I care about the details that make software feel clear: performance, interaction, and a solid system underneath.</p>
        <a className="text-link" href="#work">Explore my experience <span>↓</span></a>
      </div>
    </section>

    <DeferredSection id="work"><ExperienceSection /></DeferredSection>
    <DeferredSection id="about"><CapabilitiesSection /></DeferredSection>
    <DeferredSection id="contact"><ContactSection /></DeferredSection>
  </main>;
}

export default App;
