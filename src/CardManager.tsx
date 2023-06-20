import React from "react";
import { useCardManager } from "./data";
import Card from "./Card";
import styles from "./CardManager.module.css";

function CardManager() {
  const {
    cardsInHand,
    discardPile,
    deck,
    drawCard,
    shuffleDeck,
    reset,
    discardCard,
    changeHandSize,
    returnCard,
    handSize,
  } = useCardManager();
  return (
    <main>
      <header>
        <h1>Tacticool Card Manager</h1>
      </header>
      <section className={styles.controls}>
        <div>
          <label htmlFor="handSize">Hand Size</label>
          <select
            id="handSize"
            value={handSize}
            onChange={(e) => changeHandSize(Number(e.target.value))}
          >
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <span>Deck Size:</span> <span>{deck.length}</span>
        </div>
        <div>
          <span>Discard Pile:</span> <span>{discardPile.length}</span>
        </div>
      </section>
      <div>
        <button onClick={reset}>Reset</button>
        <button onClick={shuffleDeck}>Shuffle</button>
        <button onClick={drawCard}>Draw</button>
      </div>
      <div
        className={`${styles.cardsInHand} ${
          handSize === 2 ? styles.handSize2 : styles.handSize3
        }`}
      >
        {cardsInHand.map((card) => (
          <Card
            card={card}
            key={card.name}
            discardCard={discardCard}
            returnCard={returnCard}
          />
        ))}
      </div>
    </main>
  );
}

export default CardManager;
