import React, {
  useCallback, useContext, useEffect, useReducer, useRef, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import StudyConfig from './StudyConfig';
import StudySession from './StudySession';

import CardListTable from '../components/CardListTable/CardListTable';
import Error from '../components/Error/Error';

import { CardSetProvider } from '../context/cardSetContext';
import { UserContext } from '../context/userContext';

import {
  actionTypes,
  cardSetModes,
  cardSetReducer,
  initialState as initialCardSetState,
} from '../reducers/cardSetReducer';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { GET_CARD_SET, CREATE_NEW_CARD } from '../api/apiReqTypes.json';
import { toastIndicatorMessages } from './contentConfig.json';

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
  const isSetFromCurrentUser = (
    currentUser
    && (originalSet && originalSet.creator_id === currentUser.id)
  );

  const [temporaryRows, setTemporaryRows] = useState(null);
  const [
    {
      type: opType,
      question: opQuestion,
      answer: opAnswer,
      id: opId,
      index: opIndex,
      submit: shouldSubmitToApi,
    },
    setCardUnderOperation,
  ] = useState({});

  const [
    {
      data: newData, isLoading, error: errorOnApiCall, callId,
    },
    callApi,
  ] = useApiCall({
    ...getApiReqData({
      type: opType || GET_CARD_SET,
      urlParams: { id: opId || setId },
      data: { question: opQuestion, answer: opAnswer, cardSetId: originalSet && originalSet.id },
    }),
    dispatch,
    dispatchType: opType ? actionTypes.UPDATE_CARDS : actionTypes.SET_ORIGINAL,
    shouldAppendToExistingData: opType === CREATE_NEW_CARD,
    callId: shortid.generate(),
  });

  const previousMode = usePrevious(currentMode);
  const previousCallId = usePrevious(callId);

  const handleNewlyCreatedCard = useCallback(() => {
    setTemporaryRows(
      temporaryRows.length > 1
        ? [
          ...temporaryRows.slice(0, opIndex),
          ...temporaryRows.slice(opIndex + 1),
        ] : [getInitialNewRow()],
    );
  }, [temporaryRows, opIndex]);

  useEffect(() => {
    if (callId === previousCallId) {
      return;
    }
    if (opType && !isLoading) {
      const toastOptions = { autoClose: 2000, hideProgressBar: true };
      if (newData) {
        if (opType === CREATE_NEW_CARD) {
          handleNewlyCreatedCard();
        }
        toast(toastIndicatorMessages.cards[opType].success, toastOptions);
      } else if (errorOnApiCall) {
        toast(toastIndicatorMessages.cards[opType].failure, toastOptions);
      }
    }
    setCardUnderOperation({});
  }, [
    newData,
    opType,
    handleNewlyCreatedCard,
    isLoading,
    callId,
    previousCallId,
    errorOnApiCall,
  ]);

  useEffect(() => {
    if (errorOnApiCall && !originalSet) {
      return;
    }
    if (!originalSet || shouldSubmitToApi) {
      callApi();
      setCardUnderOperation((prevState) => ({ ...prevState, submit: false }));
    }
  }, [originalSet, shouldSubmitToApi, callApi, errorOnApiCall]);

  useEffect(() => {
    if (currentCards && !currentCards.length && currentMode === cardSetModes.VIEW) {
      dispatch({ type: actionTypes.UPDATE_MODE, payload: cardSetModes.ADD });
    }
  }, [currentCards, currentMode]);

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

  const addNewRow = () => {
    setTemporaryRows([...temporaryRows, getInitialNewRow()]);
  };

  const handleTextareaChange = ({ target: { name, value } }, index) => {
    const updatedRow = { ...temporaryRows[index], [name]: value };
    setTemporaryRows([
      ...temporaryRows.slice(0, index),
      updatedRow,
      ...temporaryRows.slice(index + 1),
    ]);
  };

  if (errorOnApiCall && !originalSet) {
    return <Error />;
  }

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
            temporaryRows={temporaryRows}
            currentCards={currentCards}
            handleTextareaChange={handleTextareaChange}
            addNewRow={addNewRow}
            dispatch={dispatch}
            originalSet={originalSet}
            actionTypes={actionTypes}
            setCardUnderOperation={setCardUnderOperation}
            isLoading={isLoading}
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
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </CardSetProvider>
  );
}

export default CardSet;
