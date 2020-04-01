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
import { DeleteForever } from '@material-ui/icons';
import shortid from 'shortid';

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
  width: 80%;
  position: absolute;
  top: 100px;
  left: 250px;
`;

const SetTable = styled(Table)`
  width: 95%;
`;

const StyledButton = styled(Button)`
  background-color: #060;
  color: #FFF;
  ${((props) => (
    props.createrow
      ? 'position: absolute; transform: translateY(50%);'
      : 'margin-right: 25px;'
  ))}

  ${((props) => (
    props.addnewrow
      ? 'width: 80px; font-size: 10px;'
      : ''
  ))}

  &:hover {
    background-color: #070;
  }

  &:disabled{ 
    background-color: #F0F0F0;
  }
`;

const SideContent = styled.div`
  display: inline;
  position: relative;
  margin-left: 20px;
`;

const AddRowTableCell = styled(TableCell)`
  ${(props) => (props.islast && 'border-bottom: none; padding-bottom: 0;') || ''}
  ${(props) => (props.reducepadding && 'padding: 5px;') || ''}
`;

const HeadTableCell = styled(TableCell)`
  font-weight: 700;
  text-transform: uppercase;
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
`;

const SuccessIndicator = styled.span`
  margin-left: 20px;
  color: #060;
  font-weight: 700;
`;

const StyledDeleteIcon = styled(DeleteForever)`
  color: #F00;
  transform: translateY(50%);
  position: absolute;
  cursor: pointer;
`;

const getInitialNewRow = () => ({ question: null, answer: null, shortid: shortid.generate() });

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
  const [temporaryRows, setTemporaryRows] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(null);
  const previousMode = usePrevious(currentMode);

  useEffect(() => {
    fetch(`http://localhost:4000/api/card_sets/${setId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch({ type: actionTypes.SET_ORIGINAL, payload: data });
      });
  }, [setId]);

  useEffect(() => {
    if (displayMessage) {
      setTimeout(() => {
        setDisplayMessage(null);
      }, 2000);
    }
  }, [displayMessage]);

  useEffect(() => {
    if (currentMode === previousMode) {
      return;
    }
    if (currentMode === cardSetModes.ADD) {
      setTemporaryRows([getInitialNewRow()]);
      return;
    }
    if (currentMode === cardSetModes.EDIT) {
      setTemporaryRows(currentCards);
      return;
    }
    if ([cardSetModes.ADD, cardSetModes.EDIT].includes(previousMode)) {
      setTemporaryRows(null);
    }
  }, [currentMode, previousMode, currentCards]);

  const handleTextareaChange = ({ target: { name, value } }, index) => {
    const updatedRow = { ...temporaryRows[index], [name]: value };
    setTemporaryRows([
      ...temporaryRows.slice(0, index),
      updatedRow,
      ...temporaryRows.slice(index + 1),
    ]);
  };

  const addNewRow = () => {
    setTemporaryRows([...temporaryRows, getInitialNewRow()]);
  };

  const addNewCard = ({ question, answer, index }) => {
    fetch(
      'http://localhost:4000/api/cards',
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ card: { question, answer, card_set_id: originalSet.id } }),
      },
    )
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch({ type: actionTypes.UPDATE_CARDS, payload: [...currentCards, data] });
        setTemporaryRows(
          temporaryRows.length > 1
            ? [
              ...temporaryRows.slice(0, index),
              ...temporaryRows.slice(index + 1),
            ] : [getInitialNewRow()],
        );
        setDisplayMessage('Successfully added card!');
      });
  };

  const editCard = ({ question, answer, id }) => {
    fetch(
      `http://localhost:4000/api/cards/${id}`,
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ card: { question, answer, card_set_id: originalSet.id } }),
      },
    )
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch({ type: actionTypes.UPDATE_CARDS, payload: data });
        setDisplayMessage('Successfully edited card!');
      });
  };

  const removeCard = (id) => {
    fetch(`http://localhost:4000/api/cards/${id}`, { credentials: 'include', method: 'DELETE' })
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch({ type: actionTypes.UPDATE_CARDS, payload: data });
        setDisplayMessage('Successfully deleted card!');
      });
  };


  const getCardSetTable = () => (
    <SetTable>
      <TableHead>
        <HeadTableCell>Question</HeadTableCell>
        <HeadTableCell>Answer</HeadTableCell>
      </TableHead>
      <TableBody>
        {([cardSetModes.ADD, cardSetModes.EDIT].includes(currentMode) && temporaryRows)
        && temporaryRows.map(({
          question, answer, shortid: key, id,
        }, i) => {
          const isLast = i === temporaryRows.length - 1;
          const { buttonClickHandler, buttonText, shouldDisplayNewRowButton } = (
            currentMode === cardSetModes.ADD
              ? {
                buttonClickHandler: addNewCard,
                buttonText: 'Add',
                shouldDisplayNewRowButton: isLast,
              } : {
                buttonClickHandler: editCard,
                buttonText: 'Edit',
                shouldDisplayNewRowButton: false,
              }
          );
          const correspondingCard = id && currentCards.find((card) => card.id === id);
          const isUnchanged = (
            correspondingCard
            && (correspondingCard.question === question && correspondingCard.answer === answer)
          );
          return (
            <>
              <TableRow key={id || key}>
                <AddRowTableCell islast={isLast}>
                  <StyledTextarea
                    name="question"
                    value={question}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </AddRowTableCell>
                <AddRowTableCell islast={isLast}>
                  <StyledTextarea
                    name="answer"
                    value={answer}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </AddRowTableCell>
                <SideContent>
                  <StyledButton
                    createrow
                    disabled={!question || !answer || isUnchanged}
                    onClick={() => {
                      buttonClickHandler({
                        question, answer, index: i, id,
                      });
                    }}
                  >
                    {buttonText}
                  </StyledButton>
                </SideContent>
              </TableRow>
              {shouldDisplayNewRowButton
              && (
                <TableRow key="addnew">
                  <AddRowTableCell reducepadding>
                    <StyledButton addnewrow onClick={addNewRow}>+ New Row</StyledButton>
                  </AddRowTableCell>
                  <AddRowTableCell reducepadding />
                </TableRow>
              )}
            </>
          );
        })}
        {currentCards.map(({ id, question, answer }) => (
          <TableRow key={id}>
            {[cardSetModes.VIEW, cardSetModes.ADD].includes(currentMode)
            && (
              <>
                <TableCell>{question}</TableCell>
                <TableCell>{answer}</TableCell>
                <SideContent>
                  <StyledDeleteIcon onClick={() => removeCard(id)} />
                </SideContent>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </SetTable>
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
            <SuccessIndicator>{displayMessage || ''}</SuccessIndicator>
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
