import "./PostcardMark.css";

const Waves = () => <svg className="pc-waves" viewBox="0 0 120 40" aria-hidden="true">
  <path d="M0 8c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0M0 20c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0M0 32c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0" />
</svg>;

const StampFace = ({ card }) => <>
  <img src={`/trips/${card.file}-sm.jpg`} alt="" decoding="async" style={{ objectPosition: card.focus }} />
  <span><span>{card.short || card.place}</span><span>{card.no}</span></span>
</>;

// Postmark (the visitor's city) + stamp (the chosen trip photo), and a "Received" stamp once sent.
// Before sending, the stamp itself is a button: tapping it swaps in the next trip photo.
const PostcardMark = ({ card, postmark, sent, shuffling, onShuffle }) => <div className="pc-mark">
  <div className="pc-postmark" aria-hidden="true">
    <span className="pc-postmark-city">{postmark.city}</span>
    <span className="pc-postmark-date">{postmark.date}</span>
    <span>· Posted ·</span>
  </div>
  <Waves />
  {sent
    ? <div className="pc-stamp" role="img" aria-label={`Stamp: photo from ${card.place}`}><StampFace card={card} /></div>
    : <button
      type="button"
      className="pc-stamp pc-stamp--button"
      onClick={onShuffle}
      disabled={shuffling}
      aria-label={`Stamp: ${card.place}. Change stamp`}
      title="Change stamp"
    ><StampFace card={card} /></button>}
  {sent && <span className="pc-received" aria-hidden="true">Received</span>}
</div>;

export default PostcardMark;
