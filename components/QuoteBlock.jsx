import { useCallback, useEffect, useRef, useState } from "react";

// The API ANDs multiple tags together, so ask for one on-theme tag per request.
const TAGS = ["creativity", "knowledge", "growth"];
const quoteUrl = () =>
  `https://quoteslate.vercel.app/api/quotes/random?maxLength=140&tags=${TAGS[Math.floor(Math.random() * TAGS.length)]}`;
const FALLBACK = { quote: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" };

const QuoteBlock = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);

  const load = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    try {
      const response = await fetch(quoteUrl(),{ signal: controller.signal });
      if (!response.ok) throw new Error(`Quote request failed: ${response.status}`);
      const data = await response.json();
      if (!data?.quote) throw new Error("Quote response had no text");
      setQuote({ quote: data.quote, author: data.author || "Unknown" });
    } catch (error) {
      if (error.name === "AbortError") return;
      // Keep whatever is showing; only fall back when there is nothing yet.
      setQuote((current) => current ?? FALLBACK);
    } finally {
      if (controllerRef.current === controller) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  return <figure className={`quote${loading ? " is-loading" : ""}`} aria-live="polite" aria-busy={loading}>
    <span className="quote-mark" aria-hidden="true">“</span>
    {quote
      ? <>
        <blockquote key={quote.quote}>{quote.quote}</blockquote>
        <figcaption>
          <span>— {quote.author}</span>
        </figcaption>
      </>
      : <div className="quote-skeleton" aria-label="Loading quote" />}
  </figure>;
};

export default QuoteBlock;
