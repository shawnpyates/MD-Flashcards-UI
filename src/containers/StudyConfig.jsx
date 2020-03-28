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

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

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
}


function StudyConfig() {
  const { currentSetName, setCurrentMode, cards, setCards } = useContext(CardSetContext);
  const [state, setState] = useState({
    order: orderOptions.ASCENDING,
    displayFirst: displayFirstOptions.QUESTION,
  });

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const sortCards = (order) => {
    switch (order) {
      case orderOptions.ASCENDING:
        console.log('asc', [...cards].sort((a, b) => a.inserted_at - b.inserted_at));
        setCards([...cards].sort((a, b) => a.inserted_at - b.inserted_at));
        break;
      case orderOptions.DESCENDING:
        console.log('desc', [...cards].sort((a, b) => b.inserted_at - a.inserted_at));
        setCards([...cards].sort((a, b) => b.inserted_at - a.inserted_at));
        break;
      case orderOptions.RANDOM:
        setCards(shuffleCards(cards));
        break;
      default:
        return;
    }
  };

  const handleButtonClick = (mode) => {
    if (mode === cardSetModes.STUDY) {
      sortCards(state.order);
    }
    setCurrentMode(cardSetModes[mode]);
  }

  const getButton = (mode, text) => (
    <StyledButton onClick={() => handleButtonClick(cardSetModes[mode])}>{text}</StyledButton>
  );


  return (
    <ConfigContainer>
      <h2>Get ready to study {currentSetName}!</h2>
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