import React, { useContext, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../context/userContext';

const MainContainer = styled(TableContainer)`
  width: 70%;
  position: absolute;
  top: 100px;
  left: 250px;
`;

const HeadTableCell = styled(TableCell)`
  font-weight: 700;
`;

const StyledRow = styled(TableRow)`
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  background-color: #060;
  color: #FFF;

  &:hover {
    background-color: #070;
  }

  ${(props) => (
    props.newgroup
      ? 'transform: translateY(25%);'
      : 'display: block;'
  )}

  &:disabled{ 
    background-color: #F0F0F0;
  }
`;

const NewGroupContainer = styled.div`
  margin: 30px auto 5px;
`;

const StyledTextField = styled(TextField)`
  margin-right: 25px;
`;

const ContentTableCell = styled(TableCell)`
  width: calc(100% / ${(props) => props.columnlength})
`;


const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

const getCardGroupTable = (groups, setGroupId) => (
  <Table>
    <TableHead>
      <HeadTableCell>Name</HeadTableCell>
      <HeadTableCell>Created</HeadTableCell>
      <HeadTableCell>Number of Card Sets</HeadTableCell>
    </TableHead>
    <TableBody>
      {groups.map(({
        id, name, inserted_at: insertedAt, card_set_length: numberOfCardSets,
      }) => (
        <StyledRow key={id} onClick={() => setGroupId(id)}>
          <ContentTableCell columnlength={3}>{name}</ContentTableCell>
          <ContentTableCell columnlength={3}>{formatDate(insertedAt)}</ContentTableCell>
          <ContentTableCell columnlength={3}>{numberOfCardSets}</ContentTableCell>
        </StyledRow>
      ))}
    </TableBody>
  </Table>
);

function Main() {
  const [groupIdForRedirect, setGroupIdForRedirect] = useState(null);
  const [newGroupName, setNewGroupName] = useState(null);

  const { currentUser: { card_groups: cardGroups, name, id: userId } } = useContext(UserContext);

  const handleChange = ({ target: { value } }) => {
    setNewGroupName(value);
  };

  const createNewGroup = () => {
    fetch(
      'http://localhost:4000/api/card_groups',
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ card_group: { name: newGroupName, user_id: userId } }),
      },
    )
      .then((res) => res.json())
      .then(({ data }) => {
        setGroupIdForRedirect(data.id);
      });
  };

  if (groupIdForRedirect) {
    return <Redirect to={`/groups/${groupIdForRedirect}`} />;
  }

  return (
    <>
      <MainContainer>
        <h3>
          {name}
          &apos;s Card Groups
        </h3>
        <StyledButton
          onClick={() => {
            if (!newGroupName) {
              setNewGroupName('');
            }
          }}
        >
          Add a New Group
        </StyledButton>
        {(newGroupName || newGroupName === '')
        && (
          <NewGroupContainer>
            <StyledTextField
              label="Name Your New Group"
              variant="outlined"
              value={newGroupName}
              onChange={handleChange}
            />
            <StyledButton
              newgroup
              disabled={!newGroupName}
              onClick={createNewGroup}
            >
              Create
            </StyledButton>
          </NewGroupContainer>
        )}
        {(
          cardGroups.length
            ? getCardGroupTable(cardGroups, setGroupIdForRedirect)
            : 'You currently have no card groups. Create a group above to get started!'
        )}
      </MainContainer>
    </>
  );
}

export default Main;
