import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { GET_CARD_LIBRARY } from '../api/apiReqTypes.json';

import { library as libraryDataConfig } from './dataConfig.json';

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

  return (
    (cardSets
    && (
      <CategoryListTable
        title="All Card Sets"
        type="set"
        items={cardSets}
        dataConfig={libraryDataConfig}
        isLoading={isLoading}
        handleRowClick={setSelectedCardSetId}
      />
    )) || <div>Loading...</div>
  );
}

export default CardLibrary;
