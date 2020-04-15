import React, { useEffect, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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
    shouldShowRepeatOption: true,
  });

  const currentCard = allCards[localState.cardIndex];

  useEffect(() => {
    setLocalState((prev) => ({ ...prev, cardIndex: 0, currentSide: displayFirst }));

    return () => {
      dispatch({ type: actionTypes.UPDATE_CARDS, payload: originalSet.cards });
    };
  }, [displayFirst, dispatch, originalSet.cards]);

  const flipCard = () => {
    setLocalState((prev) => ({
      ...prev,
      currentSide: Object.values(cardSides).find((side) => side !== localState.currentSide),
    }));
  };
  const handleShift = (direction) => {
    setLocalState({
      currentSide: displayFirst,
      cardIndex: localState.cardIndex + (direction === 'right' ? 1 : -1),
      shouldShowRepeatOption: true,
    });
  };
  const repeatCardAtEnd = () => {
    toast(
      'Will repeat card later!',
      { autoClose: 2000, hideProgressBar: true },
    );
    setLocalState((prev) => ({ ...prev, shouldShowRepeatOption: false }));
    dispatch({ type: actionTypes.UPDATE_CARDS, payload: [...allCards, currentCard] });
  };
  const goBackToList = () => {
    dispatch({ type: actionTypes.UPDATE_MODE, payload: cardSetModes.VIEW });
  };

  return (
    <>
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
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

export default StudySession;
