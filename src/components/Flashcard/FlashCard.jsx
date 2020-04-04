/* eslint react/prop-types: 0 */
import React from 'react';
import { CardContent } from '@material-ui/core';

import ReactMarkdown from 'react-markdown';

import CodeBlock from '../CodeBlock';

import {
  StudyCard,
  QuestionContentContainer,
  StyledActionsContainer,
  ActionButton,
  FlipButton,
  QuestionContent,
  ChevContainer,
  StyledLeftChev,
  StyledRightChev,
} from './styledComponents';

function Flashcard({
  originalSet,
  localState,
  allCards,
  handleShift,
  currentCard,
  flipCard,
  repeatCardAtEnd,
  goBackToList,
}) {
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
                  handleShift('left');
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
                  handleShift('right');
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
          <ActionButton size="small" side="right" onClick={goBackToList}>
            Go Back To Card List
          </ActionButton>
        </StyledActionsContainer>
      </CardContent>
    </StudyCard>
  );
}

export default Flashcard;
