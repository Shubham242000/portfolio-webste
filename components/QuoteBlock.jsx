import { useRandomQuote } from "./useRandomQuote";

const QuoteBlock = () => {
  const quote = useRandomQuote();

  return <figure className="quote" aria-live="polite" aria-busy={!quote}>
    <span className="quote-mark" aria-hidden="true">“</span>
    {quote
      ? <>
        <blockquote>{quote.quote}</blockquote>
        <figcaption>
          <span>— {quote.author}</span>
        </figcaption>
      </>
      : <div className="quote-skeleton" aria-label="Loading quote" />}
  </figure>;
};

export default QuoteBlock;
