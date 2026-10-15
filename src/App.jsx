import { useEffect, useState } from "react";
import PixelAvatar from "../components/PixelAvatar";
import ShowcaseSection from "../components/ShowcaseSection";
import ExperienceSection from "../components/ExperienceSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import ContactSection from "../components/ContactSection";
import "./App.css";

const readStoredTheme = () => {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
};

function App() {
  // index.html sets data-theme before first paint, so this never flashes the wrong theme.
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      if (!readStoredTheme()) setTheme(event.matches ? "dark" : "light");
    };
    preference.addEventListener("change", handleChange);
    return () => preference.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit only.
    }
  };

  return <div className="site">
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label="Shubham Shrivastava, home">SS<span>·</span></a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav>
      <button className="theme-toggle" type="button" onClick={toggleTheme}>{theme === "dark" ? "Light" : "Dark"}</button>
    </header>

    <main>
      <section className="hero" id="top">
        <div className="eyebrow">Frontend engineer · India</div>
        <div className="hero-grid">
          <h1>I build calm,<br />capable interfaces<br />for complex products.</h1>
          <div className="hero-aside">
            <div className="hero-photo" role="img" aria-label="Pixel-art portrait of Shubham Shrivastava"><PixelAvatar /></div>
            <p>Currently building consumer fintech experiences at <a href="https://paypay.co.in/" target="_blank" rel="noreferrer">PayPay India ↗</a>.</p>
          </div>
        </div>
        <div className="hero-intro">
          <p>I’m Shubham, a frontend engineer with 4+ years of experience shaping fast, thoughtful web products. I care about the details that make software feel clear: performance, interaction, and a solid system underneath.</p>
          <a className="text-link" href="#work">See it in action <span>↓</span></a>
        </div>
      </section>

      <div id="work" className="anchor"><ShowcaseSection /></div>
      <div id="experience" className="anchor"><ExperienceSection /></div>
      <div id="about" className="anchor"><CapabilitiesSection /></div>
      <div id="contact" className="anchor"><ContactSection /></div>
    </main>
  </div>;
}

export default App;
