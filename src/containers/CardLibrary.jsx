import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';
import Error from '../components/Error/Error';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { GET_CARD_LIBRARY } from '../api/apiReqTypes.json';

import { library as librarycontentConfig } from './contentConfig.json';

function CardLibrary() {
  const [selectedCardSetId, setSelectedCardSetId] = useState(null);

  const [
    { data: cardSets, isLoading, error: errorOnLoad },
    fetchSets,
  ] = useApiCall(getApiReqData({ type: GET_CARD_LIBRARY }));

  useEffect(() => {
    if (!cardSets) {
      fetchSets();
    }
  }, [fetchSets, cardSets]);

  if (selectedCardSetId) {
    return <Redirect to={`/sets/${selectedCardSetId}`} />;
  }

  if (errorOnLoad) {
    return <Error />;
  }

  return (
    <CategoryListTable
      title="All Card Sets"
      type="set"
      items={cardSets}
      contentConfig={librarycontentConfig}
      isLoading={isLoading}
      handleRowClick={setSelectedCardSetId}
    />
  );
}

export default CardLibrary;
