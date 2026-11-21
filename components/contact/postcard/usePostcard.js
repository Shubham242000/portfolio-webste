import { useRef, useState } from "react";
import { sendPostcard } from "../../../src/sendPostcard";
import { useDialog } from "../../../src/hooks/useDialog";
import { useScrollLock } from "../../../src/hooks/useScrollLock";
import { useStampDeck } from "./useStampDeck";

// The handwriting face is only needed once the modal opens, and this module is lazy-loaded with it,
// so visitors who never click "Let's talk" don't pay for it.
const HANDWRITING_FONT = "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap";
if (!document.querySelector(`link[href="${HANDWRITING_FONT}"]`)) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = HANDWRITING_FONT;
  document.head.appendChild(link);
}

export const MAX_LENGTH = 500;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Zones that span a whole country (or nothing at all) say too little to print a city on the postmark.
const BROAD_ZONES = new Set(["Asia/Calcutta", "Asia/Kolkata", "UTC", "Etc/UTC", "GMT"]);

const createPostmark = () => {
  let timeZone = "";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    // Leave it blank; the postmark falls back to "Somewhere online".
  }
  const broad = !timeZone || BROAD_ZONES.has(timeZone) || timeZone.startsWith("Etc/") || !timeZone.includes("/");
  const now = new Date();
  return {
    timeZone,
    city: broad ? "Somewhere online" : timeZone.split("/").pop().replace(/_/g, " "),
    date: `${now.getDate()} ${MONTHS[now.getMonth()]} ${String(now.getFullYear()).slice(2)}`,
  };
};

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Everything behind the postcard modal: the dialog, the stamp deck, the form, and sending.
export const usePostcard = ({ open, onClose }) => {
  const dialogRef = useDialog(open);
  useScrollLock(open);

  const messageRef = useRef(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [sentAs, setSentAs] = useState(null);
  const [postmark] = useState(createPostmark);

  const sent = status === "sent";
  const deck = useStampDeck();

  // Editing any field clears the last error.
  const edit = (setter) => (value) => { setter(value); setError(""); };

  const send = async (anonymous) => {
    if (status === "sending") return;
    const text = message.trim();
    if (!text) {
      setError("Write a line or two first.");
      messageRef.current?.focus();
      return;
    }
    if (!anonymous && (!name.trim() || !isEmail(email.trim()))) {
      setError("Add your name and email, or send it anonymously.");
      return;
    }

    setError("");
    setStatus("sending");
    try {
      await sendPostcard({
        message: text,
        anonymous,
        name: anonymous ? null : name.trim(),
        email: anonymous ? null : email.trim(),
        stamp: deck.card.file,
        postmark: { city: postmark.city, timeZone: postmark.timeZone || null },
        sentAt: new Date().toISOString(),
      });
      setSentAs({ anonymous, name: anonymous ? "" : name.trim() });
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("fallback");
    }
  };

  const writeAnother = () => {
    setMessage("");
    setError("");
    setSentAs(null);
    setStatus("idle");
  };

  // Reopening after a send starts a fresh card rather than showing the "delivered" one again.
  const close = () => {
    onClose();
    if (sent) writeAnother();
  };

  const firstName = sentAs?.name.split(" ")[0];
  const trimmed = message.trim();
  const quoted = trimmed.length > 140 ? `${trimmed.slice(0, 140)}…` : trimmed;

  return {
    dialogRef,
    messageRef,
    deck,
    postmark,
    message,
    name,
    email,
    setMessage: edit(setMessage),
    setName: edit(setName),
    setEmail: edit(setEmail),
    error,
    sending: status === "sending",
    sent,
    sentAs,
    label: sent ? `Delivered · ${postmark.date}` : `Postcard no. ${deck.card.no} · Stamp: ${deck.card.place}`,
    greeting: sent ? "Off it goes." : deck.card.greeting,
    sentText: `${quoted && `“${quoted}” — `}${sentAs?.anonymous
      ? "No return address on this one, but I’ll read it."
      : `Thanks${firstName ? `, ${firstName}` : ""}. I’ll write back to the address you left.`}`,
    send,
    writeAnother,
    close,
    onBackdropClick: (event) => { if (event.target === event.currentTarget) close(); },
  };
};
