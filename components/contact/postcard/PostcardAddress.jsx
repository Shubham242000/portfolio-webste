import "./PostcardAddress.css";

// Right-hand side of the card: the sender's name/email (or how it was signed, once sent).
const PostcardAddress = ({ sent, sentAs, name, email, onNameChange, onEmailChange }) => <div className="pc-from">
  <span className="pc-small">From</span>
  {sent
    ? <span className="pc-from-sent">{sentAs?.anonymous ? "Anonymous" : sentAs?.name}</span>
    : <>
      <label className="pc-field">
        <span>Name</span>
        <input type="text" autoComplete="name" value={name} onChange={(event) => onNameChange(event.target.value)} placeholder="Your name" />
      </label>
      <label className="pc-field">
        <span>Email</span>
        <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="so I can write back" />
      </label>
    </>}
</div>;

export default PostcardAddress;
