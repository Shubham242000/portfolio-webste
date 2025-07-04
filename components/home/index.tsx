import React from "react";
import { useIsMobile } from "../../hooks";

const Home = () => {
  const isPhone = useIsMobile();
  if (isPhone === null) return null;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexBasis: isPhone ? "100%" : "50%" }}>
        <h1 style={{ fontSize: "3.75rem", lineHeight: "3.2rem" }}>
          Shubham Shrivastava
        </h1>
        <h2 style={{ fontSize: "1.5rem" }}>
          Software Development Engineer - 2,{" "}
          <span
          // #0078D3
            style={{
              color: "#0078D3",
              cursor: "pointer",
              textDecorationColor: "#90caf9",
              textUnderlineOffset: "3px",
              transition: "color 0.2s, text-decoration-color 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35em",
            }}
            onClick={() =>
              window.open(
                "https://www.tellius.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#4C2DB9";
             
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#0078D3";
              
            }}
          >
            Tellius Private Ltd
            <img
              src="https://cdn.prod.website-files.com/67fcfe6c0c7705918e4d7984/67ffc75fd418f7da8a28f65b_fav.svg"
              alt="Tellius logo"
              style={{
                width: 24,
                height: 24,
                marginRight: 6,
                verticalAlign: "middle",
              }}
            />
          </span>
        </h2>
        <p style={{ fontSize: "1.25rem" }}>
          I'm a{" "}
          <span
            style={{
              textDecoration: "underline",
              textDecorationColor: "#ffc107",
              textUnderlineOffset: "4px",
              textDecorationThickness: "3px",
            }}
          >
            frontend engineer
          </span>{" "}
          passionate about building performant, user-centric web applications.
          With 2+ years of experience, I specialize in{" "}
          <span
            style={{
              textDecoration: "underline",
              textDecorationColor: "#ffc107",
              textUnderlineOffset: "4px",
              textDecorationThickness: "3px",
            }}
          >
            ReactJS, NextJS TypeScript, Javascript
          </span>{" "}
          and scalable architecture. I enjoy solving real-world problems,
          contributing to design systems, and optimizing performance across Core
          Web Vitals. As a curious technologist, I’m always exploring innovative
          ways to create meaningful impact through code.
        </p>
      </div>
      {!isPhone && (
        <div
          style={{
            flexBasis: "50%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <img
            src="/my-image.jpeg"
            alt="Shubham Shrivastava"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              border: "4px solid #fff",
              background: "#eee",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(Home);
