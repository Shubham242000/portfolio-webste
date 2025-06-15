import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useMemo } from "react";
import { useIsMobile } from "../../hooks";

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

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ flexBasis: isPhone ? "100%" : "50%" }}>
        <h1 style={{ fontSize: "3.75rem", lineHeight: "2rem" }}>Skills</h1>
        {skills.map((skill) => (
          <SkillComp key={`heading-${skill.header}`} skill={skill} />
        ))}
      </div>

      {!isPhone && (
        <div style={{ flexBasis: "50%", alignSelf: "flex-start" }}>
          <DotLottieReact
            src="https://lottie.host/cfb39f8f-32b4-425d-9d64-bbbc529308f7/XVLOw0zXsE.lottie"
            loop
            autoplay
          />
        </div>
      )}
    </div>
  );
};

export default Skills;

const SkillComp = ({
  skill,
}: {
  skill: { header: string; items: string[] };
}) => {
  return (
    <div style={{ lineHeight: "1.2rem" }}>
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
