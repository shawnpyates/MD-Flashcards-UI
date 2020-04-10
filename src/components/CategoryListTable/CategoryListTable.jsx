import React, { useCallback, useEffect } from 'react';
import {
  TableBody,
  TableHead,
} from '@material-ui/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

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
const SCROLL_OFFSET = 20;

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
      innerHeight + documentElement.scrollTop < documentElement.scrollHeight - SCROLL_OFFSET
      || !nextPaginationId
    ) {
      return;
    }
    fetchMore();
  }, [fetchMore, nextPaginationId]);

  useEffect(() => {
    addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getItemTable = () => (
    <>
      <TableHead>
        {contentConfig.map(({ header }) => <HeadTableCell key={header}>{header}</HeadTableCell>)}
      </TableHead>
      <TableBody>
        {items.map((row, i) => (
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
        {initActionButtonText
        && (
          <ListButton
            onClick={() => {
              if (!currentInput) {
                updateInput('');
              }
            }}
          >
            {initActionButtonText}
          </ListButton>
        )}
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
        <StyledTable isloading={String(isLoading || '')}>
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

CategoryListTable.defaultProps = {
  nextPaginationId: null,
  currentInput: null,
};

CategoryListTable.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  contentConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCreating: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func.isRequired,
  nextPaginationId: PropTypes.string,
  currentInput: PropTypes.string,
  updateInput: PropTypes.func.isRequired,
  submitInput: PropTypes.func.isRequired,
  initActionButtonText: PropTypes.func.isRequired,
  submitInputButtonText: PropTypes.func.isRequired,
  inputLabel: PropTypes.string.isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
};

export default CategoryListTable;
