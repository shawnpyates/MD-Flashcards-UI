import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';

import { getApiReqData, useApiFetch, useApiUpdate } from '../api/apiRequest';
import { GET_CARD_GROUP, CREATE_NEW_CARD_SET } from '../api/apiReqTypes.json';

import { sets as setsDataConfig } from './dataConfig.json';

function CardGroup() {
  const { id: groupId } = useParams();
  const [selectedCardSetId, setSelectedCardSetId] = useState(null);
  const [newSetName, setNewSetName] = useState(null);

  const [
    { name, card_sets: cardSets },
    isLoading,
  ] = useApiFetch(getApiReqData({ type: GET_CARD_GROUP, urlParams: { id: groupId } }));

  const handleChange = ({ target: { value } }) => {
    setNewSetName(value);
  };

  const [
    { data: { id: createdSetId }, isLoading: isCreating, error: errorOnCreate },
    createNewSet,
  ] = useApiUpdate(getApiReqData({
    type: CREATE_NEW_CARD_SET,
    data: { name: newSetName, groupId },
  }));

  const idForRedirect = selectedCardSetId || createdSetId;

  if (idForRedirect) {
    return <Redirect to={`/sets/${idForRedirect}`} />;
  }

  return (
    (!isLoading
    && (
      <CategoryListTable
        title={`${name || 'All'} Card Sets`}
        type="set"
        items={cardSets}
        dataConfig={setsDataConfig}
        newItemName={newSetName}
        setNewItemName={setNewSetName}
        createNewItem={createNewSet}
        handleChange={handleChange}
        handleRowClick={setSelectedCardSetId}
        shouldRenderAddOption
      />
    )) || <div>Loading...</div>
  );
}

export default CardGroup;
