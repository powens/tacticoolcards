import React, { useCallback, useReducer, useMemo, useEffect } from "react";

export type SecondaryObjective = {
  name: string;
  specialRule: React.ReactElement;
};

export const tactical: SecondaryObjective[] = [
  {
    name: "Investigate Signals",
    specialRule: (
      <>
        <p>
          In your Shooting phase, you can select one or more units from your
          army that are not Battle-shocked and are eligible to shoot. Until the
          end of your turn, the units you selected are not eligible to shoot or
          declare a charge.
        </p>
        <p>
          At the end of your turn, each corner of the battlefield that has one
          or more of these selected units wholly within 9” of it is scanned by
          your army.
        </p>
        <p>
          If one or more corners are scanned by your army, this Secondary
          Mission is achieved and you score 2VP for each corner scanned by your
          army this turn.
        </p>
      </>
    ),
  },
  {
    name: "No Prisoners",
    specialRule: (
      <>
        <p>
          While this Secondary Mission is active, each time an enemy unit is
          destroyed, you score 2VP (to a maximum of 5VP).
        </p>
        <p>
          Note that VP are scored even if such a unit is destroyed and then
          subsequently resurrected for any reason. If you score any VP from this
          Secondary Mission during a turn, then at the end of that turn this
          Secondary Mission is achieved.
        </p>
      </>
    ),
  },
  {
    name: "Extend Battle Lines",
    specialRule: (
      <>
        <p>
          At the end of your turn, if you control one or more objective markers
          in your own deployment zone and you also control one or more objective
          markers in No Man's Land, this Secondary Mission is achieved and you
          score 5VP.
        </p>
        <p>
          If you only have one unit remaining in your army, then this Secondary
          Mission is instead achieved at the end of your turn if that unit
          controls one objective marker in No Man's Land, but in this instance
          you score 2VP instead of 5VP.
        </p>
      </>
    ),
  },
  {
    name: "Defend Stronghold",
    specialRule: (
      <>
        <p>
          At the end of your opponent's turn, or at the end of the battle
          (whichever comes first), if you control one or more objective markers
          in your own deployment zone, this Secondary Mission is achieved and
          you score 3VP.
        </p>
        <p>
          This Secondary Mission cannot be achieved during the first battle
          round; if you draw this Secondary Mission card during the first battle
          round, draw a new Secondary Mission card and shuffle this Secondary
          Mission card back into your Secondary Mission deck.
        </p>
      </>
    ),
  },
  {
    name: "Overwhelming Force",
    specialRule: (
      <>
        <p>
          While this Secondary Mission is active, each time an enemy unit that
          started the turn within range of an objective marker is destroyed, you
          score 3VP (to a maximum of 5VP).
        </p>
        <p>
          Note that VP are scored even if such a unit is destroyed and then
          subsequently resurrected for any reason. If you score any VP from this
          Secondary Mission during a turn, then at the end of that turn this
          Secondary Mission is achieved.
        </p>
      </>
    ),
  },
  {
    name: "Secure No Man's Land",
    specialRule: (
      <>
        <p>
          At the end of your turn, if you control two or more objective markers
          in No Man's Land, this Secondary Mission is achieved and you score
          5VP.
        </p>
        <p>
          If, at the end of your turn, you only control one objective marker in
          No Man's Land, this Secondary Mission is still achieved, but in this
          instance you score 2VP instead of 5VP.
        </p>
      </>
    ),
  },
  {
    name: "Area Denial",
    specialRule: (
      <>
        <p>
          At the end of your turn, if one or more units from your army
          (excluding Battle-shocked units) are wholly within 6” of the centre of
          the battlefield, and there are no enemy units wholly within 6” of the
          centre of the battlefield, this Secondary Mission is achieved and you
          score 5VP.
        </p>
        <p>
          If, at the end of your turn, there are one or more enemy units wholly
          within 6” of the centre of the battlefield, but there are no enemy
          units within 3” of the centre of the battlefield, then this Secondary
          Mission is still achieved, but in this instance you score 3VP instead
          of 5VP.
        </p>
      </>
    ),
  },
  {
    name: "A Tempting Target",
    specialRule: (
      <>
        <p>
          When this Secondary Mission card is drawn, your opponent must select
          one objective marker in No Man's Land.
        </p>
        <p>
          At the end of your turn, if you control that selected objective
          marker, this Secondary Mission is achieved and you score 5VP.
        </p>
      </>
    ),
  },
  {
    name: "Capture Enemy Outpost",
    specialRule: (
      <>
        <p>
          At the end of your turn, if you control one or more objective markers
          in your opponent's deployment zone, this Secondary Mission is achieved
          and you score 8VP.
        </p>
      </>
    ),
  },
];

export const fixed: SecondaryObjective[] = [
  {
    name: "Behind Enemy Lines",
    specialRule: (
      <>
        <p>
          At the end of your turn, if two or more units from your army
          (excluding Aircraft) are wholly within your opponent's deployment
          zone, this Secondary Mission is achieved and you score 4VP
        </p>
        <p>
          If, at the end of your turn, only one unit from your army (excluding
          Aircraft) is wholly within your opponent's deployment zone, this
          Secondary Mission is still achieved, but in this instance you score
          2VP instead of 4VP.
        </p>
        <p>
          If you are using Tactical Missions, then when this Secondary Mission
          is achieved you score an extra 1VP (for a maximum of 5VP).
        </p>
      </>
    ),
  },
  {
    name: "Assassination",
    specialRule: (
      <>
        <p>
          If you are using Fixed Missions, then while this Secondary Mission is
          active, each time an enemy Character model is destroyed, you score
          4VP.
        </p>
        <p>
          If you are using Tactical Missions, then at the end of the turn, if
          either of the conditions below are satisfied, this Secondary Mission
          is achieved and you score 5VP:
        </p>
        <ul>
          <li>One or more enemy Character units were destroyed this turn.</li>
          <li>
            All Character units from your opponent's Army Roster have been
            destroyed during the battle.
          </li>
        </ul>
        <p>
          Note that if you are using Tactical Missions, this Secondary Mission
          is achieved even if such a unit was destroyed and then subsequently
          resurrected for any reason.
        </p>
      </>
    ),
  },
  {
    name: "Bring it Down",
    specialRule: (
      <>
        <p>
          While this Secondary Mission is active, each time an enemy Monster or
          Vehicle model is destroyed, you score 2VP and an extra 1VP for each of
          the conditions below that are satisfied (all are cumulative):
        </p>
        <ul>
          <li>The destroyed model had a Wounds characteristic of 10+</li>
          <li>The destroyed model had a Wounds characteristic of 15+</li>
          <li>The destroyed model had a Wounds characteristic of 20+</li>
        </ul>
        <p>
          Note that VP are scored even if such a model is destroyed and then
          subsequently resurrected for any reason. If you score any VP from this
          Secondary Mission during a turn, then at the end of that turn this
          Secondary Mission is achieved.
        </p>
        <p>
          If you are using Tactical Missions, then when this Secondary Mission
          is achieved you score an extra 1VP. However, if you are using Tactical
          Missions, you cannot score more than 8VP in total from this Secondary
          Mission.
        </p>
      </>
    ),
  },
  {
    name: "Engage on All Fronts",
    specialRule: (
      <>
        <p>
          At the end of your turn, if you have one or more qualifying units (see
          below) from your army wholly within three or more different table
          quarters, and those units are all more than 3” away from any other
          table quarter, this Secondary Mission is achieved and you score 4VP if
          you have qualifying units in four different table quarters, or 2VP if
          you have qualifying units in three different table quarters.
        </p>
        <p>While a unit is Battle-shocked, it is not a qualifying unit.</p>
        <p>
          If, when you draw this Secondary Mission card, you only have one or
          two qualifying units remaining in your army, you can discard this
          Secondary Mission card and draw a new Secondary Mission card.
        </p>
        <p>
          If you are using tactical Missions, then when this Secondary Mission
          is achieved you score an extra 1VP (for a maximum of 5VP).
        </p>
      </>
    ),
  },
  {
    name: "Storm Hostile Objective",
    specialRule: (
      <>
        <p>
          At the end of your turn, if either of the below conditions are
          satisfied, this Secondary Mission is achieved and you score 4VP if you
          are using Fixed Missions, or 5VP if you are using Tactical Missions:
        </p>
        <ul>
          <li>
            You control one or more objective markers that were controlled by
            your opponent at the start of your turn.
          </li>
          <li>
            Your opponent did not control any objective markers at the start of
            your turn and you control one or more objective markers that you did
            not control at the start of your turn.
          </li>
        </ul>
        <p>
          This Secondary Mission cannot be achieved during the first battle
          round; if you randomly drew this Secondary Mission card during the
          first battle round, draw a new Secondary Mission card and shuffle this
          Secondary Mission card back into your Secondary Mission deck.
        </p>
      </>
    ),
  },
  {
    name: "Cleanse",
    specialRule: (
      <>
        <p>
          In your Shooting phase, you can select one or more units from your
          army that are not Battle-shocked and are eligible to shoot. Until the
          end of your turn, the units you selected are not eligible to shoot or
          declare a charge.
        </p>
        <p>
          At the end of your turn, each objective marker that is not within your
          deployment zone that you control that has one or more of these
          selected units within range is cleansed by your army.
        </p>
        <p>
          If one or more objective markers are cleansed by your army this turn,
          this Secondary Mission is achieved and you score a number of VP
          depending on the number of objective markers cleansed by your army
          this turn, as follows:
        </p>
        <ul>
          <li>
            1 objective marker cleansed = 2VP if you are using Fixed Missions,
            or 3VP if you are using Tactical Missions.
          </li>
          <li>
            2 or more objective markers cleansed = 4VP if you are using Fixed
            Missions, or 5VP if you are using Tactical Missions.
          </li>
        </ul>
      </>
    ),
  },
  {
    name: "Deploy Teleport Homers",
    specialRule: (
      <>
        <p>
          In your shooting phase, you can select one unit from your army that is
          not Battle-shocked and is eligible to shoot. Until the end of your
          turn, that unit is not eligible to shoot or declare a charge.
        </p>
        <p>
          At the end of your turn, if that unit is within your opponents
          deployment zone, or within 6” of the centre of the battlefield, it
          deploys a teleport homer at that locations, this Secondary Mission is
          achieved and you score a number of VP depending on where the teleport
          homer was deployed, as follows:
        </p>
        <ul>
          <li>
            Centre of battlefield = 2VP if you are using Fixed Missions, or 3VP
            if you are using Tactical Missions
          </li>
          <li>
            Opponent's deployment zone = 4VP if you are using Fixed Missions, or
            5VP if you are using Tactical Missions
          </li>
        </ul>
      </>
    ),
  },
];

interface CardsByName {
  [key: string]: SecondaryObjective;
}

export const cardsByName: CardsByName = {};
tactical.forEach((card) => {
  cardsByName[card.name] = card;
});
fixed.forEach((card) => {
  cardsByName[card.name] = card;
});

type CardName = string;

type ReducerState = {
  deck: CardName[];
  hand: CardName[];
  discard: CardName[];
  handSize: number;
};

type CardAction = {
  type: "shuffle" | "discard" | "return" | "draw" | "reset" | "changeHandSize";
  cardName?: CardName;
  handSize?: number;
};

const initialState = {
  deck: shuffleInPlace([...tactical, ...fixed]).map((c) => c.name),
  hand: [],
  discard: [],
  handSize: 2,
};

function shuffleInPlace<Type>(arr: Type[]): Type[] {
  // From: https://stackoverflow.com/questions/60662796/shuffle-array-in-js
  let j, x, index;
  for (index = arr.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    arr[index] = arr[j];
    arr[j] = x;
  }
  return arr;
}

function managerReducer(state: ReducerState, action: CardAction): ReducerState {
  switch (action.type) {
    case "shuffle":
      return {
        ...state,
        deck: shuffleInPlace([...state.deck]),
      };
    case "discard":
      if (!action.cardName) {
        return state;
      }

      const newDiscard = [...state.discard];
      newDiscard.push(action.cardName);
      return {
        ...state,
        hand: state.hand.filter((card) => card !== action.cardName),
        discard: newDiscard,
      };

    case "return":
      if (!action.cardName) {
        return state;
      }
      const newDeck = [...state.deck];
      newDeck.push(action.cardName);
      shuffleInPlace(newDeck);
      return {
        ...state,
        hand: state.hand.filter((card) => card !== action.cardName),
        deck: newDeck,
      };

    case "draw":
      if (state.hand.length >= state.handSize) {
        return state;
      }
      if (state.deck.length === 0) {
        return state;
      }
      const drawDeck = [...state.deck];
      const newHand = [...state.hand];
      for (let i = state.hand.length; i < state.handSize; i++) {
        if (drawDeck.length === 0) {
          break;
        }
        const card = drawDeck.pop();
        if (!card) {
          throw new Error("draw: Card is falsey. This should never happen");
        }

        newHand.push(card);
      }

      return {
        ...state,
        deck: drawDeck,
        hand: newHand,
      };

    case "changeHandSize":
      if (!action.handSize) {
        return state;
      }

      return {
        ...state,
        handSize: action.handSize,
      };

    case "reset":
      return {
        deck: shuffleInPlace([...tactical, ...fixed].map((c) => c.name)),
        hand: [],
        discard: [],
        handSize: 2,
      };

    default:
      return state;
  }
}

const STORAGE_KEY = "cardState";

export function useCardManager() {
  const [state, dispatch] = useReducer(
    managerReducer,
    initialState,
    (i: any) => {
      const storedState = localStorage.getItem(STORAGE_KEY);
      if (!storedState) {
        return i;
      }
      console.debug("Loading from localStorage");
      const parsedState = JSON.parse(storedState);
      if (!parsedState) {
        return;
      }

      return parsedState;
    }
  );
  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);
  const shuffleDeck = useCallback(() => {
    dispatch({ type: "shuffle" });
  }, []);
  const discardCard = useCallback((cardName: string) => {
    dispatch({ type: "discard", cardName });
  }, []);
  const drawCard = useCallback(() => {
    dispatch({ type: "draw" });
  }, []);
  const returnCard = useCallback((cardName: string) => {
    dispatch({ type: "return", cardName });
  }, []);
  const changeHandSize = useCallback((newSize: number) => {
    dispatch({ type: "changeHandSize", handSize: newSize });
  }, []);
  const cardsInHand: SecondaryObjective[] = useMemo(() => {
    return state.hand.map((cardName) => cardsByName[cardName]);
  }, [state.hand]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return {
    cardsInHand,
    deck: state.deck,
    discardPile: state.discard,
    handSize: state.handSize,
    reset,
    shuffleDeck,
    discardCard,
    drawCard,
    returnCard,
    changeHandSize,
  };
}
