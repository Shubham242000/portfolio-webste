import React from "react";
import { useIsMobile } from "../../hooks";
import { useTheme } from "@emotion/react";
import {Highlighter} from "../../common";

const Home = () => {
  const theme = useTheme() as { background: string; color: string };
  const isDark = theme.background !== "#fff";
  const isPhone = useIsMobile();

  if (isPhone === null) return null;

  return (
    <div style={{ 
      display: "flex", 
      gap: "4rem"
    }}>
      <div style={{ 
        flexBasis: isPhone ? "100%" : "60%"
      }}>
        <h1 style={{ 
          fontSize: "3.75rem", 
          lineHeight: "3.2rem",
          marginBottom: "1rem",
          fontWeight: "700",
          color: theme.color,
        }}>
          Shubham Shrivastava
        </h1>
        
        <h2 style={{ 
          fontSize: isPhone ? "1.2rem" : "1.5rem",
          marginBottom: "1.5rem",
          opacity: 0.9,
        }}>
          Software Development Engineer - 2,{" "}
          <span
            style={{
              cursor: "pointer",
              textDecorationColor: "#0078d4",
              textUnderlineOffset: "3px",
              transition: "color 0.2s, text-decoration-color 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35em",
              color: "#0078d4",
            }}
            onClick={() =>
              window.open(
                "https://www.tellius.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
           
          >
            <Highlighter action="underline" color="#FF9800">  Tellius Private Ltd</Highlighter>
            <img
              src="https://cdn.prod.website-files.com/67fcfe6c0c7705918e4d7984/67ffc75fd418f7da8a28f65b_fav.svg"
              alt="Tellius logo"
              style={{
                width: 20,
                height: 20,
                verticalAlign: "middle",
              }}
            />
          </span>
        </h2>
        
        <p style={{ 
          fontSize: isPhone ? "1rem" : "1.25rem",
          lineHeight: "1.7",
          color: theme.color,
          opacity: 0.9,
        }}>
          I'm a{" "}
          <Highlighter action="underline" color="#FF9800">
            frontend engineer
          </Highlighter>{" "}
          passionate about building performant, user-centric web applications.
          <br />
          With 3+ years of experience, I specialize in{" "}
          <Highlighter action="highlight" color="#87CEFA" >
            ReactJS, NextJS, TypeScript, JavaScript
          </Highlighter>{" "}
          and scalable architecture. I enjoy solving real-world problems,
          contributing to design systems, and optimizing performance across Core
          Web Vitals. As a curious technologist, 
           
            I'm always exploring innovative
          
          ways to create meaningful impact through code.
        </p>
      </div>
      
      {!isPhone && (
        <div
          style={{
            flexBasis: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{
            position: "relative",
            borderRadius: "50%",
            padding: "8px",
            background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            boxShadow: isDark 
              ? "0 8px 32px rgba(0, 0, 0, 0.3)" 
              : "0 8px 32px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = isDark 
              ? "0 12px 40px rgba(0, 0, 0, 0.4)" 
              : "0 12px 40px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = isDark 
              ? "0 8px 32px rgba(0, 0, 0, 0.3)" 
              : "0 8px 32px rgba(0, 0, 0, 0.1)";
          }}
          >
            <img
              src="/my-image.jpeg"
              alt="Shubham Shrivastava"
              style={{
                width: "320px",
                height: "320px",
                objectFit: "cover",
                borderRadius: "50%",
                border: isDark ? "4px solid rgba(255, 255, 255, 0.1)" : "4px solid #fff",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Home);
