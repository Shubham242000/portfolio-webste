import { useTheme } from "@emotion/react";
import { useIsMobile } from "../../hooks";
import React, { useState, useEffect } from "react";

const Experience = () => {
  const theme = useTheme() as {
    background: string;
    color: string;
    dur: string;
  };
  const isDark = theme.background !== "#fff";
  const [animateItems, setAnimateItems] = useState(false);
  
  const items = [
    {
      header: "Software Development Engineer - 2 - Tellius",
      desc: `Recently joined Tellius, working on Kaiya (an AI-driven analytics assistant) as well as core platform features like dashboards, vizpads, authentication, and custom views.
        <br />`,
      dur: "June 2025 – Present",
      imgSrc: "https://cdn.prod.website-files.com/67fcfe6c0c7705918e4d7984/67ffc75fd418f7da8a28f65b_fav.svg",
      imgAlt: "Tellius",
      companyUrl: "https://tellius.com",
      location: "Bengalore, India | Hybrid"
    },
    {
      header: "Sofware Development Engineer - Bajaj Finserv Health Limited",
      desc: `Over the last 2+ years, I've built fast and scalable web applications focused on performance, SEO, and user experience. 
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
      dur: "August 2023 - June 2025",
      imgSrc: "https://www.bajajfinservhealth.in/favicon.ico",
      imgAlt: "Bajaj Finserv Health",
      companyUrl: "https://bajajfinservhealth.in",
      location: "Pune, India"
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
      imgAlt: "Bajaj Finserv Health",
      companyUrl: "https://bajajfinservhealth.in",
      location: "Pune, India"
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
           For the company's internal dashboards, I developed and maintained a library of reusable React components, improving UI consistency and performance. 
           Through memoization and render optimizations, I reduced re-renders and enhanced responsiveness in key workflows.`,
      imgSrc: "https://avatars.githubusercontent.com/u/46285577?s=200&v=4",
      imgAlt: "Robofied",
      companyUrl: "https://robofied.com",
      location: "Remote"
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
      imgAlt: "Utsav App",
      companyUrl: "https://utsavapp.in",
      location: "Remote"
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
          marginBottom: "2rem",
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
            // older:  href="https://drive.google.com/file/d/1JSWByscgLOdYe607glYzRAMSgtlNZ1Mf/view?usp=sharing"
            href="https://drive.google.com/file/d/1t5EcYKCG5aaFAVoEAx9GEc4sfl_U_5MG/view?usp=sharing"
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
              Last Updated : 29 November 2025
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
      
      {/* Stepper Container */}
      <div style={{ position: "relative" }}>
        {/* Timeline Connector Line */}
        <div
          style={{
            position: "absolute",
            left: "12px",
            top: "40px",
            bottom: "40px",
            width: "2px",
            background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            zIndex: 0,
          }}
        />
        
        {items.map((exp, index) => (
          <StepperItem 
            key={`stepper-${index}`} 
            exp={exp} 
            index={index} 
            isLast={index === items.length - 1}
            isPhone={isPhone}
            animate={animateItems}
            animationDelay={index * 150}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Experience);

const StepperItem = ({
  exp,
  index,
  isLast,
  isPhone,
  animate,
  animationDelay,
}: {
  exp: {
    header: string; 
    desc: string; 
    dur: string; 
    imgSrc: string;
    imgAlt: string;
    companyUrl: string;
    location: string;
  };
  index: number;
  isLast: boolean;
  isPhone: boolean;
  animate: boolean;
  animationDelay: number;
}) => {
  const theme = useTheme() as {
    background: string;
    color: string;
    dur: string;
  };
  const bg = theme.background === "#fff" ? "#f5f7fa" : "#2d3440";
  const isDark = theme.background !== "#fff";

  return (
    <div style={{ 
      position: "relative", 
      marginBottom: isLast ? "0" : "3rem",
      opacity: 1,
      transform: animate ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease-out ${animationDelay}ms, transform 0.6s ease-out ${animationDelay}ms`,
    }}>
      {/* Timeline Dot */}
      <div
        style={{
          position: "absolute",
          left: "6px",
          top: "1.5rem",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: index === 0 ? "#0078d4" : "#6c757d",
          border: "3px solid",
          borderColor: isDark ? "#2d3440" : "#f5f7fa",
          zIndex: 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      />

      {/* Content Card */}
      <div
        style={{
          background: bg,
          borderRadius: "16px",
          padding: "1.5rem",
          marginLeft: "2rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
            flexWrap: isPhone ? "wrap" : "nowrap",
            gap: "0.5rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontWeight: 600,
                margin: "0 0 0.5rem 0",
                fontSize: isPhone ? "1.1rem" : "1.35rem",
                color: theme.color,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <img
                  src={exp.imgSrc ?? ""}
                  alt={exp.imgAlt ?? ""}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "4px",
                    objectFit: "cover",
                    transition: "transform 0.2s, filter 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.filter = "brightness(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "brightness(1)";
                  }}
                />
                {exp.header}
              </a>
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: isDark ? "rgba(200,200,200,0.7)" : "rgba(60,60,60,0.7)",
                fontSize: "0.9rem",
                fontWeight: 500,
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {exp.location}
              </span>
              <span>•</span>
              {exp.dur}
              {index === 0 && (
                <span
                  style={{
                    background: "#0078d4",
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    marginLeft: "0.5rem",
                  }}
                >
                  Current
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            color: theme.color,
            fontSize: isPhone ? "0.95rem" : "1rem",
            lineHeight: "1.6",
            opacity: 0.9,
          }}
          dangerouslySetInnerHTML={{ __html: exp.desc }}
        />

        {/* Company Website Link */}
        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }}>
          <a
            href={exp.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#0078d4",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#005fa3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#0078d4";
            }}
          >
            Visit Company Website
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
