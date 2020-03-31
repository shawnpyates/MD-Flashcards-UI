import React, {
  useEffect, useReducer, useRef, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
} from '@material-ui/core';
import styled from 'styled-components';

import StudyConfig from './StudyConfig';
import StudySession from './StudySession';

import { CardSetProvider } from '../context/cardSetContext';
import {
  actionTypes,
  cardSetModes,
  cardSetReducer,
  initialState as initialCardSetState,
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
  ${((props) => (
    props.addrow
      ? 'position: fixed; margin-left: 10px;'
      : 'margin-right: 25px;'
  ))}

  &:hover {
    background-color: #070;
  }
`;

const TableCellForButton = styled(TableCell)`
  padding: 0;
`;

const AddRowDiv = styled.div`
  display: flex;
  align-items: center;
`;

const HeadTableCell = styled(TableCell)`
  font-weight: 700;
  text-transform: uppercase;
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
`;

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

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
  ] = useReducer(cardSetReducer, initialCardSetState);
  const [additionalRows, setAdditionalRows] = useState(null);
  const previousMode = usePrevious(currentMode);

  useEffect(() => {
    fetch(`http://localhost:4000/api/card_sets/${setId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch({ type: actionTypes.SET_ORIGINAL, payload: data });
      });
  }, [setId]);

  useEffect(() => {
    if (currentMode === cardSetModes.ADD) {
      setAdditionalRows([{ question: null, answer: null }]);
    }
    if (previousMode === cardSetModes.ADD) {
      setAdditionalRows(null);
    }
  }, [currentMode]);

  const handleTextareaChange = ({ target: { name, value } }, index) => {
    const updatedRow = { ...additionalRows[index], [name]: value };
    setAdditionalRows([
      ...additionalRows.slice(0, index),
      updatedRow,
      ...additionalRows.slice(index + 1),
    ]);
  };

  const getCardSetTable = () => (
    <Table>
      <TableHead>
        <HeadTableCell>Question</HeadTableCell>
        <HeadTableCell>Answer</HeadTableCell>
      </TableHead>
      <TableBody>
        {additionalRows
        && additionalRows.map((row, i) => (
          <TableRow>
            <TableCell>
              <StyledTextarea
                name="question"
                value={additionalRows[i].question}
                onChange={(ev) => handleTextareaChange(ev, i)}
                rowsMin={3}
              />
            </TableCell>
            <TableCell>
              <StyledTextarea
                name="answer"
                value={additionalRows[i].answer}
                onChange={(ev) => handleTextareaChange(ev, i)}
                rowsMin={3}
              />
            </TableCell>
            <TableCellForButton>
              <AddRowDiv>
                <StyledButton addrow>Add</StyledButton>
              </AddRowDiv>
            </TableCellForButton>
          </TableRow>
        ))}
        {currentCards.map(({ id, question, answer }) => (
          <TableRow key={id}>
            <TableCell>{question}</TableCell>
            <TableCell>{answer}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

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
              ? getCardSetTable()
              : `${originalSet.name} currently contains no cards.`
          )}
        </SetContainer>
      )}
    </CardSetProvider>
  );
}

export default CardSet;
