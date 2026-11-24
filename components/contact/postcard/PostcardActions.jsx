import { CONTACT_EMAIL } from "../../../src/sendPostcard";
import "./PostcardActions.css";

// Buttons under the card, plus the status line for validation and send errors.
const PostcardActions = ({ sent, sending, shuffling, index, total, error, onShuffle, onSend, onWriteAnother, onClose }) => <div className="pc-actions">
  {sent
    ? <>
      <button type="button" className="pc-ghost" onClick={onWriteAnother}>Write another</button>
      <div className="pc-send">
        <button type="button" className="pc-btn" onClick={onClose}>Close</button>
      </div>
    </>
    : <>
      <button type="button" className="pc-ghost pc-shuffle" onClick={onShuffle} disabled={shuffling}>
        <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h3.5c2 0 3 1 4 3l1 2c1 2 2 3 4 3H16M13.5 10.5L16 13l-2.5 2.5M2 13h3.5c1 0 1.8-.3 2.4-.9M10.1 5.9c.6-.6 1.4-.9 2.4-.9H16M13.5 2.5L16 5l-2.5 2.5" /></svg>
        Change stamp
        <span className="pc-shuffle-count">{index + 1}/{total}</span>
      </button>
      <div className="pc-send">
        <button type="button" className="pc-btn" onClick={onSend} disabled={sending}>
          {sending ? "Sending…" : "Send"}
          {!sending && <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 11L11 3M5 3h6v6" /></svg>}
        </button>
      </div>
    </>}
  <p className="pc-status" role="status" aria-live="polite">
    {error === "fallback"
      ? <>Couldn’t send that one. Email me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>
      : error}
  </p>
</div>;

export default PostcardActions;
