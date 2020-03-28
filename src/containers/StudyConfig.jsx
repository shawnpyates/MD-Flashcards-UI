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
import { CardSetContext } from '../context/cardSetContext';
import dayjs from 'dayjs';

const orderOptions = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
  RANDOM: 'random',
};

const displayFirstOptions = {
  QUESTION: 'question',
  ANSWER: 'answer',
};

const cardSetModes = {
  VIEW: 'view',
  ADD: 'add',
  EDIT: 'edit',
  CONFIG: 'config', 
  STUDY: 'study',
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

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const renderOptions = (options) => Object.values(options).map((option) => (
  <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />
));

const shuffleCards = ([...cards]) => {
  let cardsLength = cards.length;
  while (cardsLength) {
    const i = Math.floor(Math.random() * cardsLength--);
    [cards[cardsLength], cards[i]] = [cards[i], cards[cardsLength]];
  }
  return cards;
};

const sortCards = ([...cards], n) => (
  cards.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? -n : n))
) ;


function StudyConfig() {
  const { setCurrentMode, currentSet, setCurrentSet } = useContext(CardSetContext);
  const [state, setState] = useState({
    order: orderOptions.ASCENDING,
    displayFirst: displayFirstOptions.QUESTION,
  });


  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };


  const reorderCards = (order) => {
    switch (order) {
      case orderOptions.ASCENDING:
        setCurrentSet({ ...currentSet, cards: sortCards(currentSet.cards, 1) });
        break;
      case orderOptions.DESCENDING:
        debugger;
        setCurrentSet({ ...currentSet, cards: sortCards(currentSet.cards, -1) });
        break;
      case orderOptions.RANDOM:
        setCurrentSet({ ...currentSet, cards: shuffleCards(currentSet.cards) });
        break;
      default:
        return;
    }
  };

  const handleButtonClick = (mode) => {
    if (mode === cardSetModes.STUDY) {
      reorderCards(state.order);
    }
    setCurrentMode(mode);
  }

  const getButton = (mode, text) => (
    <StyledButton onClick={() => handleButtonClick(cardSetModes[mode])}>{text}</StyledButton>
  );


  return (
    <ConfigContainer>
      <h2>Get ready to study {currentSet && currentSet.name}!</h2>
      <FormControl component="fieldset">
        <FormLabel component="legend">Which order should the cards appear in?</FormLabel>
        <StyledRadioGroup
          aria-label="displayOrder"
          name="order"
          value={state.order}
          onChange={handleChange}
        >
          {renderOptions(orderOptions)}
        </StyledRadioGroup>
        <FormLabel component="legend">Which side of the card should appear first?</FormLabel>
        <StyledRadioGroup
          aria-label="displayFirst"
          name="displayFirst"
          value={state.displayFirst}
          onChange={handleChange}
        >
          {renderOptions(displayFirstOptions)}
        </StyledRadioGroup>
      </FormControl>
      <div>
        {getButton('STUDY', 'Start!')}
        {getButton('VIEW', 'Go Back to Card List')}
      </div>
    </ConfigContainer>
  );
}

export default StudyConfig;