import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';

import { getApiReqData, useApiUpdate } from '../api/apiRequest';
import { CREATE_NEW_CARD_GROUP } from '../api/apiReqTypes.json';

import { groups as groupsDataConfig } from './dataConfig.json';

function Main() {
  const [groupIdForRedirect, setGroupIdForRedirect] = useState(null);
  const [newGroupName, setNewGroupName] = useState(null);

  const { currentUser: { card_groups: cardGroups, name, id: userId } } = useContext(UserContext);

  const [
    { data: { id: createdGroupId }, isLoading: isCreating, error: errorOnCreate },
    createNewGroup,
  ] = useApiUpdate(getApiReqData({
    type: CREATE_NEW_CARD_GROUP,
    data: { name: newGroupName, userId },
  }));

  const handleChange = ({ target: { value } }) => {
    setNewGroupName(value);
  };

  if (groupIdForRedirect || createdGroupId) {
    return <Redirect to={`/groups/${groupIdForRedirect || createdGroupId}`} />;
  }

  return (
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
  );
}

export default Main;
