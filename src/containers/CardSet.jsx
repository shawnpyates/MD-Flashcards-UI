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

import { CardSetProvider } from '../context/cardSetContext';
import { UserContext } from '../context/userContext';

import {
  actionTypes,
  cardSetModes,
  cardSetReducer,
  initialState as initialCardSetState,
} from '../reducers/cardSetReducer';


import { getApiReqData, useApiCall } from '../api/apiRequest';
import {
  GET_CARD_SET,
  CREATE_NEW_CARD,
  EDIT_CARD,
  DELETE_CARD,
} from '../api/apiReqTypes.json';

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

  const previousMode = usePrevious(currentMode);

  const [{ data: newData, isLoading, error: errorOnApiCall }, callApi] = useApiCall({
    ...getApiReqData({
      type: opType || GET_CARD_SET,
      urlParams: { id: opId || setId },
      data: { question: opQuestion, answer: opAnswer, cardSetId: originalSet && originalSet.id },
    }),
    dispatch,
    dispatchType: opType ? actionTypes.UPDATE_CARDS : actionTypes.SET_ORIGINAL,
    dispatchPayloadExistingData: opType === CREATE_NEW_CARD && currentCards,
  });

  const handleNewlyCreatedCard = useCallback(() => {
    setTemporaryRows(
      temporaryRows.length > 1
        ? [
          ...temporaryRows.slice(0, opIndex),
          ...temporaryRows.slice(opIndex + 1),
        ] : [getInitialNewRow()],
    );
  }, [temporaryRows, opIndex]);

  const getSuccessMessage = useCallback(() => {
    switch (opType) {
      case CREATE_NEW_CARD:
        return 'Successfully created card!';
      case EDIT_CARD:
        return 'Successfully edited card!';
      case DELETE_CARD:
        return 'Successfully deleted card!';
      default:
        return '';
    }
  }, [opType]);

  useEffect(() => {
    if (newData) {
      if (opType === CREATE_NEW_CARD) {
        handleNewlyCreatedCard();
      }
      if (opType) {
        toast(getSuccessMessage(), { autoClose: 2000, hideProgressBar: true });
      }
      setCardUnderOperation({});
    }
  }, [newData, opType, getSuccessMessage, handleNewlyCreatedCard]);

  useEffect(() => {
    if (!originalSet || shouldSubmitToApi) {
      callApi();
      setCardUnderOperation((prevState) => ({ ...prevState, submit: false }));
    }
  }, [originalSet, shouldSubmitToApi, callApi]);

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
