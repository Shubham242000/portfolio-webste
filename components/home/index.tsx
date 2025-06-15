import React from "react";
import { useIsMobile } from "../../hooks";

const Home = () => {
  const isPhone = useIsMobile();
  if (isPhone === null) return null;
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexBasis: "50%" }}>
        <h1 style={{ fontSize: "3.75rem", lineHeight: "3.2rem" }}>
          Shubham Shrivastava
        </h1>
        <h2 style={{ fontSize: "1.5rem" }}>
          Software Development Engineer, Bajaj Finserv Health
        </h2>
        <p style={{ fontSize: "1.25rem" }}>
          I'm a frontend engineer passionate about building performant,
          user-centric web applications. With 2+ years of experience, I
          specialize in React, TypeScript, and scalable architecture. I enjoy
          solving real-world problems, contributing to design systems, and
          optimizing performance across Core Web Vitals. As a curious
          technologist, I’m always exploring innovative ways to create
          meaningful impact through code.
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

export default Home;
