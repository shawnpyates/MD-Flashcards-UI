/* eslint react/prop-types: 0 */
import React from 'react';
import {
  TableBody,
  TableHead,
} from '@material-ui/core';
import dayjs from 'dayjs';

import {
  StyledTable,
  ListContainer,
  ListRow,
  ListButton,
  NewItemContainer,
  StyledTextField,
  HeadTableCell,
  ContentTableCell,
  EmptyDataIndicator,
  LoadingIndicator,
  StyledRowLink,
} from './styledComponents';

const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

function CategoryListTable({
  title,
  type,
  items,
  contentConfig,
  createNewItem,
  newItemName,
  setNewItemName,
  handleChange,
  shouldRenderAddOption,
  isCreating,
  isLoading,
}) {
  const getItemTable = () => (
    <>
      <TableHead>
        {contentConfig.map(({ header }) => <HeadTableCell key={header}>{header}</HeadTableCell>)}
      </TableHead>
      <TableBody>
        {items.map((row) => (
          <ListRow key={row.id}>
            <StyledRowLink to={`/${type}s/${row.id}`}>
              {contentConfig.map(({ key, isTimestamp }) => (
                <ContentTableCell key={key} columnlength={contentConfig.length}>
                  {isTimestamp ? formatDate(row[key]) : row[key]}
                </ContentTableCell>
              ))}
            </StyledRowLink>
          </ListRow>
        ))}
      </TableBody>
    </>
  );

  return (
    <>
      <ListContainer>
        <h3>
          {title}
        </h3>
        {shouldRenderAddOption
        && (
          <ListButton
            onClick={() => {
              if (!newItemName) {
                setNewItemName('');
              }
            }}
          >
            {`Add a New ${capitalize(type)}`}
          </ListButton>
        )}
        {(newItemName || newItemName === '')
        && (
          <div>
            {isCreating && <LoadingIndicator>Creating...</LoadingIndicator>}
            <NewItemContainer isCreating={isCreating}>
              <StyledTextField
                label={`Name Your New ${capitalize(type)}`}
                variant="outlined"
                value={newItemName}
                onChange={handleChange}
              />
              <ListButton
                newitem
                disabled={!newItemName}
                onClick={createNewItem}
              >
                Create
              </ListButton>
            </NewItemContainer>
          </div>
        )}
        {(isLoading) && <LoadingIndicator margintop>Loading...</LoadingIndicator>}
        <StyledTable isLoading={isLoading}>
          {(
            items && items.length
              ? getItemTable()
              : (
                <EmptyDataIndicator>
                  {`You currently have no card ${type}s. Create a ${type} above to get started!`}
                </EmptyDataIndicator>
              )
          )}
        </StyledTable>
      </ListContainer>
    </>
  );
}

export default CategoryListTable;
