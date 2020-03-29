import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';

import { CardSetContext } from '../context/cardSetContext';

const StudyCard = styled(Card)`
  width: 40%;
  min-height: 150px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  text-align: center;
`;

const ActionButton = styled(Button)`
  position: absolute;
  background-color: #060;
  color: #FFF;
  margin-top: 15px;
  ${props => props.side}: 50px;
`;

function StudySession() {
  const {
    setCurrentMode,
    currentSet,
    setCurrentSet,
    displayFirst,
  } = useContext(CardSetContext);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  return (
    <StudyCard>
      <CardContent>
        <h4>{currentSet.name}</h4>
        <Typography variant="body2" component="p">
          {currentSet.cards[currentCardIndex][displayFirst]}
        </Typography>
        <CardActions>
          <ActionButton size="small" side="left">Repeat This Card Later</ActionButton>
          <ActionButton size="small" side="right">Go Back To Card List</ActionButton>
        </CardActions>
      </CardContent>
    </StudyCard>
  );
}

export default StudySession;