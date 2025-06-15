import React, { useEffect, useState } from "react";
import { ThemeProvider, Global } from "@emotion/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { globalStyles } from "./globalStyle";
import Home from "../components/home";
import Footer from "../components/footer";
import Skills from "../components/skills";

const Experience = React.lazy(() => import("../components/experience"));

const lightTheme = {
  background: "#fff",
  color: "#222",
};

const darkTheme = {
  background: "#222",
  color: "#fff",
};

function App() {
  const [dark, setDark] = useState(false);
  const theme = dark ? darkTheme : lightTheme;
  const items = ["HOME", "SKILLS", "EXPERIENCE"];
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    if (pathname == "/") {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "900px",
          margin: "15px auto",
        }}
      >
        <Navbar items={items} />
        <DarkModeSwitch
          style={{ marginBottom: "2rem" }}
          checked={dark}
          onChange={() => setDark(!dark)}
          size={40}
        />
      </div>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
