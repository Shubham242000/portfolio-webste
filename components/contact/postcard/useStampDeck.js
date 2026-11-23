import { useEffect, useRef, useState } from "react";
import { postcards, stamps } from "../../../content/portfolio";
import { useReducedMotion } from "../../../src/hooks/useReducedMotion";

const LEAVE_MS = 260;
const CARD_TILT = [-1.4, 1.1, -0.9, 1.3, -0.7, 1.5, -1.1];

const cards = postcards.map((card, index) => ({
  ...card,
  ...stamps[card.file],
  no: String(index + 1).padStart(2, "0"),
  tilt: CARD_TILT[index % CARD_TILT.length],
}));

// The chosen stamp, changed by tapping the stamp on the card or the "Change stamp" button.
// The outgoing card animates away before the next one shows.
export const useStampDeck = () => {
  const reduced = useReducedMotion();
  const leaveTimer = useRef(null);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(0);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const card = cards[index];

  const pick = (next, direction = 1) => {
    if (leaving || next === index) return;
    if (reduced) {
      setIndex(next);
      return;
    }
    setLeaving(direction);
    leaveTimer.current = setTimeout(() => {
      setIndex(next);
      setLeaving(0);
    }, LEAVE_MS);
  };

  return {
    cards,
    card,
    index,
    shuffling: Boolean(leaving),
    pick,
    shuffle: () => pick((index + 1) % cards.length),
    cardClass: leaving ? "pc-card is-leaving" : "pc-card",
    cardStyle: {
      "--pc-tilt": `${card.tilt}deg`,
      "--pc-leave": leaving,
    },
  };
};
