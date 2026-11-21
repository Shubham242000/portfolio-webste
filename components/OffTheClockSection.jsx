import { postcards } from "../content/portfolio";
import { useLightbox } from "./useLightbox";
import DecodeText from "./DecodeText";

const OffTheClockSection = () => {
  const lightbox = useLightbox(postcards.length);
  const current = lightbox.index === null ? null : postcards[lightbox.index];

  return <section className="section">
    <DecodeText className="section-label" text="03 / Off the clock" />
    <div className="section-heading section-heading--split" data-reveal>
      <div>
        <h2>Postcards from the road.</h2>
        <p className="section-note">A few places I’ve wandered, shot on my phone. Tap one to see it properly.</p>
      </div>
    </div>

    <ul className="postcards">
      {postcards.map((card, index) => <li key={card.file}>
        <button type="button" className="postcard" onClick={() => lightbox.open(index)} aria-label={`Open photo from ${card.place}`}>
          <img
            src={`/trips/${card.file}-sm.jpg`}
            alt={`Photo from ${card.place}`}
            width={card.width}
            height={card.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: card.focus }}
          />
          <span>{card.place}</span>
        </button>
      </li>)}
    </ul>

    <dialog
      ref={lightbox.dialogRef}
      className="lightbox"
      onClose={lightbox.close}
      onKeyDown={lightbox.onKeyDown}
      onClick={lightbox.onBackdropClick}
      aria-label={current ? `Photo from ${current.place}` : "Photo"}
    >
      {current && <figure>
        <img src={`/trips/${current.file}-lg.jpg`} alt={`Photo from ${current.place}`} />
        <figcaption>
          <span>{current.place}</span>
          <span className="lightbox-controls">
            <button type="button" onClick={() => lightbox.step(-1)} aria-label="Previous photo">←</button>
            <span>{lightbox.index + 1} / {postcards.length}</span>
            <button type="button" onClick={() => lightbox.step(1)} aria-label="Next photo">→</button>
            <button type="button" onClick={lightbox.close} aria-label="Close">✕</button>
          </span>
        </figcaption>
      </figure>}
    </dialog>
  </section>;
};

export default OffTheClockSection;
