import React, { useEffect, useContext, useState } from 'react';

import Flashcard from '../components/Flashcard/FlashCard';

import {
  actionTypes,
  cardSetModes,
  displayFirstOptions as cardSides,
} from '../reducers/cardSetReducer';
import { CardSetContext } from '../context/cardSetContext';

function StudySession() {
  const {
    currentCards: allCards,
    originalSet,
    displayFirst,
    dispatch,
  } = useContext(CardSetContext);

  const [localState, setLocalState] = useState({
    cardIndex: null,
    currentSide: null,
  });

  const currentCard = allCards[localState.cardIndex];

  useEffect(() => {
    setLocalState({ cardIndex: 0, currentSide: displayFirst });

    return () => {
      dispatch({ type: actionTypes.UPDATE_CARDS, payload: originalSet.cards });
    };
  }, [displayFirst, dispatch, originalSet.cards]);

  const flipCard = () => {
    setLocalState({
      ...localState,
      currentSide: Object.values(cardSides).find((side) => side !== localState.currentSide),
    });
  };
  const handleShift = (direction) => {
    setLocalState({
      currentSide: displayFirst,
      cardIndex: localState.cardIndex + (direction === 'right' ? 1 : -1),
    });
  };
  const repeatCardAtEnd = () => {
    dispatch({ type: actionTypes.UPDATE_CARDS, payload: [...allCards, currentCard] });
  };
  const goBackToList = () => {
    dispatch({ type: actionTypes.UPDATE_MODE, payload: cardSetModes.VIEW });
  };

  return (
    <Flashcard
      originalSet={originalSet}
      localState={localState}
      allCards={allCards}
      handleShift={handleShift}
      currentCard={currentCard}
      flipCard={flipCard}
      repeatCardAtEnd={repeatCardAtEnd}
      goBackToList={goBackToList}
    />
  );
}

export default StudySession;
