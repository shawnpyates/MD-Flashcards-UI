import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { UserContext } from '../context/userContext';

import CategoryListTable from '../components/CategoryListTable/CategoryListTable';

import { getApiReqData, useApiCall } from '../api/apiRequest';
import { CREATE_NEW_CARD_GROUP } from '../api/apiReqTypes.json';

import { groups as groupsContentConfig, toastIndicatorMessages } from './contentConfig.json';

function Main() {
  const [newGroupName, setNewGroupName] = useState(null);

  const { currentUser: { card_groups: cardGroups, name, id: userId } } = useContext(UserContext);

  const [
    { data: createdGroup, isLoading: isCreating, error: errorOnCreate },
    createNewGroup,
  ] = useApiCall(getApiReqData({
    type: CREATE_NEW_CARD_GROUP,
    data: { name: newGroupName, userId },
  }));

  useEffect(() => {
    if (errorOnCreate) {
      toast(
        toastIndicatorMessages.groups.CREATE_NEW_CARD_GROUP.failure,
        { autoClose: 2000, hideProgressBar: true },
      );
    }
  }, [errorOnCreate]);

  const handleChange = ({ target: { value } }) => {
    setNewGroupName(value);
  };

  if (createdGroup) {
    return <Redirect to={`/groups/${createdGroup.id}`} />;
  }

  return (
    <>
      <CategoryListTable
        title={`${(name && `${name} `) || ''} Card Groups`}
        type="group"
        items={cardGroups}
        contentConfig={groupsContentConfig}
        handleChange={handleChange}
        isCreating={isCreating}
        currentInput={newGroupName}
        updateInput={setNewGroupName}
        submitInput={createNewGroup}
        initActionButtonText="Create New Group"
        submitInputButtonText="Create"
        inputLabel="Name Your New Group"
        emptyDataMessage="You currently have no card groups. Create a group above to get started!"
      />
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

export default Main;
