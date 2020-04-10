import React from 'react';
import {
  TableBody,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import CodeBlock from '../CodeBlock';

import {
  ListContainer,
  ListTable,
  ListButton,
  SideContent,
  StyledTextarea,
  StyledDeleteIcon,
  HeadTableCell,
  ContentTableCell,
  EmptyDataIndicator,
} from './styledComponents';

import {
  CREATE_NEW_CARD,
  EDIT_CARD,
  DELETE_CARD,
} from '../../api/apiReqTypes.json';

function CardListTable({
  cardSetModes,
  currentMode,
  isSetFromCurrentUser,
  temporaryRows,
  currentCards,
  handleTextareaChange,
  addNewRow,
  dispatch,
  originalSet,
  actionTypes,
  setCardUnderOperation,
  isLoading,
}) {
  const renderCurrentCards = (cards) => (
    cards.map(({ id, question, answer }) => (
      <TableRow key={id}>
        {[cardSetModes.VIEW, cardSetModes.ADD].includes(currentMode)
        && (
          <>
            <ContentTableCell columnlength={2}>
              <ReactMarkdown source={question} renderers={{ code: CodeBlock }} />
            </ContentTableCell>
            <ContentTableCell columnlength={2}>
              <ReactMarkdown source={answer} renderers={{ code: CodeBlock }} />
            </ContentTableCell>
            <SideContent>
              {isSetFromCurrentUser
              && (
                <StyledDeleteIcon
                  onClick={() => {
                    setCardUnderOperation({ type: DELETE_CARD, id, submit: true });
                  }}
                />
              )}
            </SideContent>
          </>
        )}
      </TableRow>
    ))
  );

  const getCardListTable = () => (
    <ListTable isloading={String(isLoading || '')}>
      <TableHead>
        <HeadTableCell>Question</HeadTableCell>
        <HeadTableCell>Answer</HeadTableCell>
      </TableHead>
      <TableBody>
        {([cardSetModes.ADD, cardSetModes.EDIT].includes(currentMode) && temporaryRows)
        && temporaryRows.map(({
          question, answer, shortid: key, id,
        }, i) => {
          const isLast = i === temporaryRows.length - 1;
          const { type, buttonText, shouldDisplayNewRowButton } = (
            currentMode === cardSetModes.ADD
              ? {
                type: CREATE_NEW_CARD,
                buttonText: 'Add',
                shouldDisplayNewRowButton: isLast,
              } : {
                type: EDIT_CARD,
                buttonText: 'Edit',
              }
          );
          const correspondingCard = id && currentCards.find((card) => card.id === id);
          const isUnchanged = (
            correspondingCard
            && (correspondingCard.question === question && correspondingCard.answer === answer)
          );

          return (
            <>
              <TableRow key={id || key}>
                <ContentTableCell columnlength={2} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="question"
                    value={question}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <ContentTableCell columnlength={2} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="answer"
                    value={answer}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <SideContent>
                  <ListButton
                    createnewitem
                    disabled={!question || !answer || isUnchanged}
                    onClick={() => {
                      setCardUnderOperation({
                        type, question, answer, index: i, id, submit: true,
                      });
                    }}
                  >
                    {buttonText}
                  </ListButton>
                </SideContent>
              </TableRow>
              {shouldDisplayNewRowButton
              && (
                <TableRow key="addnew">
                  <ContentTableCell columnlength={2} fornewrowbutton>
                    <ListButton addnewrow onClick={addNewRow}>+ New Row</ListButton>
                  </ContentTableCell>
                  <ContentTableCell columnlength={2} />
                </TableRow>
              )}
            </>
          );
        })}
        {currentCards && renderCurrentCards(currentCards)}
      </TableBody>
    </ListTable>
  );

  const getButton = (mode, text) => (
    mode !== currentMode
    && (
      <ListButton
        onClick={() => {
          dispatch({ type: actionTypes.UPDATE_MODE, payload: mode });
        }}
      >
        {text}
      </ListButton>
    )
  );

  return (
    <ListContainer>
      <h3>
        {(originalSet && originalSet.name) || ''}
      </h3>
      <div>
        {((currentCards && currentCards.length)
        && (
          <>
            {getButton(cardSetModes.CONFIG, 'Start Studying')}
            {isSetFromCurrentUser
            && (
              <>
                {getButton(cardSetModes.ADD, 'Add More Cards')}
                {getButton(cardSetModes.VIEW, 'View Cards')}
                {getButton(cardSetModes.EDIT, 'Edit Cards')}
              </>
            )}
          </>
        )) || ''}
      </div>
      {getCardListTable()}
      {(currentCards && !currentCards.length
      && (
        <EmptyDataIndicator>
          {`${originalSet.name} currently contains no cards. Create some cards above to get started!`}
        </EmptyDataIndicator>
      )) || ''}
    </ListContainer>
  );
}

CardListTable.defaultProps = {
  isSetFromCurrentUser: false,
  temporaryRows: null,
  currentCards: null,
  originalSet: null,
};

CardListTable.propTypes = {
  cardSetModes: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentMode: PropTypes.string.isRequired,
  isSetFromCurrentUser: PropTypes.bool,
  temporaryRows: PropTypes.arrayOf(PropTypes.string),
  currentCards: PropTypes.arrayOf(PropTypes.any),
  handleTextareaChange: PropTypes.func.isRequired,
  addNewRow: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  originalSet: PropTypes.objectOf(PropTypes.any),
  actionTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCardUnderOperation: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CardListTable;
