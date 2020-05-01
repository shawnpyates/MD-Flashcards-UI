import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';
import Error from '../components/Error/Error';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { GET_CARD_GROUP, CREATE_NEW_CARD_SET } from '../api/apiReqTypes.json';

import { sets as setsContentConfig, toastIndicatorMessages } from '../content.json';

function CardGroup() {
  const { id: groupId } = useParams();
  const [newSetName, setNewSetName] = useState(null);

  const [
    { data: cardGroup, isLoading, error: errorOnLoad },
    fetchGroup,
  ] = useApiCall(getApiReqData({ type: GET_CARD_GROUP, urlParams: { id: groupId } }));

  const [
    { data: createdCardSet, isCreating, error: errorOnCreate },
    createNewCardSet,
  ] = useApiCall(
    getApiReqData({ type: CREATE_NEW_CARD_SET, data: { name: newSetName, groupId } }),
  );

  useEffect(() => {
    if (errorOnCreate) {
      toast(
        toastIndicatorMessages.sets.CREATE_NEW_CARD_SET.failure,
        { autoClose: 2000, hideProgressBar: true },
      );
    }
  }, [errorOnCreate]);

  useEffect(() => {
    if (!cardGroup) {
      fetchGroup();
    }
  }, [fetchGroup, cardGroup]);

  if (createdCardSet) {
    return <Redirect to={`/sets/${createdCardSet.id}`} />;
  }

  if (errorOnLoad) {
    return <Error />;
  }

  return (
    <>
      <CategoryListTable
        title={`${(cardGroup && cardGroup.name) || 'All'} Card Sets`}
        type="set"
        items={cardGroup && cardGroup.card_sets}
        contentConfig={setsContentConfig}
        currentInput={newSetName}
        updateInput={setNewSetName}
        submitInput={createNewCardSet}
        initActionButtonText="Create New Set"
        submitInputButtonText="Create"
        inputLabel="Name Your New Set"
        isCreating={isCreating}
        isLoading={isLoading}
        emptyDataMessage="You currently have no card sets. Create a set above to get started!"
      />
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

export default CardGroup;
