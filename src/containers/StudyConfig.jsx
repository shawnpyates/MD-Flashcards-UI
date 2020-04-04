import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';

import { actionTypes, cardSetModes, displayFirstOptions } from '../reducers/cardSetReducer';
import { CardSetContext } from '../context/cardSetContext';

import ConfigForm from '../components/ConfigForm/ConfigForm';

const orderOptions = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
  RANDOM: 'random',
};

const shuffleCards = (cards) => {
  const clonedCards = [...cards];
  let cardsLength = clonedCards.length;
  while (cardsLength) {
    const i = Math.floor(Math.random() * (cardsLength -= 1));
    [clonedCards[cardsLength], clonedCards[i]] = [clonedCards[i], clonedCards[cardsLength]];
  }
  return clonedCards;
};

const sortCards = ([...cards], n) => (
  cards.sort((a, b) => (dayjs(a.inserted_at).isAfter(dayjs(b.inserted_at)) ? n : -n))
);


function StudyConfig() {
  const { currentCards, originalSet, dispatch } = useContext(CardSetContext);
  const [formState, setFormState] = useState({
    order: orderOptions.ASCENDING,
    displayFirst: displayFirstOptions.QUESTION,
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
  };

  const reorderCards = (order) => {
    switch (order) {
      case orderOptions.ASCENDING:
        return sortCards(currentCards, 1);
      case orderOptions.DESCENDING:
        return sortCards(currentCards, -1);
      case orderOptions.RANDOM:
        return shuffleCards(currentCards);
      default:
        return null;
    }
  };

  const handleButtonClick = (mode) => {
    if (mode === cardSetModes.STUDY) {
      dispatch({
        type: actionTypes.SET_STUDY_SESSION_CONFIG,
        payload: {
          mode,
          displayFirst: formState.displayFirst,
          currentCards: reorderCards(formState.order),
        },
      });
      return;
    }
    dispatch({ type: actionTypes.UPDATE_MODE, payload: mode });
  };


  return (
    <ConfigForm
      handleButtonClick={handleButtonClick}
      formState={formState}
      originalSet={originalSet}
      handleChange={handleChange}
      cardSetModes={cardSetModes}
      displayFirstOptions={displayFirstOptions}
      orderOptions={orderOptions}
    />
  );
}

export default StudyConfig;
