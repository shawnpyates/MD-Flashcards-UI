import { API_URL } from './config';

const apiCall = async (endpoint, method, body) => {
  const result = await fetch(`${API_URL}${endpoint}`, {
    method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  const { data } = await result.json();
  return data;
};

export const getCurrentUser = async () => {
  const user = await apiCall('/current_user');
  return user;
};

export const createNewCardGroup = async ({ name, userId }) => {
  const group = await apiCall('/card_groups', 'POST', { card_group: { name, user_id: userId } });
  return group;
};

export const getCardGroup = async ({ id }) => {
  const group = await apiCall(`/card_groups/${id}`);
  return group;
};

export const getCardLibrary = async () => {
  const sets = await apiCall('/card_sets');
  return sets;
};

export const createNewCardSet = async ({ name, groupId }) => {
  const set = await apiCall('/card_sets', 'POST', { card_set: { name, card_group_id: groupId } });
  return set;
};

export const getCardSet = async ({ id }) => {
  const set = await apiCall(`/card_sets/${id}`);
  return set;
};

export const createNewCard = async ({ question, answer, cardSetId }) => {
  const card = await apiCall('/cards', 'POST', {
    card: { question, answer, card_set_id: cardSetId },
  });
  return card;
};

export const editCard = async ({
  id, question, answer, cardSetId,
}) => {
  const updatedCardSet = await apiCall(`/cards/${id}`, 'PUT', {
    card: { question, answer, card_set_id: cardSetId },
  });
  return updatedCardSet;
};

export const removeCard = async ({ id }) => {
  const remainingCards = await apiCall(`/cards/${id}`, 'DELETE');
  return remainingCards;
};
