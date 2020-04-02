import React, {
  useContext, useEffect, useReducer, useRef, useState,
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
import ReactMarkdown from 'react-markdown';

import StudyConfig from './StudyConfig';
import StudySession from './StudySession';
import CodeBlock from '../components/CodeBlock';

import { CardSetProvider } from '../context/cardSetContext';
import { UserContext } from '../context/userContext';

import {
  actionTypes,
  cardSetModes,
  cardSetReducer,
  initialState as initialCardSetState,
} from '../reducers/cardSetReducer';

import {
  getCardSet,
  createNewCard,
  editCard as editCardApiCall,
  removeCard as removeCardApiCall,
} from '../api';

const SetContainer = styled(TableContainer)`
  width: 80%;
  overflow: visible;
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
      ? ''
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

const SideContent = styled.td`
  margin-left: 20px;
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
  cursor: pointer;
`;

const ContentTableCell = styled(TableCell)`
  width: calc(100% / ${(props) => props.columnlength});
  ${(props) => (props.islast && 'border-bottom: none;') || ''}
  ${(props) => (props.fornewrowbutton && 'padding-bottom: 35px;') || ''}
  padding: 0 5px auto;
  & pre > code {
    white-space: pre-wrap !important;
  }
`;

const EmptyDataIndicator = styled.div`
  margin: 35px auto;
  text-align: center;
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

  const { currentUser } = useContext(UserContext);
  const isSetFromCurrentUser = currentUser && (originalSet.creator_id === currentUser.id);

  const [temporaryRows, setTemporaryRows] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(null);
  const previousMode = usePrevious(currentMode);

  useEffect(() => {
    getCardSet({ id: setId })
      .then((set) => {
        dispatch({ type: actionTypes.SET_ORIGINAL, payload: set });
        if (!set.cards.length) {
          dispatch({ type: actionTypes.UPDATE_MODE, payload: cardSetModes.ADD });
        }
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
    createNewCard({ question, answer, cardSetId: originalSet.id })
      .then((card) => {
        dispatch({ type: actionTypes.UPDATE_CARDS, payload: [...currentCards, card] });
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
    editCardApiCall({
      id, question, answer, cardSetId: originalSet.id,
    })
      .then((updatedCards) => {
        dispatch({ type: actionTypes.UPDATE_CARDS, payload: updatedCards });
        setDisplayMessage('Successfully edited card!');
      });
  };

  const removeCard = (id) => {
    removeCardApiCall({ id })
      .then((remainingCards) => {
        dispatch({ type: actionTypes.UPDATE_CARDS, payload: remainingCards });
        setDisplayMessage('Successfully deleted card!');
      });
  };

  const renderCurrentCards = (cards) => (
    cards.map(({ id, question, answer }) => (
      <TableRow key={id}>
        {[cardSetModes.VIEW, cardSetModes.ADD].includes(currentMode)
        && (
          <>
            <ContentTableCell columnlength={2}>
              <ReactMarkdown source={question} renderers={{ code: CodeBlock }} />
            </ContentTableCell>
            <ContentTableCell columnlength={2}>
              <ReactMarkdown source={answer} renderers={{ code: CodeBlock }} />
            </ContentTableCell>
            <SideContent>
              {isSetFromCurrentUser
              && (
                <StyledDeleteIcon onClick={() => removeCard(id)} />
              )}
            </SideContent>
          </>
        )}
      </TableRow>
    ))
  );

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
                <ContentTableCell columnlength={2} islast={isLast}>
                  <StyledTextarea
                    name="question"
                    value={question}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <ContentTableCell columnlength={2} islast={isLast}>
                  <StyledTextarea
                    name="answer"
                    value={answer}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
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
                  <ContentTableCell columnlength={2} fornewrowbutton>
                    <StyledButton addnewrow onClick={addNewRow}>+ New Row</StyledButton>
                  </ContentTableCell>
                  <ContentTableCell columnlength={2} />
                </TableRow>
              )}
            </>
          );
        })}
        {currentCards && renderCurrentCards(currentCards)}
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
          <h3>
            {(originalSet && originalSet.name) || ''}
          </h3>
          <div>
            {((currentCards && currentCards.length)
            && (
              <>
                {getButton(cardSetModes.CONFIG, 'Start Studying')}
                {isSetFromCurrentUser
                && (
                  <>
                    {getButton(cardSetModes.ADD, 'Add More Cards')}
                    {getButton(cardSetModes.EDIT, 'Edit Cards')}
                    <SuccessIndicator>{displayMessage || ''}</SuccessIndicator>
                  </>
                )}
              </>
            )) || ''}
          </div>
          {getCardSetTable()}
          {(currentCards && !currentCards.length
          && (
            <EmptyDataIndicator>
              {`${originalSet.name} currently contains no cards. Create some cards above to get started!`}
            </EmptyDataIndicator>
          )) || ''}
        </SetContainer>
      )}
    </CardSetProvider>
  );
}

export default CardSet;
