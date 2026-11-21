import "./StampPicker.css";

// The phone layout's way to change stamps (desktop uses the "Change stamp" button under the card).
const StampPicker = ({ cards, index, onPick }) => {
  const card = cards[index];
  return <div className="pc-stamps">
    <div className="pc-stamps-head">
      <span id="pc-stamps-label">Pick a stamp</span>
      <span>{card.no}/{String(cards.length).padStart(2, "0")} · {card.place}</span>
    </div>
    <div className="pc-stamps-row" role="group" aria-labelledby="pc-stamps-label">
      {cards.map((option, optionIndex) => <button
        key={option.file}
        type="button"
        className="pc-stamp-option"
        aria-pressed={optionIndex === index}
        aria-label={`Stamp: ${option.place}`}
        onClick={() => onPick(optionIndex, optionIndex > index ? 1 : -1)}
      >
        <span><img src={`/trips/${option.file}-sm.jpg`} alt="" loading="lazy" decoding="async" style={{ objectPosition: option.focus }} /></span>
      </button>)}
    </div>
  </div>;
};

export default StampPicker;
