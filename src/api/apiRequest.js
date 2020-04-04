import { useState, useCallback, useEffect } from 'react';

import { API_URL } from '../config';
import apiReqTypes from './apiReqTypes.json';

export const apiReq = async ({ endpoint, method, body }) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  const { data } = await response.json();
  return data;
};

export const useApiFetch = ({ endpoint }) => {
  console.log('endpoint: ', endpoint);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchUrl() {
      const resData = await apiReq({ endpoint });
      setData(resData);
      setIsLoading(false);
    }
    fetchUrl();
  }, [endpoint]);
  return [data, isLoading];
};

export const useApiUpdate = ({ endpoint, method, body }) => {
  const [res, setRes] = useState({ data: {}, error: null, isLoading: false });
  const callApi = useCallback(async () => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const data = await apiReq({ endpoint, method, body });
      setRes({ data, isLoading: false, error: null });
    } catch (error) {
      setRes({ data: null, isLoading: false, error });
    }
  }, [body, endpoint, method]);
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
      return ({ endpoint: `/cardGroups/${urlParams.id}` });
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
// export const getCurrentUser = () => useApiFetch('/current_user');
// // const user = await apiCall('/current_user');
// // return user;
// // ;

// export const createNewCardGroup = async ({ name, userId }) => {
//   const group = await apiCall('/card_groups', 'POST', { card_group: { name, user_id: userId } });
//   return group;
// };

// export const getCardGroup = async ({ id }) => {
//   const group = await apiCall(`/card_groups/${id}`);
//   return group;
// };

// export const getCardLibrary = async () => {
//   const sets = await apiCall('/card_sets');
//   return sets;
// };

// export const createNewCardSet = async ({ name, groupId }) => {
//   const set = await apiCall('/card_sets', 'POST', { card_set: { name, card_group_id: groupId } });
//   return set;
// };

// export const getCardSet = async ({ id }) => {
//   const set = await apiCall(`/card_sets/${id}`);
//   return set;
// };

// export const createNewCard = async ({ question, answer, cardSetId }) => {
//   const card = await apiCall('/cards', 'POST', {
//     card: { question, answer, card_set_id: cardSetId },
//   });
//   return card;
// };

// export const editCard = async ({
//   id, question, answer, cardSetId,
// }) => {
//   const updatedCardSet = await apiCall(`/cards/${id}`, 'PUT', {
//     card: { question, answer, card_set_id: cardSetId },
//   });
//   return updatedCardSet;
// };

// export const removeCard = async ({ id }) => {
//   const remainingCards = await apiCall(`/cards/${id}`, 'DELETE');
//   return remainingCards;
// };
