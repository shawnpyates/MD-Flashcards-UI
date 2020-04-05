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
  const { data } = await response.json();
  return data;
};

export const useApiCall = ({
  endpoint,
  method,
  body,
  dispatch,
  dispatchType,
  dispatchPayloadExistingData: existingData,
}) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });
  const callApi = useCallback(async () => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const data = await apiReq({ endpoint, method, body });
      if (dispatch) {
        dispatch({
          type: dispatchType,
          payload: existingData ? [...existingData, data] : data,
        });
      }
      setRes({ data: dispatch ? { ack: true } : data, isLoading: false, error: null });
    } catch (error) {
      setRes({ data: null, isLoading: false, error });
    }
  }, [body, endpoint, method, dispatch, dispatchType, existingData]);
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
      return ({ endpoint: '/card_sets' });
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
