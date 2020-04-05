export const displayFirstOptions = {
  QUESTION: 'question',
  ANSWER: 'answer',
};

export const cardSetModes = {
  VIEW: 'view',
  ADD: 'add',
  EDIT: 'edit',
  CONFIG: 'config',
  STUDY: 'study',
};

export const actionTypes = {
  SET_ORIGINAL: 'setOriginal',
  UPDATE_MODE: 'updateMode',
  UPDATE_CARDS: 'updateCards',
  SET_STUDY_SESSION_CONFIG: 'setStudySessionConfig',
};

export const initialState = {
  originalSet: null,
  mode: cardSetModes.VIEW,
  displayFirst: displayFirstOptions.QUESTION,
  currentCards: null,
};

export const cardSetReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ORIGINAL: {
      return {
        ...state,
        originalSet: payload,
        currentCards: payload.cards,
      };
    }
    case actionTypes.UPDATE_MODE: {
      return {
        ...state,
        mode: payload,
      };
    }
    case actionTypes.UPDATE_CARDS: {
      return {
        ...state,
        currentCards: payload,
      };
    }
    case actionTypes.SET_STUDY_SESSION_CONFIG: {
      const { mode, displayFirst, currentCards } = payload;
      return {
        ...state,
        mode,
        displayFirst,
        currentCards,
      };
    }
    default:
      return state;
  }
};
