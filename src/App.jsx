import Hobbies from "../components/Hobbies";
import Portrait from "../components/Portrait";
import ExperienceSection from "../components/ExperienceSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import ContactSection from "../components/contact/ContactSection";
import OffTheClockSection from "../components/OffTheClockSection";
import DecodeText from "../components/DecodeText";
import Clock from "../components/Clock";
import { useTheme } from "./hooks/useTheme";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useAwayTitle } from "./hooks/useAwayTitle";
import "./App.css";

function App() {
  const [theme, toggleTheme] = useTheme();
  useScrollReveal();
  useAwayTitle("i noticed you left");

  return <div className="site">
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label="Shubham Shrivastava, home">SS<span>·</span></a>
      <nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#off-the-clock">Off the clock</a><a href="#contact">Contact</a></nav>
      <button className="theme-toggle" type="button" onClick={toggleTheme}>{theme === "dark" ? "Light" : "Dark"}</button>
    </header>

    <main>
      <section className="hero" id="top">
        <div className="hero-status">
          <DecodeText className="eyebrow" text="Software engineer · SDE-2 · 3+ yrs · Gurugram" />
          <Clock />
        </div>
        <div className="hero-grid">
          <h1>I build things<br />for the web.</h1>
          <div className="hero-aside">
            <Portrait />
          </div>
          <div className="hero-intro">
            <p>Hey, I’m Shubham.</p>
            <p>Currently building payment experiences at <a href="https://paypay.co.in/" target="_blank" rel="noreferrer">PayPay ↗</a>, reaching <strong>80M+ users</strong>. Along the way, I’ve worked on AI-powered analytics at <a href="https://tellius.com/" target="_blank" rel="noreferrer">Tellius ↗</a> and built products serving millions at <a href="https://www.bajajfinservhealth.in/" target="_blank" rel="noreferrer">Bajaj Finserv Health ↗</a>.</p>
            <Hobbies />
          </div>
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
