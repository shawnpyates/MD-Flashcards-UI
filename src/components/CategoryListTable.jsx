/* eslint react/prop-types: 0 */
import React from 'react';
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
    props.newitem
      ? 'transform: translateY(25%);'
      : 'display: block;'
  )}

  &:disabled{ 
    background-color: #F0F0F0;
  }
`;

const NewItemContainer = styled.div`
  margin: 30px auto 5px;
`;

const StyledTextField = styled(TextField)`
  margin-right: 25px;
`;

const ContentTableCell = styled(TableCell)`
  width: calc(100% / ${(props) => props.columnlength})
`;

const EmptyDataIndicator = styled.div`
  margin: 35px auto;
  text-align: center;
`;

const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

function CategoryListTable({
  title,
  type,
  items,
  dataConfig,
  createNewItem,
  handleRowClick,
  newItemName,
  setNewItemName,
  handleChange,
  shouldRenderAddOption,
}) {
  const getItemTable = () => (
    <Table>
      <TableHead>
        {dataConfig.map(({ header }) => <HeadTableCell key={header}>{header}</HeadTableCell>)}
      </TableHead>
      <TableBody>
        {items.map((row) => (
          <StyledRow key={row.id} onClick={() => handleRowClick(row.id)}>
            {dataConfig.map(({ key, isTimestamp }) => (
              <ContentTableCell key={key} columnlength={dataConfig.length}>
                {isTimestamp ? formatDate(row[key]) : row[key]}
              </ContentTableCell>
            ))}
          </StyledRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <MainContainer>
        <h3>
          {title}
        </h3>
        {shouldRenderAddOption
        && (
          <StyledButton
            onClick={() => {
              if (!newItemName) {
                setNewItemName('');
              }
            }}
          >
            {`Add a New ${capitalize(type)}`}
          </StyledButton>
        )}
        {(newItemName || newItemName === '')
        && (
          <NewItemContainer>
            <StyledTextField
              label={`Name Your New ${capitalize(type)}`}
              variant="outlined"
              value={newItemName}
              onChange={handleChange}
            />
            <StyledButton
              newitem
              disabled={!newItemName}
              onClick={createNewItem}
            >
              Create
            </StyledButton>
          </NewItemContainer>
        )}
        {(
          items.length
            ? getItemTable()
            : (
              <EmptyDataIndicator>
                {`You currently have no card ${type}s. Create a ${type} above to get started!`}
              </EmptyDataIndicator>
            )
        )}
      </MainContainer>
    </>
  );
}

export default CategoryListTable;
