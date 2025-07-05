import { useTheme } from "@emotion/react";
import { useIsMobile } from "../../hooks";
import React, { useState } from "react";

const Experience = () => {
  const items = [
    {
      header: "Software Development Engineer - 2 - Tellius",
      desc: `Recently joined the team at Tellius, currently working Kaiya — An AI-powered analytics assistant focused on conversational data exploration.
        <br />
        <br />`,
      dur: "June 2025 – Present",
      imgSrc: "https://cdn.prod.website-files.com/67fcfe6c0c7705918e4d7984/67ffc75fd418f7da8a28f65b_fav.svg",
      imgAlt: "Tellius"
    },
    {
      header: "Sofware Development Engineer - Bajaj Finserv Health Limited",
      desc: `Over the last 2+ years, I’ve built fast and scalable web applications focused on performance, SEO, and user experience. 
            I implemented Incremental Static Regeneration using Next.js, improving load times by 70%,
            <br />
            <br />
            I boosted Core Web Vitals and Lighthouse scores by 40% through lazy loading, asset optimization, 
            and code splitting. My SEO improvements using structured data helped scale traffic to over 100K users/month.
            <br />
            <br />
            I led the creation of a Design Language System to ensure consistency across teams, and architected the end-to-end OPD
            booking flow, resulting in a 40% increase in appointments. 
            <br />
            <br />
            I also independently built a complex healthcare workflow module and helped migrate a monolithic app into a 
            Microfrontend architecture to improve scalability and team autonomy.`,
      dur: "August 2023 - Present",
      imgSrc: "https://www.bajajfinservhealth.in/favicon.ico",
      imgAlt: "Bajaj Finserv Health"
    },
    {
      header: "Sofware Development Intern - Bajaj Finserv Health Limited",
      dur: "August 2022 - August 2023",
      desc: `I implemented custom tracking headers across API requests, improving visibility through ELK dashboards and helping reduce logged errors by 20%. 
              <br />
              <br />
              I also led the development of the Medicard product flow, integrating APIs, managing complex state, and optimizing the UI for performance.
              <br />
              <br />
              Using tools like React Profiler and custom hooks, I reduced unnecessary re-renders and improved overall responsiveness. To ensure long-term maintainability, I standardized the codebase with reusable context providers, consistent error handling, and server API wrappers to simplify data fetching across the app.`,
      imgSrc: "https://www.bajajfinservhealth.in/favicon.ico",
      imgAlt: "Bajaj Finserv Health"
    },
    {
      header: "Web Development Intern - Robofied",
      dur: "October 2021 - December 2021",
      desc: `I built responsive and accessible UIs using React and Material UI, 
            ensuring fast load times and smooth experiences across devices. 
            <br />
            <br />
            I handled complex data flows using Redux, Redux-Saga, and Context API, making state management predictable and scalable.
            <br />
            <br />
           For the company’s internal dashboards, I developed and maintained a library of reusable React components, improving UI consistency and performance. 
           Through memoization and render optimizations, I reduced re-renders and enhanced responsiveness in key workflows.`,
      imgSrc: "https://avatars.githubusercontent.com/u/46285577?s=200&v=4",
      imgAlt: "Robofied"
    },
    {
      header: "Web Development Intern - Nirvann Applications Private Limited",
      dur: "February 2021 - April 2021",
      desc: `At an early-stage startup, I worked closely with founders and CTOs to define and standardize the digital presence for three unique brands. 
             <br />
             <br /> 
            I built fully responsive UIs using React, Bootstrap, and vanilla JavaScript, ensuring cross-browser compatibility and accessibility.
             <br />
             <br /> 
            By leveraging memoization and dynamic imports, I reduced initial load times by 30%, resulting in smoother performance on low-bandwidth networks. Post-internship, I continued as a core contributor, mentoring new interns and driving UI performance improvements across key modules.`,
      imgSrc: "https://utsavapp.in/favicon.ico",
      imgAlt: "Utsav App"
    },
  ];
  const isPhone = useIsMobile();
  const [showTooltip, setShowTooltip] = useState(false);

  if (isPhone === null) return null;
  return (
    <div>
      <div
        style={{
          display: isPhone ? "block" : "flex",
          justifyContent: "space-between",
          alignItems: isPhone ? "stretch" : "center",
          marginBottom: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "3.75rem",
            margin: 0,
            marginBottom: isPhone ? "1rem" : 0,
          }}
        >
          Experience
        </h1>
        <div style={{ position: "relative", display: "inline-block" }}>
          <a
            href="https://drive.google.com/file/d/1JSWByscgLOdYe607glYzRAMSgtlNZ1Mf/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: isPhone ? "0.5rem 1rem" : "0.7rem 1.5rem",
              background: "#0078d4",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: isPhone ? "1rem" : "1.1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              transition: "background 0.2s",
              display: "inline-block",
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#005fa3";
              setShowTooltip(true);
            }}
            onFocus={() => setShowTooltip(true)}
            onMouseOut={e => {
              e.currentTarget.style.background = "#0078d4";
              setShowTooltip(false);
            }}
            onBlur={() => setShowTooltip(false)}
          >
            Resume
          </a>
          {showTooltip && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "120%",
                background: "#222",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.95rem",
                whiteSpace: "nowrap",
                zIndex: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                pointerEvents: "none",
              }}
            >
              Last Updated : 1st June 2025
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "100%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "7px solid transparent",
                  borderRight: "7px solid transparent",
                  borderTop: "7px solid #222",
                  content: '""',
                }}
              />
            </div>
          )}
        </div>
      </div>
      {items.map((exp) => (
        <ExpComp key={`heading-${exp.header}`} exp={exp} />
      ))}
    </div>
  );
};

export default React.memo(Experience);

const ExpComp = ({
  exp,
}: {
  exp: {
    header: string; desc: string; dur: string, imgSrc: string;
    imgAlt: string;
  };
}) => {
  const isPhone = useIsMobile();
  const theme = useTheme() as {
    background: string;
    color: string;
    dur: string;
  };
  const bg = theme.background === "#fff" ? "#f5f7fa" : "#2d3440";

  return (
    <div style={{ margin: "2rem 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontWeight: 500,
            margin: "0.5rem 0",
            fontSize: isPhone ? "1.1rem" : "1.35rem",
          }}
        >
          {exp.header}
          <img
            src={exp.imgSrc ?? ""}
            alt={exp.imgAlt ?? ""}
            style={{
              width: 24,
              height: 24,
              padding: "0 5px",
              marginRight: 6,
              verticalAlign: "middle",
            }}
          />
        </h3>
        {!isPhone && (
          <span
            style={{
              color:
                theme.background === "#fff"
                  ? "rgba(60,60,60,0.5)"
                  : "rgba(200,200,200,0.4)",
              fontSize: "1rem",
              fontWeight: 400,
            }}
          >
            {exp.dur}
          </span>
        )}
      </div>

      <p
        style={{
          background: bg,
          padding: "2rem",
          borderRadius: "12px",
          margin: 0,
          color: theme.color,
          fontSize: isPhone ? "0.95rem" : "1.1rem",
        }}
        dangerouslySetInnerHTML={{ __html: exp.desc }}
      />
    </div>
  );
};
