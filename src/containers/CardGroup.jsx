import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import styled from 'styled-components';
import dayjs from 'dayjs';


// import { UserContext } from '../context/userContext';

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

const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

const getCardSetTable = (sets, setId) => (
  <Table>
    <TableHead>
      <HeadTableCell>Name</HeadTableCell>
      <HeadTableCell>Created</HeadTableCell>
      <HeadTableCell>Updated</HeadTableCell>
    </TableHead>
    <TableBody>
      {sets.map(({
        id, name, inserted_at: insertedAt, updated_at: updatedAt,
      }) => (
        <StyledRow key={id} onClick={() => setId(id)}>
          <TableCell>{name}</TableCell>
          <TableCell>{formatDate(insertedAt)}</TableCell>
          <TableCell>{formatDate(updatedAt)}</TableCell>
        </StyledRow>
      ))}
    </TableBody>
  </Table>
);

function CardGroup() {
  const { id: groupId } = useParams();
  const [{ name, card_sets: cardSets }, setCurrentGroup] = useState({});
  const [clickedRowId, setClickedRowId] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:4000/api/card_groups/${groupId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then(({ data }) => {
        setCurrentGroup(data);
      });
  }, [groupId]);
  if (clickedRowId) {
    return <Redirect to={`/sets/${clickedRowId}`} />;
  }
  return (
    <>
      <GroupContainer>
        <h4>
          Card Group:
          {name || 'None'}
        </h4>
        {(
          cardSets && cardSets.length
            ? getCardSetTable(cardSets, setClickedRowId)
            : `${name} currently contains no card sets.`
        )}
      </GroupContainer>
    </>
  );
}

export default CardGroup;
