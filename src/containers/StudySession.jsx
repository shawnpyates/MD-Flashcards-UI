import React, { useEffect, useContext, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import {
  actionTypes,
  cardSetModes,
  displayFirstOptions as cardSides,
} from '../reducers/cardSetReducer';
import { CardSetContext } from '../context/cardSetContext';
import CodeBlock from '../components/CodeBlock';

const StudyCard = styled(Card)`
  width: 60%;
  min-height: 150px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 25px;
  text-align: center;
`;

const QuestionContentContainer = styled.div`
  margin: auto 30px;
  display: inline-table;
  width: 70%;
  min-height: 40px;
  border: 1px solid #F0F0F0;
  vertical-align: top;
  padding: 5px;
  background-color: ${(props) => (props.isShaded ? '#F0F0F0' : '#FFF')};
`;

const StyledActionsContainer = styled(CardActions)`
  display: block;
  height: 30px;
`;

const ActionButton = styled(Button)`
  position: absolute;
  background-color: #F0F0F0;
  color: #000;
  margin-top: 25px;
  ${(props) => props.side}: 50px;
`;

const FlipButton = styled(Button)`
  background-color: #060;
  color: #FFF;
  margin-top: 15px;

  &:hover {
    background-color: #070;
  }
`;

const QuestionContent = styled(Typography)`
  vertical-align: middle;
  display: table-cell;
`;

const CHEV_SIZE = '60px';

const ChevContainer = styled.div`
  width: ${CHEV_SIZE};
  display: inline-block;
  vertical-align: top;
`;

const CHEV_STYLES_MIXIN = `
  font-size: ${CHEV_SIZE};
  cursor: pointer;
  color: #060;
`;

const StyledLeftChev = styled(ChevronLeft)`
  ${CHEV_STYLES_MIXIN}
`;

const StyledRightChev = styled(ChevronRight)`
  ${CHEV_STYLES_MIXIN}
`;

function StudySession() {
  const {
    currentCards: allCards,
    originalSet,
    displayFirst,
    dispatch,
  } = useContext(CardSetContext);

  const [localState, setLocalState] = useState({
    cardIndex: null,
    currentSide: null,
  });

  const currentCard = allCards[localState.cardIndex];

  useEffect(() => {
    setLocalState({ cardIndex: 0, currentSide: displayFirst });

    return () => {
      dispatch({ type: actionTypes.UPDATE_CARDS, payload: originalSet.cards });
    };
  }, [displayFirst]);

  const flipCard = () => {
    setLocalState({
      ...localState,
      currentSide: Object.values(cardSides).find((side) => side !== localState.currentSide),
    });
  };
  const handleChevClick = (direction) => {
    setLocalState({
      currentSide: displayFirst,
      cardIndex: localState.cardIndex + (direction === 'right' ? 1 : -1),
    });
  };
  const repeatCardAtEnd = () => {
    dispatch({ type: actionTypes.UPDATE_CARDS, payload: [...allCards, currentCard] });
  };

  return (
    <StudyCard>
      <CardContent>
        <h4>
          {`${originalSet.name}: Question ${localState.cardIndex + 1}/${allCards.length}`}
        </h4>
        <div>
          <ChevContainer>
            {localState.cardIndex !== 0
            && (
              <StyledLeftChev
                onClick={() => {
                  handleChevClick('left');
                }}
              />
            )}
          </ChevContainer>
          <QuestionContentContainer isShaded={localState.currentSide === 'answer'}>
            <QuestionContent variant="body2" component="p">
              <ReactMarkdown
                source={currentCard && currentCard[localState.currentSide]}
                renderers={{ code: CodeBlock }}
              />
            </QuestionContent>
          </QuestionContentContainer>
          <ChevContainer>
            {localState.cardIndex !== allCards.length - 1
            && (
              <StyledRightChev
                onClick={() => {
                  handleChevClick('right');
                }}
              />
            )}
          </ChevContainer>
        </div>
        <StyledActionsContainer>
          <FlipButton onClick={flipCard} size="small" side="left">Flip</FlipButton>
        </StyledActionsContainer>
        <StyledActionsContainer>
          <ActionButton size="small" side="left" onClick={repeatCardAtEnd}>
            Repeat This Card Later
          </ActionButton>
          <ActionButton
            size="small"
            side="right"
            onClick={() => {
              dispatch({ type: actionTypes.UPDATE_MODE, payload: cardSetModes.VIEW });
            }}
          >
            Go Back To Card List
          </ActionButton>
        </StyledActionsContainer>
      </CardContent>
    </StudyCard>
  );
}

export default StudySession;
