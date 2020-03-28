import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import styled from 'styled-components';

import StudyConfig from './StudyConfig';
import StudySession from './StudySession';

import { CardSetProvider } from '../context/cardSetContext';

const cardSetModes = {
  VIEW: 'view',
  ADD: 'add',
  EDIT: 'edit',
  CONFIG: 'config', 
  STUDY: 'study',
};

const displayFirstOptions = {
  QUESTION: 'question',
  ANSWER: 'answer',
};

const SetContainer = styled(TableContainer)`
  width: 70%;
  position: absolute;
  top: 100px;
  left: 250px;
`;

const StyledButton = styled(Button)`
  background-color: #060;
  color: #FFF;
  margin-right: 25px;

  &:hover {
    background-color: #070;
  }
`;

const HeadTableCell = styled(TableCell)`
  font-weight: 700;
  text-transform: uppercase;
`

const getCardSetTable = (sets) => (
  <Table>
    <TableHead>
      <HeadTableCell>Question</HeadTableCell>
      <HeadTableCell>Answer</HeadTableCell>
    </TableHead>
    <TableBody>
      {sets.map(({ id, question, answer }) => (
        <TableRow key={id}>
          <TableCell>{question}</TableCell>
          <TableCell>{answer}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)


function CardSet() {
  const { id: setId } = useParams();
  // TODO: decide whether or not to split name from cards for state management
  const [{ name, cards }, setCurrentSet] = useState({});
  const [mode, setMode] = useState(cardSetModes.VIEW);
  const [displayFirst, setDisplayFirst] = useState(displayFirstOptions.QUESTION);
  useEffect(() => {
    fetch(`http://localhost:4000/api/card_sets/${setId}`, { credentials: 'include' })
    .then(res => res.json())
    .then(({ data }) => {
      console.log('SET: ', data);
      setCurrentSet(data);
    })
  }, [setId]);
  const getButton = (mode, text) => (
    <StyledButton onClick={() => setMode(cardSetModes[mode])}>{text}</StyledButton>
  );  
  return (
    <CardSetProvider
      currentMode={mode}
      setCurrentMode={setMode}
      currentSetName={name}
      cards={cards}
      // setCards={setCards}
      displayFirst={displayFirst}
      setDisplayFirst={setDisplayFirst}
    >
      {mode === cardSetModes.CONFIG && <StudyConfig />}
      {mode === cardSetModes.STUDY && <StudySession />}
      {![cardSetModes.CONFIG, cardSetModes.STUDY].includes(mode)
      && (
        <SetContainer>
          <h4>Card Set: {name ? name : 'None'}</h4>
          <div>
            {getButton('CONFIG', 'Start Studying')}
            {getButton('ADD', 'Add More Cards')}
            {getButton('EDIT', 'Edit Cards')}
          </div>
          {(
            cards && cards.length
              ? getCardSetTable(cards)
              : `${name} currently contains no cards.`
          )}
        </SetContainer>
      )}
    </CardSetProvider>
  )
}

export default CardSet;
