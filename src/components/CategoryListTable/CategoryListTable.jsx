/* eslint react/prop-types: 0 */
import React, { useCallback, useEffect } from 'react';
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

const { documentElement } = document;
const { addEventListener, innerHeight, removeEventListener } = window;

const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

function CategoryListTable({
  title,
  type,
  items,
  contentConfig,
  isCreating,
  isLoading,
  fetchMore,
  nextPaginationId,
  currentInput,
  updateInput,
  submitInput,
  initActionButtonText,
  submitInputButtonText,
  inputLabel,
  emptyDataMessage,
}) {
  const handleChange = ({ target: { value } }) => {
    updateInput(value);
  };

  const handleScroll = useCallback(() => {
    if (
      innerHeight + documentElement.scrollTop !== documentElement.scrollHeight
      || !nextPaginationId
    ) {
      return;
    }
    fetchMore();
  }, [fetchMore, nextPaginationId]);

  useEffect(() => {
    addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => () => removeEventListener('scroll', handleScroll), [handleScroll]);

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
        <ListButton
          onClick={() => {
            if (!currentInput) {
              updateInput('');
            }
          }}
        >
          {initActionButtonText}
        </ListButton>
        {(currentInput || currentInput === '')
        && (
          <div>
            {isCreating && <LoadingIndicator>Creating...</LoadingIndicator>}
            <NewItemContainer isCreating={isCreating}>
              <StyledTextField
                label={inputLabel}
                variant="outlined"
                value={currentInput}
                onChange={handleChange}
              />
              <ListButton
                newitem
                disabled={!currentInput}
                onClick={submitInput}
              >
                {submitInputButtonText}
              </ListButton>
            </NewItemContainer>
          </div>
        )}
        {(isLoading) && <LoadingIndicator margintop>Loading...</LoadingIndicator>}
        <StyledTable isLoading={isLoading}>
          {(
            items && items.length
              ? getItemTable()
              : <EmptyDataIndicator>{emptyDataMessage}</EmptyDataIndicator>
          )}
        </StyledTable>
      </ListContainer>
    </>
  );
}

export default CategoryListTable;
