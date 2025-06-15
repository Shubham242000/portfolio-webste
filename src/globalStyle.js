import { css } from "@emotion/react";

export const globalStyles = (theme) => css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");
  .footer-svg {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  .footer-svg:hover {
    transform: scale(1.2);
  }
  * {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", sans-serif;
  }
  body {
    background: ${theme.background};
    color: ${theme.color};
  }
`;
