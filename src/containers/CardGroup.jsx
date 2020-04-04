import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';
import { getCardGroup, createNewCardSet } from '../api';
import { sets as setsDataConfig } from './dataConfig.json';

function CardGroup() {
  const { id: groupId } = useParams();
  const [{ name, card_sets: cardSets }, setCurrentGroup] = useState({});
  const [cardSetIdForRedirect, setCardSetIdForRedirect] = useState(null);
  const [newSetName, setNewSetName] = useState(null);

  useEffect(() => {
    getCardGroup({ id: groupId })
      .then((group) => {
        setCurrentGroup(group);
      });
  }, [groupId]);

  const handleChange = ({ target: { value } }) => {
    setNewSetName(value);
  };

  const createNewSet = () => {
    createNewCardSet({ name: newSetName, groupId })
      .then((set) => {
        setCardSetIdForRedirect(set.id);
      });
  };

  if (cardSetIdForRedirect) {
    return <Redirect to={`/sets/${cardSetIdForRedirect}`} />;
  }

  return (
    (cardSets
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
        handleRowClick={setCardSetIdForRedirect}
        shouldRenderAddOption
      />
    )) || <div />
  );
}

export default CardGroup;
