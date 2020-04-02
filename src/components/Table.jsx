/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import {
  Button,
  Table as TableUi,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

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

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;


function Table({
  title, type, items, headers, itemKeysToDisplay, createNewItem,
}) {
  const [itemIdForRedirect, setItemIdForRedirect] = useState(null);
  const [newItemName, setNewItemName] = useState(null);

  const handleChange = ({ target: { value } }) => {
    setNewItemName(value);
  };


  if (itemIdForRedirect) {
    return <Redirect to={`/${type}s/${itemIdForRedirect}`} />;
  }

  const getItemTable = () => (
    <TableUi>
      <TableHead>
        {headers.map((header) => <HeadTableCell>{header}</HeadTableCell>)}
      </TableHead>
      <TableBody>
        {items.map((row) => (
          <StyledRow key={row.id} onClick={() => setItemIdForRedirect(row.id)}>
            {itemKeysToDisplay.map((key) => (
              <ContentTableCell columnlength={itemKeysToDisplay.length}>
                {row[key]}
              </ContentTableCell>
            ))}
          </StyledRow>
        ))}
      </TableBody>
    </TableUi>
  );

  return (
    <>
      <MainContainer>
        <h3>
          {title}
        </h3>
        <StyledButton
          onClick={() => {
            if (!newItemName) {
              setNewItemName('');
            }
          }}
        >
          {`Add a New ${capitalize(type)}`}
        </StyledButton>
        {(newItemName || newItemName === '')
        && (
          <NewGroupContainer>
            <StyledTextField
              label={`Name Your New ${capitalize(type)}`}
              variant="outlined"
              value={newItemName}
              onChange={handleChange}
            />
            <StyledButton
              newgroup
              disabled={!newItemName}
              onClick={createNewItem}
            >
              Create
            </StyledButton>
          </NewGroupContainer>
        )}
        {(
          items.length
            ? getItemTable(items, setItemIdForRedirect)
            : `You currently have no card ${type}s. Create a group above to get started!`
        )}
      </MainContainer>
    </>
  );
}

export default Table;
