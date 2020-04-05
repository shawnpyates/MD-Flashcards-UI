import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { GET_CARD_GROUP, CREATE_NEW_CARD_SET } from '../api/apiReqTypes.json';

import { sets as setsDataConfig } from './dataConfig.json';

function CardGroup() {
  const { id: groupId } = useParams();
  const [selectedCardSetId, setSelectedCardSetId] = useState(null);
  const [newSetName, setNewSetName] = useState(null);


  const handleChange = ({ target: { value } }) => {
    setNewSetName(value);
  };

  const [
    { data: cardGroup, isLoading, error: errorOnLoad },
    fetchGroup,
  ] = useApiCall(getApiReqData({ type: GET_CARD_GROUP, urlParams: { id: groupId } }));

  const [
    { data: newCardSet, isCreating, error: errorOnCreate },
    createNewCardSet,
  ] = useApiCall(
    getApiReqData({ type: CREATE_NEW_CARD_SET, data: { name: newSetName, groupId } }),
  );

  const idForRedirect = selectedCardSetId || (newCardSet && newCardSet.id);

  useEffect(() => {
    if (!cardGroup) {
      fetchGroup();
    }
  }, [fetchGroup, cardGroup]);

  if (idForRedirect) {
    return <Redirect to={`/sets/${idForRedirect}`} />;
  }

  return (
    (cardGroup
    && (
      <CategoryListTable
        title={`${(cardGroup.name) || 'All'} Card Sets`}
        type="set"
        items={cardGroup.card_sets}
        dataConfig={setsDataConfig}
        newItemName={newSetName}
        setNewItemName={setNewSetName}
        createNewItem={createNewCardSet}
        handleChange={handleChange}
        handleRowClick={setSelectedCardSetId}
        isCreating={isCreating}
        isLoading={isLoading}
        shouldRenderAddOption
      />
    )) || <div>Loading...</div>
  );
}

export default CardGroup;
