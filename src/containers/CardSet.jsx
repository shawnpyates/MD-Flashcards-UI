import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import styled from 'styled-components';

import StudyConfig from './StudyConfig';
import StudySession from './StudySession';

import { CardSetProvider } from '../context/cardSetContext';
import {
  actionTypes,
  cardSetModes,
  cardSetReducer,
  initialState,
} from '../reducers/cardSetReducer';

const SetContainer = styled(TableContainer)`
  width: 70%;
  position: absolute;
  top: 100px;
  left: 250px;
`;

const StyledButton = styled(Button)`
  background-color: #060;
  color: #FFF;
  margin-right: 25px;

  &:hover {
    background-color: #070;
  }
`;

const HeadTableCell = styled(TableCell)`
  font-weight: 700;
  text-transform: uppercase;
`;

const getCardSetTable = (sets) => (
  <Table>
    <TableHead>
      <HeadTableCell>Question</HeadTableCell>
      <HeadTableCell>Answer</HeadTableCell>
    </TableHead>
    <TableBody>
      {sets.map(({ id, question, answer }) => (
        <TableRow key={id}>
          <TableCell>{question}</TableCell>
          <TableCell>{answer}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);


function CardSet() {
  const { id: setId } = useParams();
  const [
    {
      currentCards,
      displayFirst,
      mode: currentMode,
      originalSet,
    },
    dispatch,
  ] = useReducer(cardSetReducer, initialState);

  useEffect(() => {
    fetch(`http://localhost:4000/api/card_sets/${setId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch({ type: actionTypes.SET_ORIGINAL, payload: data });
      });
  }, [setId]);

  const getButton = (mode, text) => (
    <StyledButton
      onClick={() => {
        dispatch({ type: actionTypes.UPDATE_MODE, payload: mode });
      }}
    >
      {text}
    </StyledButton>
  );

  return (
    <CardSetProvider
      currentCards={currentCards}
      currentMode={currentMode}
      displayFirst={displayFirst}
      originalSet={originalSet}
      dispatch={dispatch}
    >
      {currentMode === cardSetModes.CONFIG && <StudyConfig />}
      {currentMode === cardSetModes.STUDY && <StudySession />}
      {![cardSetModes.CONFIG, cardSetModes.STUDY].includes(currentMode)
      && (
        <SetContainer>
          <h4>
            Card Set:
            {originalSet ? originalSet.name : 'None'}
          </h4>
          <div>
            {getButton(cardSetModes.CONFIG, 'Start Studying')}
            {getButton(cardSetModes.ADD, 'Add More Cards')}
            {getButton(cardSetModes.EDIT, 'Edit Cards')}
          </div>
          {(
            currentCards && currentCards.length
              ? getCardSetTable(currentCards)
              : `${originalSet.name} currently contains no cards.`
          )}
        </SetContainer>
      )}
    </CardSetProvider>
  );
}

export default CardSet;
