import React from "react";
import { SecondaryObjective } from "./data";
import styles from "./Card.module.css";

type Props = {
  card: SecondaryObjective;
  discardCard: (name: string) => void;
  returnCard: (name: string) => void;
};

function Card({ card, discardCard, returnCard }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{card.name}</div>
      <div className={styles.body}>{card.specialRule}</div>
      <div className={styles.footer}>
        <button onClick={(e) => returnCard(card.name)}>Return to Deck</button>
        <button onClick={(e) => discardCard(card.name)}>Discard Card</button>
      </div>
    </div>
  );
}

export default Card;
