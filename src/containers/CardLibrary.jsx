import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';

import { getApiReqData, useApiFetch } from '../api/apiRequest';
import { GET_CARD_LIBRARY } from '../api/apiReqTypes.json';

import { library as libraryDataConfig } from './dataConfig.json';

function CardLibrary() {
  const [selectedCardSetId, setSelectedCardSetId] = useState(null);

  const [cardSets, isLoading] = useApiFetch(getApiReqData({ type: GET_CARD_LIBRARY }));

  if (selectedCardSetId) {
    return <Redirect to={`/sets/${selectedCardSetId}`} />;
  }

  return (
    (!isLoading
    && (
      <CategoryListTable
        title="All Card Sets"
        type="set"
        items={cardSets}
        dataConfig={libraryDataConfig}
        handleRowClick={setSelectedCardSetId}
      />
    )) || <div>Loading...</div>
  );
}

export default CardLibrary;
