import React, { useCallback, useEffect, useRef } from 'react';
import { CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

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

const { addEventListener, removeEventListener } = window;

const keyCodes = {
  SPACE: 32,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  R: 82,
};

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
  const isFirstCard = localState.cardIndex === 0;
  const isLastCard = localState.cardIndex === allCards.length - 1;

  const flipButtonEl = useRef(null);

  const handleFlipButtonClick = () => {
    // if left focussed after click, flipCard will be called twice on spacebar keydown
    flipButtonEl.current.blur();
    flipCard();
  };

  const handleKeydown = useCallback(({ keyCode }) => {
    switch (keyCode) {
      case keyCodes.SPACE:
        flipCard();
        break;
      case keyCodes.ARROW_LEFT:
        if (!isFirstCard) {
          handleShift('left');
        }
        break;
      case keyCodes.ARROW_RIGHT:
        if (!isLastCard) {
          handleShift('right');
        }
        break;
      case keyCodes.R:
        repeatCardAtEnd();
        break;
      default:
        break;
    }
    return null;
  }, [isFirstCard, isLastCard, flipCard, handleShift, repeatCardAtEnd]);

  useEffect(() => {
    addEventListener('keydown', handleKeydown);
    return () => removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  return (
    <StudyCard>
      <CardContent>
        <h4>
          {`${originalSet.name}: Question ${localState.cardIndex + 1}/${allCards.length}`}
        </h4>
        <div>
          <ChevContainer>
            {!isFirstCard
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
            {!isLastCard
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
          <FlipButton
            ref={flipButtonEl}
            onClick={handleFlipButtonClick}
            size="small"
            side="left"
          >
            Flip [space]
          </FlipButton>
        </StyledActionsContainer>
        <StyledActionsContainer>
          <ActionButton size="small" side="left" onClick={repeatCardAtEnd}>
            Repeat This Card Later [r]
          </ActionButton>
          <ActionButton size="small" side="right" onClick={goBackToList}>
            Go Back To Card List
          </ActionButton>
        </StyledActionsContainer>
      </CardContent>
    </StudyCard>
  );
}

Flashcard.propTypes = {
  originalSet: PropTypes.objectOf(PropTypes.any).isRequired,
  localState: PropTypes.objectOf(PropTypes.any).isRequired,
  allCards: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleShift: PropTypes.func.isRequired,
  currentCard: PropTypes.objectOf(PropTypes.any).isRequired,
  flipCard: PropTypes.func.isRequired,
  repeatCardAtEnd: PropTypes.func.isRequired,
  goBackToList: PropTypes.func.isRequired,
};

export default Flashcard;
