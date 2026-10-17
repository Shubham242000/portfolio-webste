import { useEffect, useState } from "react";
import Hobbies from "../components/Hobbies";
import PixelAvatar from "../components/PixelAvatar";
import ExperienceSection from "../components/ExperienceSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import ContactSection from "../components/ContactSection";
import OffTheClockSection from "../components/OffTheClockSection";
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
      <nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#off-the-clock">Off the clock</a><a href="#contact">Contact</a></nav>
      <button className="theme-toggle" type="button" onClick={toggleTheme}>{theme === "dark" ? "Light" : "Dark"}</button>
    </header>

    <main>
      <section className="hero" id="top">
        <div className="eyebrow">Frontend engineer · SDE-2 · 3+ yrs · Gurugram</div>
        <div className="hero-grid">
          <h1>I make complex<br />products feel<br />fast and simple.</h1>
          <div className="hero-aside">
            <PixelAvatar />
            <Hobbies />
          </div>
        </div>
        <div className="hero-intro">
          <p>I’m Shubham, a frontend engineer at <a href="https://paypay.co.in/" target="_blank" rel="noreferrer">PayPay India ↗</a>, building payment flows like gift vouchers and stamp cards. Before that, I built AI analytics interfaces at Tellius and made Bajaj Finserv Health’s pages 70% faster for 100K+ monthly visitors.</p>
          <a className="text-link" href="#experience">See my work <span>↓</span></a>
        </div>
      </section>

      <div id="experience" className="anchor"><ExperienceSection /></div>
      <div id="about" className="anchor"><CapabilitiesSection /></div>
      <div id="off-the-clock" className="anchor"><OffTheClockSection /></div>
      <div id="contact" className="anchor"><ContactSection /></div>
    </main>
  </div>;
}

export default App;
