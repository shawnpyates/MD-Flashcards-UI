import React, {
  useContext, useEffect, useReducer, useRef, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import shortid from 'shortid';

import StudyConfig from './StudyConfig';
import StudySession from './StudySession';

import CardListTable from '../components/CardListTable/CardListTable';

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

  const renderActiveMode = (mode) => {
    switch (mode) {
      case cardSetModes.CONFIG:
        return <StudyConfig />;
      case cardSetModes.STUDY:
        return <StudySession />;
      default:
        return (
          <CardListTable
            cardSetModes={cardSetModes}
            currentMode={currentMode}
            isSetFromCurrentUser={isSetFromCurrentUser}
            addNewCard={addNewCard}
            editCard={editCard}
            removeCard={removeCard}
            temporaryRows={temporaryRows}
            currentCards={currentCards}
            handleTextareaChange={handleTextareaChange}
            addNewRow={addNewRow}
            dispatch={dispatch}
            originalSet={originalSet}
            actionTypes={actionTypes}
            displayMessage={displayMessage}
          />
        );
    }
  };


  return (
    <CardSetProvider
      currentCards={currentCards}
      currentMode={currentMode}
      displayFirst={displayFirst}
      originalSet={originalSet}
      dispatch={dispatch}
    >
      {renderActiveMode(currentMode)}
    </CardSetProvider>
  );
}

export default CardSet;
