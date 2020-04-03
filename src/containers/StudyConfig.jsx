import React, { useContext, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { actionTypes, cardSetModes, displayFirstOptions } from '../reducers/cardSetReducer';
import { CardSetContext } from '../context/cardSetContext';

const orderOptions = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
  RANDOM: 'random',
};

const ConfigContainer = styled(Container)`
  width: 70%;
  position: absolute;
  top: 100px;
  left: 250px;
`;

const StyledRadioGroup = styled(RadioGroup)`
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #060;
  color: #FFF;
  margin-right: 25px;

  &:hover {
    background-color: #070;
  }
`;

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const renderOptions = (options) => Object.values(options).map((option) => (
  <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />
));

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

  const getButton = (mode, text) => (
    <StyledButton onClick={() => handleButtonClick(mode)}>{text}</StyledButton>
  );


  return (
    <ConfigContainer>
      <h2>{`Get ready to study ${originalSet.name}!`}</h2>
      <FormControl component="fieldset">
        <FormLabel component="legend">Which order should the cards appear in?</FormLabel>
        <StyledRadioGroup
          aria-label="displayOrder"
          name="order"
          value={formState.order}
          onChange={handleChange}
        >
          {renderOptions(orderOptions)}
        </StyledRadioGroup>
        <FormLabel component="legend">Which side of the card should appear first?</FormLabel>
        <StyledRadioGroup
          aria-label="displayFirst"
          name="displayFirst"
          value={formState.displayFirst}
          onChange={handleChange}
        >
          {renderOptions(displayFirstOptions)}
        </StyledRadioGroup>
      </FormControl>
      <div>
        {getButton(cardSetModes.STUDY, 'Start!')}
        {getButton(cardSetModes.VIEW, 'Go Back to Card List')}
      </div>
    </ConfigContainer>
  );
}

export default StudyConfig;
