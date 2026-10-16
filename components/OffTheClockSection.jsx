import { useEffect, useRef, useState } from "react";
import OnRepeat from "./OnRepeat";
import { postcards } from "../content/portfolio";

const OffTheClockSection = () => {
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const step = (offset) => setOpen((index) => (index + offset + postcards.length) % postcards.length);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  const current = open === null ? null : postcards[open];

  return <section className="section">
    <div className="section-label">03 / Off the clock</div>
    <div className="section-heading section-heading--split">
      <div>
        <h2>Postcards from the road.</h2>
        <p className="section-note">A few places I’ve wandered, shot on my phone. Tap one to see it properly.</p>
      </div>
      <OnRepeat />
    </div>

    <ul className="postcards">
      {postcards.map((card, index) => <li key={card.file}>
        <button type="button" className="postcard" onClick={() => setOpen(index)} aria-label={`Open photo from ${card.place}`}>
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
      ref={dialogRef}
      className="lightbox"
      onClose={() => setOpen(null)}
      onKeyDown={onKeyDown}
      onClick={(event) => { if (event.target === event.currentTarget) setOpen(null); }}
      aria-label={current ? `Photo from ${current.place}` : "Photo"}
    >
      {current && <figure>
        <img src={`/trips/${current.file}-lg.jpg`} alt={`Photo from ${current.place}`} />
        <figcaption>
          <span>{current.place}</span>
          <span className="lightbox-controls">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo">←</button>
            <span>{open + 1} / {postcards.length}</span>
            <button type="button" onClick={() => step(1)} aria-label="Next photo">→</button>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close">✕</button>
          </span>
        </figcaption>
      </figure>}
    </dialog>
  </section>;
};

export default OffTheClockSection;
