import "./PostcardMark.css";

const Waves = () => <svg className="pc-waves" viewBox="0 0 120 40" aria-hidden="true">
  <path d="M0 8c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0M0 20c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0M0 32c10-6 20 6 30 0s20 6 30 0 20 6 30 0 20 6 30 0" />
</svg>;

// Postmark (the visitor's city) + stamp (the chosen trip photo), and a "Received" stamp once sent.
const PostcardMark = ({ card, postmark, sent }) => <div className="pc-mark">
  <div className="pc-postmark" aria-hidden="true">
    <span className="pc-postmark-city">{postmark.city}</span>
    <span className="pc-postmark-date">{postmark.date}</span>
    <span>· Posted ·</span>
  </div>
  <Waves />
  <div className="pc-stamp">
    <img src={`/trips/${card.file}-sm.jpg`} alt={`Stamp: photo from ${card.place}`} decoding="async" style={{ objectPosition: card.focus }} />
    <span><span>{card.short || card.place}</span><span>{card.no}</span></span>
  </div>
  {sent && <span className="pc-received" aria-hidden="true">Received</span>}
</div>;

export default PostcardMark;
