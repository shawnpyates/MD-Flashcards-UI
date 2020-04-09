import { useState, useCallback } from 'react';

import { API_URL } from '../config';
import apiReqTypes from './apiReqTypes.json';

const apiReq = async ({ endpoint, method, body }) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  const json = await response.json();
  return json;
};

export const useApiCall = ({
  endpoint,
  method,
  body,
  dispatch,
  dispatchType,
  shouldAppendToExistingData,
  callId,
}) => {
  const [res, setRes] = useState({
    data: null,
    metadata: null,
    error: null,
    isLoading: false,
  });

  const callApi = useCallback(async () => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const { data, metadata } = await apiReq({ endpoint, method, body });
      setRes((prevState) => {
        const appendedData = shouldAppendToExistingData ? [...prevState.data, ...data] : data;
        if (dispatch) {
          dispatch({ type: dispatchType, payload: appendedData });
        }
        return {
          data: dispatch ? { ack: true } : appendedData,
          metadata,
          isLoading: false,
          error: null,
          callId,
        };
      });
    } catch (error) {
      setRes({
        data: null, metadata: null, isLoading: false, error, callId,
      });
    }
  }, [body, endpoint, method, dispatch, dispatchType, callId, shouldAppendToExistingData]);
  return [res, callApi];
};

export const getApiReqData = ({ type, urlParams, data }) => {
  switch (type) {
    case apiReqTypes.GET_CURRENT_USER:
      return ({ endpoint: '/current_user' });
    case apiReqTypes.CREATE_NEW_CARD_GROUP:
      return ({
        endpoint: '/card_groups',
        method: 'POST',
        body: { card_group: { name: data.name, user_id: data.userId } },
      });
    case apiReqTypes.GET_CARD_GROUP:
      return ({ endpoint: `/card_groups/${urlParams.id}` });
    case apiReqTypes.GET_CARD_LIBRARY:
      return ({
        endpoint:
          `/card_sets?cursor_after=${urlParams.nextPaginationId}&match=${urlParams.searchTerm}`,
      });
    case apiReqTypes.CREATE_NEW_CARD_SET:
      return ({
        endpoint: '/card_sets',
        method: 'POST',
        body: { card_set: { name: data.name, card_group_id: data.groupId } },
      });
    case apiReqTypes.GET_CARD_SET:
      return ({ endpoint: `/card_sets/${urlParams.id}` });
    case apiReqTypes.CREATE_NEW_CARD:
      return ({
        endpoint: '/cards',
        method: 'POST',
        body: {
          card: { question: data.question, answer: data.answer, card_set_id: data.cardSetId },
        },
      });
    case apiReqTypes.EDIT_CARD:
      return ({
        endpoint: `/cards/${urlParams.id}`,
        method: 'PUT',
        body: { card: { question: data.question, answer: data.answer } },
      });
    case apiReqTypes.DELETE_CARD:
      return ({
        endpoint: `/cards/${urlParams.id}`,
        method: 'DELETE',
      });
    default:
      return null;
  }
};
