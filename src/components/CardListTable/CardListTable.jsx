/* eslint react/prop-types: 0 */
import React from 'react';
import {
  TableBody,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';

import CodeBlock from '../CodeBlock';

import {
  ListContainer,
  ListTable,
  ListButton,
  SideContent,
  StyledTextarea,
  SuccessIndicator,
  StyledDeleteIcon,
  HeadTableCell,
  ContentTableCell,
  EmptyDataIndicator,
} from './styledComponents';

function CardListTable({
  cardSetModes,
  currentMode,
  isSetFromCurrentUser,
  addNewCard,
  editCard,
  removeCard,
  temporaryRows,
  currentCards,
  handleTextareaChange,
  addNewRow,
  dispatch,
  originalSet,
  actionTypes,
  displayMessage,
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
                <StyledDeleteIcon onClick={() => removeCard(id)} />
              )}
            </SideContent>
          </>
        )}
      </TableRow>
    ))
  );

  const getCardListTable = () => (
    <ListTable>
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
          const { buttonClickHandler, buttonText, shouldDisplayNewRowButton } = (
            currentMode === cardSetModes.ADD
              ? {
                buttonClickHandler: addNewCard,
                buttonText: 'Add',
                shouldDisplayNewRowButton: isLast,
              } : {
                buttonClickHandler: editCard,
                buttonText: 'Edit',
                shouldDisplayNewRowButton: false,
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
                <ContentTableCell columnlength={2} islast={isLast}>
                  <StyledTextarea
                    name="question"
                    value={question}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <ContentTableCell columnlength={2} islast={isLast}>
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
                      buttonClickHandler({
                        question, answer, index: i, id,
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
    <ListButton
      onClick={() => {
        dispatch({ type: actionTypes.UPDATE_MODE, payload: mode });
      }}
    >
      {text}
    </ListButton>
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
                {getButton(cardSetModes.EDIT, 'Edit Cards')}
                <SuccessIndicator>{displayMessage || ''}</SuccessIndicator>
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

export default CardListTable;
