import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import CategoryListTable from '../components/CategoryListTable';
import { createNewCardGroup } from '../api';
import { groups as groupsDataConfig } from './dataConfig.json';

function Main() {
  const [groupIdForRedirect, setGroupIdForRedirect] = useState(null);
  const [newGroupName, setNewGroupName] = useState(null);

  const { currentUser: { card_groups: cardGroups, name, id: userId } } = useContext(UserContext);

  const handleChange = ({ target: { value } }) => {
    setNewGroupName(value);
  };

  const createNewGroup = () => {
    createNewCardGroup({ name: newGroupName, userId })
      .then((group) => {
        setGroupIdForRedirect(group.id);
      });
  };

  if (groupIdForRedirect) {
    return <Redirect to={`/groups/${groupIdForRedirect}`} />;
  }

  return (
    (cardGroups
    && (
      <CategoryListTable
        title={`${(name && `${name} `) || ''} Card Groups`}
        type="set"
        items={cardGroups}
        dataConfig={groupsDataConfig}
        newItemName={newGroupName}
        setNewItemName={setNewGroupName}
        createNewItem={createNewGroup}
        handleChange={handleChange}
        handleRowClick={setGroupIdForRedirect}
        shouldRenderAddOption
      />
    )) || <div />
  );
}

export default Main;
