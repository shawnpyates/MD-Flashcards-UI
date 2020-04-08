import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';
import Error from '../components/Error/Error';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { GET_CARD_LIBRARY } from '../api/apiReqTypes.json';
import { library as libraryContentConfig } from './contentConfig.json';

function CardLibrary() {
  const [selectedCardSetId, setSelectedCardSetId] = useState(null);
  const [nextPaginationId, setNextPaginationId] = useState('0');
  const [searchTerm, setSearchTerm] = useState('');

  const [
    {
      data: cardSets,
      metadata,
      isLoading,
      error: errorOnLoad,
    },
    fetchSets,
  ] = useApiCall({
    ...getApiReqData({
      type: GET_CARD_LIBRARY,
      urlParams: { nextPaginationId, searchTerm },
    }),
    shouldAppendToExistingData: nextPaginationId !== '0',
  });

  const submitSearch = () => {
    setNextPaginationId('0');
    fetchSets();
  };

  useEffect(() => {
    if (!cardSets) {
      fetchSets();
    }
  }, [fetchSets, cardSets]);

  useEffect(() => {
    if (metadata) {
      setNextPaginationId(metadata.cursor_after);
    }
  }, [metadata]);

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
      contentConfig={libraryContentConfig}
      isLoading={isLoading}
      handleRowClick={setSelectedCardSetId}
      fetchMore={fetchSets}
      nextPaginationId={nextPaginationId}
      currentInput={searchTerm}
      updateInput={setSearchTerm}
      submitInput={submitSearch}
      initActionButtonText="Search by name"
      submitInputButtonText="Search"
      inputLabel="Type Here to Search"
      emptyDataMessage="No matching sets were found."
    />
  );
}

export default CardLibrary;
