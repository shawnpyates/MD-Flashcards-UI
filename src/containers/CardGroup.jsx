import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
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

const GroupContainer = styled(TableContainer)`
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

const getCardSetTable = (sets, setId) => (
  <Table>
    <TableHead>
      <HeadTableCell>Name</HeadTableCell>
      <HeadTableCell>Created</HeadTableCell>
      <HeadTableCell>Number of Cards</HeadTableCell>
    </TableHead>
    <TableBody>
      {sets.map(({
        id, name, inserted_at: insertedAt, card_length: numberOfCards,
      }) => (
        <StyledRow key={id} onClick={() => setId(id)}>
          <ContentTableCell columnlength={3}>{name}</ContentTableCell>
          <ContentTableCell columnlength={3}>{formatDate(insertedAt)}</ContentTableCell>
          <ContentTableCell columnlength={3}>{numberOfCards}</ContentTableCell>
        </StyledRow>
      ))}
    </TableBody>
  </Table>
);

function CardGroup() {
  const { id: groupId } = useParams();
  const [{ name, card_sets: cardSets }, setCurrentGroup] = useState({});
  const [cardSetIdForRedirect, setCardSetIdForRedirect] = useState(null);
  const [newSetName, setNewSetName] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/card_groups/${groupId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then(({ data }) => {
        setCurrentGroup(data);
      });
  }, [groupId]);

  const handleChange = ({ target: { value } }) => {
    setNewSetName(value);
  };

  const createNewSet = () => {
    fetch(
      'http://localhost:4000/api/card_sets',
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ card_set: { name: newSetName, card_group_id: groupId } }),
      },
    )
      .then((res) => res.json())
      .then(({ data }) => {
        setCardSetIdForRedirect(data.id);
      });
  };

  if (cardSetIdForRedirect) {
    return <Redirect to={`/sets/${cardSetIdForRedirect}`} />;
  }

  return (
    <>
      <GroupContainer>
        <h3>
          {`${name || ''} Card Sets`}
        </h3>
        <StyledButton
          onClick={() => {
            if (!newSetName) {
              setNewSetName('');
            }
          }}
        >
          Add a New Set
        </StyledButton>
        {(newSetName || newSetName === '')
        && (
          <NewGroupContainer>
            <StyledTextField
              label="Name Your New Set"
              variant="outlined"
              value={newSetName}
              onChange={handleChange}
            />
            <StyledButton
              newgroup
              disabled={!newSetName}
              onClick={createNewSet}
            >
              Create
            </StyledButton>
          </NewGroupContainer>
        )}
        {(
          cardSets && cardSets.length
            ? getCardSetTable(cardSets, setCardSetIdForRedirect)
            : `${name} currently contains no card sets.`
        )}
      </GroupContainer>
    </>
  );
}

export default CardGroup;
