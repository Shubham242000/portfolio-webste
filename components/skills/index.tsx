import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useMemo } from "react";
import { useTheme } from "@emotion/react";
import { useIsMobile } from "../../hooks";
import "./style.css";

const Skills = () => {
  const skills = useMemo(() => {
    return [
      {
        header: "Programming Languages",
        items: [
          "ReactJS",
          "NextJS",
          "Typescript",
          "JavaScript",
          "HTML",
          "CSS",
          "C / C++",
        ],
      },
      {
        header: "State Management & Tools",
        items: [
          "Redux",
          "Redux-Saga",
          "Context API",
          "Material UI",
          "Bootstrap",
          "EmotionJS",
        ],
      },
      {
        header: "Dev Tools",
        items: ["NGINX", "CMS", "Git", "Azure", "REST APIs"],
      },
      {
        header: "Performance & SEO",
        items: [
          "Core Web Vitals",
          "Lighthouse Optimization",
          "Structured Data (JSON-LD)",
          "Lazy Loading",
        ],
      },
      {
        header: "Concepts",
        items: ["Object Oriented Programming", "Data Structures & Algorithms"],
      },
    ] as {
      header: string;
      items: string[];
    }[];
  }, []);

  const isPhone = useIsMobile();
  if (isPhone === null) return null;
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ flexBasis: isPhone ? "100%" : "80%" }}>
        <h1 style={{ fontSize: "3.75rem", lineHeight: "2rem" }}>Skills</h1>
        {skills.map((skill) => (
          <SkillComp key={`heading-${skill.header}`} skill={skill} />
        ))}
      </div>

      {!isPhone && (
        <div>
          <div style={{ flexBasis: "50%", alignSelf: "flex-start" }}>
            <DotLottieReact
              src="https://lottie.host/cfb39f8f-32b4-425d-9d64-bbbc529308f7/XVLOw0zXsE.lottie"
              loop
              autoplay
            />
          </div>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              margin: "auto",
              width: "70%",
              flexWrap: "wrap", // Allow images to wrap to the next line
              gap: "20px", // Add spacing between images
              justifyContent: "center", // Center the images horizontally
              alignItems: "center", // Align the images vertically
              padding: "20px", // Add padding around the container
            }}
          >
            {[
              { src: "./javascript.png", alt: "JavaScript" },
              { src: "/react.png", alt: "ReactJS" },
              { src: "/typescript.png", alt: "TypeScript" },
              { src: "/nextjs.png", alt: "NextJS" },
              { src: "/html.png", alt: "HTML" },
              { src: "/css.png", alt: "CSS" },
              { src: "/cpp.png", alt: "C++" },
              { src: "/redux.png", alt: "Redux" },
              { src: "/mui.png", alt: "Material UI" },
              { src: "/nginx.png", alt: "NGINX" },
              { src: "/git.png", alt: "Git" },
              { src: "/azure.png", alt: "Azure" },
              { src: "/docker.png", alt: "Docker" },
            ].map((image, index) => (
              <div key={index} className="tooltip-container">
                <img
                  width={50}
                  height={50}
                  src={image.src}
                  alt={image.alt}
                  className="styled-image"
                />
                <span className="tooltip-text">{image.alt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
//
export default React.memo(Skills);

const SkillComp = ({
  skill,
}: {
  skill: { header: string; items: string[] };
}) => {
  const theme = useTheme() as { background: string; color: string };
  const bg = theme.background === "#fff" ? "#f5f7fa" : "#2d3440";

  return (
    <div
      style={{
        lineHeight: "1.2rem",
        background: bg,
        borderRadius: "10px",
        padding: "0.6rem",
        marginBottom: "0.6rem",
        color: theme.color,
      }}
    >
      <h3 style={{ fontWeight: 500, margin: "0.5rem 0" }}>{skill.header}</h3>
      <p>
        {skill.items.map((c_skill, idx) => (
          <span key={c_skill}>
            {c_skill}
            {idx < skill.items.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
};
