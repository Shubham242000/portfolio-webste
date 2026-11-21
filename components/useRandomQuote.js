import { useEffect, useState } from "react";

// The API ANDs multiple tags together, so ask for one on-theme tag per request.
const TAGS = ["creativity", "knowledge", "growth"];
const FALLBACK = { quote: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" };

const quoteUrl = () =>
  `https://quoteslate.vercel.app/api/quotes/random?maxLength=140&tags=${TAGS[Math.floor(Math.random() * TAGS.length)]}`;

// One random quote per page load; a fixed fallback if the API is unreachable.
export const useRandomQuote = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(quoteUrl(), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Quote request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!data?.quote) throw new Error("Quote response had no text");
        setQuote({ quote: data.quote, author: data.author || "Unknown" });
      })
      .catch((error) => {
        if (error.name !== "AbortError") setQuote(FALLBACK);
      });
    return () => controller.abort();
  }, []);

  return quote;
};
