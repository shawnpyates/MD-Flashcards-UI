import React from 'react';
import {
  TableBody,
  TableHead,
} from '@material-ui/core';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

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
} from './styledComponents';

const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');
const ENTER_KEY = 13;

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
  const history = useHistory();

  const handleChange = ({ target: { value } }) => {
    updateInput(value);
  };

  const handleKeyUp = ({ keyCode }) => {
    if (keyCode === ENTER_KEY && !!currentInput) {
      submitInput();
    }
  };

  const getItemTable = () => (
    <>
      <TableHead>
        <tr>
          {contentConfig.map(({ header }) => <HeadTableCell key={header}>{header}</HeadTableCell>)}
        </tr>
      </TableHead>
      <TableBody>
        {items.map((row) => (
          <ListRow
            key={row.id}
            onClick={() => {
              history.push(`/${type}s/${row.id}`);
            }}
          >
            {contentConfig.map(({ key, isTimestamp }) => (
              <ContentTableCell key={key} columnlength={contentConfig.length}>
                {isTimestamp ? formatDate(row[key]) : row[key]}
              </ContentTableCell>
            ))}
          </ListRow>
        ))}
      </TableBody>
    </>
  );

  const contentToRender = (
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
                onKeyUp={handleKeyUp}
              />
              <ListButton
                newitem="true"
                disabled={!currentInput}
                onClick={submitInput}
              >
                {submitInputButtonText}
              </ListButton>
            </NewItemContainer>
          </div>
        )}
        {(isLoading) && <LoadingIndicator margintop>Loading...</LoadingIndicator>}
        {items
        && (items.length
          ? (
            <StyledTable isloading={String(isLoading || '')}>
              {getItemTable()}
            </StyledTable>
          ) : (
            <EmptyDataIndicator>{emptyDataMessage}</EmptyDataIndicator>
          )
        )}
      </ListContainer>
    </>
  );

  return (
    nextPaginationId && (items && items.length)
      ? (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMore}
          hasMore
        >
          {contentToRender}
        </InfiniteScroll>
      ) : (
        contentToRender
      )
  );
}

CategoryListTable.defaultProps = {
  nextPaginationId: null,
  currentInput: null,
  fetchMore: null,
  initActionButtonText: null,
  isCreating: false,
  items: null,
};

CategoryListTable.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  contentConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCreating: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  fetchMore: PropTypes.func,
  nextPaginationId: PropTypes.string,
  currentInput: PropTypes.string,
  updateInput: PropTypes.func.isRequired,
  submitInput: PropTypes.func.isRequired,
  initActionButtonText: PropTypes.string,
  submitInputButtonText: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
};

export default CategoryListTable;
