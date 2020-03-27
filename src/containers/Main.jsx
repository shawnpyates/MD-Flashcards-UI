import React, { useContext, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
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
`

const StyledRow = styled(TableRow)`
  cursor: pointer;
`;

const formatDate = date => dayjs(date).format('YYYY/MM/DD');

// const handleRowClick = (id) => <Redirect to={`/groups/${id}`} />

const getCardGroupTable = (groups, setId) => (
  <Table>
    <TableHead>
      <HeadTableCell>Name</HeadTableCell>
      <HeadTableCell>Created</HeadTableCell>
      <HeadTableCell>Updated</HeadTableCell>
    </TableHead>
    <TableBody>
      {groups.map(({ id, name, inserted_at, updated_at }) => (
        <StyledRow key={id} onClick={() => setId(id)}>
          <TableCell>{name}</TableCell>
          <TableCell>{formatDate(inserted_at)}</TableCell>
          <TableCell>{formatDate(updated_at)}</TableCell>
        </StyledRow>
      ))}
    </TableBody>
  </Table>
)

function Main() {
  const [clickedRowId, setClickedRowId] = useState(null);
  const { currentUser: { card_groups: cardGroups, name } } = useContext(UserContext);
  if (clickedRowId) {
    return <Redirect to={`/groups/${clickedRowId}`} />;
  }
  return (
    <>
      <MainContainer>
        <h4>{name}'s Card Groups</h4>
        {(
          cardGroups.length
            ? getCardGroupTable(cardGroups, setClickedRowId)
            : "You currently have no card groups."
        )}
      </MainContainer>
    </>
  )
}

export default Main;
