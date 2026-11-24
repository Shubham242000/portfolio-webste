import { useEffect, useRef, useState } from "react";

const CopyIcon = () => <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" /><path d="M10.5 3.5v-.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" /></svg>;
const CheckIcon = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7" /></svg>;

// The address under "Let's talk", with a button that copies it (and briefly shows a tick).
const CopyEmail = ({ email }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // Clipboard blocked (old browser or insecure context); the address is still selectable.
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return <span className="contact-email">
    <span className="contact-email-address">{email}</span>
    <button type="button" className="contact-email-copy" onClick={copy} aria-label={copied ? "Email copied" : "Copy email address"} title={copied ? "Copied" : "Copy"}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
    <span className="visually-hidden" role="status">{copied ? "Email address copied" : ""}</span>
  </span>;
};

export default CopyEmail;
