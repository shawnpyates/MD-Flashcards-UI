import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { CREATE_NEW_CARD_GROUP } from '../api/apiReqTypes.json';

import { groups as groupsDataConfig } from './dataConfig.json';

function Main() {
  const [groupIdForRedirect, setGroupIdForRedirect] = useState(null);
  const [newGroupName, setNewGroupName] = useState(null);

  const { currentUser: { card_groups: cardGroups, name, id: userId } } = useContext(UserContext);

  const [
    { data: createdGroup, isLoading: isCreating, error: errorOnCreate },
    createNewGroup,
  ] = useApiCall(getApiReqData({
    type: CREATE_NEW_CARD_GROUP,
    data: { name: newGroupName, userId },
  }));

  const handleChange = ({ target: { value } }) => {
    setNewGroupName(value);
  };

  if (groupIdForRedirect || createdGroup) {
    return <Redirect to={`/groups/${groupIdForRedirect || createdGroup.id}`} />;
  }

  return (
    <CategoryListTable
      title={`${(name && `${name} `) || ''} Card Groups`}
      type="group"
      items={cardGroups}
      dataConfig={groupsDataConfig}
      newItemName={newGroupName}
      setNewItemName={setNewGroupName}
      createNewItem={createNewGroup}
      handleChange={handleChange}
      handleRowClick={setGroupIdForRedirect}
      isCreating={isCreating}
      shouldRenderAddOption
    />
  );
}

export default Main;
