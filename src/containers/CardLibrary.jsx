import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';
import Error from '../components/Error/Error';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { GET_CARD_LIBRARY } from '../api/apiReqTypes.json';
import { library as libraryContentConfig } from '../content.json';

function CardLibrary() {
  const [selectedCardSetId, setSelectedCardSetId] = useState(null);
  const [{ nextPaginationId, searchTerm, shouldFetch }, setFetchState] = useState({
    nextPaginationId: '0',
    searchTerm: '',
    shouldFetch: false,
  });

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

  const submitSearch = async () => {
    setFetchState((prev) => ({ ...prev, nextPaginationId: '0', shouldFetch: true }));
  };

  const updateSearchTerm = (value) => {
    setFetchState((prev) => ({ ...prev, searchTerm: value }));
  };

  useEffect(() => {
    if (!cardSets) {
      fetchSets();
    }
  }, [fetchSets, cardSets]);

  useEffect(() => {
    if (shouldFetch) {
      fetchSets();
      setFetchState((prev) => ({ ...prev, shouldFetch: false }));
    }
  }, [shouldFetch, fetchSets]);

  useEffect(() => {
    if (metadata && metadata.cursor_after !== undefined) {
      setFetchState((prev) => ({ ...prev, nextPaginationId: metadata.cursor_after }));
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
      updateInput={updateSearchTerm}
      submitInput={submitSearch}
      submitInputButtonText="Search"
      inputLabel="Type here to search by name"
      emptyDataMessage="No matching sets were found."
    />
  );
}

export default CardLibrary;
