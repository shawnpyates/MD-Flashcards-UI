import React, { Fragment, useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
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
  StyledHelpIcon,
  HeadTableCell,
  ContentTableCell,
  EmptyDataIndicator,
  CsvUploadContainer,
  CsvUploadInput,
} from './styledComponents';

import {
  CREATE_NEW_CARD,
  EDIT_CARD,
  DELETE_CARD,
} from '../../api/apiReqTypes.json';

import { tooltips } from '../../content.json';

const GreenCheckbox = withStyles({
  root: {
    color: green[800],
    '&$checked': {
      color: green[800],
    },
  },
  checked: {},
  // eslint-disable-next-line react/jsx-props-no-spreading
})((props) => <Checkbox color="default" {...props} />);

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
  stagedFileForUpload,
  setStagedFileForUpload,
  importCsv,
  isLoading,
}) {
  const [shouldDisplayCsvOptions, setShouldDisplayCsvOptions] = useState(false);
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
        <tr>
          <HeadTableCell>Question</HeadTableCell>
          <HeadTableCell>Answer</HeadTableCell>
        </tr>
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
            <Fragment key={id || key}>
              <TableRow>
                <ContentTableCell columnlength={2} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="question"
                    value={question || ''}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <ContentTableCell columnlength={2} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="answer"
                    value={answer || ''}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <SideContent>
                  <ListButton
                    createnewitem="true"
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
                  <ContentTableCell columnlength={2} fornewrowbutton="true">
                    <ListButton addnewrow="true" onClick={addNewRow}>+ New Row</ListButton>
                  </ContentTableCell>
                  <ContentTableCell columnlength={2} />
                </TableRow>
              )}
            </Fragment>
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

  const getUploadButton = () => (
    <CsvUploadContainer>
      <CsvUploadInput
        accept="text/csv"
        id="csv-upload"
        type="file"
        onChange={(ev) => {
          setStagedFileForUpload(ev.target.files[0]);
        }}
      />
      <ListButton onClick={importCsv} ishidden={!stagedFileForUpload}>
        Upload CSV
      </ListButton>
    </CsvUploadContainer>
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
      {currentMode === cardSetModes.ADD
      && (
        <CsvUploadContainer>
          <FormControlLabel
            control={(
              <GreenCheckbox
                checked={shouldDisplayCsvOptions}
                onChange={() => {
                  setShouldDisplayCsvOptions((prev) => !prev);
                }}
              />
            )}
            label="I want to upload cards from a CSV."
          />
          <Tooltip title={tooltips.csvUpload}>
            <StyledHelpIcon />
          </Tooltip>
          {shouldDisplayCsvOptions && getUploadButton()}
        </CsvUploadContainer>
      )}
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
  stagedFileForUpload: null,
};

CardListTable.propTypes = {
  cardSetModes: PropTypes.objectOf(PropTypes.string).isRequired,
  currentMode: PropTypes.string.isRequired,
  isSetFromCurrentUser: PropTypes.bool,
  temporaryRows: PropTypes.arrayOf(PropTypes.object),
  currentCards: PropTypes.arrayOf(PropTypes.any),
  handleTextareaChange: PropTypes.func.isRequired,
  addNewRow: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  originalSet: PropTypes.objectOf(PropTypes.any),
  actionTypes: PropTypes.objectOf(PropTypes.string).isRequired,
  setCardUnderOperation: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  stagedFileForUpload: PropTypes.objectOf(PropTypes.any),
  setStagedFileForUpload: PropTypes.func.isRequired,
  importCsv: PropTypes.func.isRequired,
};

export default CardListTable;
