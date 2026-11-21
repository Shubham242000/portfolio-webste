// This stylesheet must load before the parts' stylesheets: their rules override some of its shared ones.
import "./PostcardModal.css";
import { MAX_LENGTH, usePostcard } from "./usePostcard";
import StampPicker from "./StampPicker";
import PostcardMark from "./PostcardMark";
import PostcardAddress from "./PostcardAddress";
import PostcardActions from "./PostcardActions";

const PostcardModal = ({ open, onClose }) => {
  const postcard = usePostcard({ open, onClose });
  const { deck, sent } = postcard;

  return <dialog
    ref={postcard.dialogRef}
    className="pc-dialog"
    aria-labelledby="pc-title"
    onClose={postcard.close}
    onClick={postcard.onBackdropClick}
  >
    <div className="pc-shell">
      <div className="pc-grabber" aria-hidden="true" />
      <div className="pc-scroll">
        <header className="pc-head">
          <div>
            <span className="pc-eyebrow">04 / Get in touch</span>
            <h2 id="pc-title">Send me a postcard</h2>
          </div>
          <button type="button" className="pc-close" onClick={postcard.close} aria-label="Close">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" /></svg>
          </button>
        </header>

        {!sent && <StampPicker cards={deck.cards} index={deck.index} onPick={deck.pick} />}

        <div className="pc-stack">
          <div className="pc-back pc-back--2" style={{ background: deck.behind[1].paper }} aria-hidden="true" />
          <div className="pc-back pc-back--1" style={{ background: deck.behind[0].paper }} aria-hidden="true" />

          <div className={deck.cardClass} style={deck.cardStyle}>
            <span className="pc-label">{postcard.label}</span>
            <h3 className="pc-greeting">{postcard.greeting}</h3>

            <div className="pc-message">
              {sent
                ? <p className="pc-lines">{postcard.sentText}</p>
                : <>
                  <textarea
                    ref={postcard.messageRef}
                    className="pc-lines"
                    aria-label="Your message"
                    maxLength={MAX_LENGTH}
                    value={postcard.message}
                    onChange={(event) => postcard.setMessage(event.target.value)}
                    placeholder="A project, a role, a travel tip, a playlist — or just hello…"
                  />
                  <span className="pc-count" aria-hidden="true">{postcard.message.length}/{MAX_LENGTH}</span>
                </>}
            </div>

            <div className="pc-divider" aria-hidden="true" />

            <PostcardMark card={deck.card} postmark={postcard.postmark} sent={sent} />

            <PostcardAddress
              sent={sent}
              sentAs={postcard.sentAs}
              name={postcard.name}
              email={postcard.email}
              onNameChange={postcard.setName}
              onEmailChange={postcard.setEmail}
            />
          </div>
        </div>

        <PostcardActions
          sent={sent}
          sending={postcard.sending}
          shuffling={deck.shuffling}
          index={deck.index}
          total={deck.cards.length}
          error={postcard.error}
          onShuffle={deck.shuffle}
          onSend={postcard.send}
          onWriteAnother={postcard.writeAnother}
          onClose={postcard.close}
        />
      </div>
    </div>
  </dialog>;
};

export default PostcardModal;
