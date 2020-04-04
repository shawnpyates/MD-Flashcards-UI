import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';
import { getCardLibrary } from '../api';
import { library as libraryDataConfig } from './dataConfig.json';

function CardLibrary() {
  const [cardSets, setCurrentCardSets] = useState([]);
  const [cardSetIdForRedirect, setCardSetIdForRedirect] = useState(null);

  useEffect(() => {
    getCardLibrary()
      .then((sets) => {
        setCurrentCardSets(sets);
      });
  }, []);

  if (cardSetIdForRedirect) {
    return <Redirect to={`/sets/${cardSetIdForRedirect}`} />;
  }

  return (
    (cardSets
    && (
      <CategoryListTable
        title="All Card Sets"
        type="set"
        items={cardSets}
        dataConfig={libraryDataConfig}
        handleRowClick={setCardSetIdForRedirect}
      />
    )) || <div />
  );
}

export default CardLibrary;
