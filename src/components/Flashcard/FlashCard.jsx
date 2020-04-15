import React, { useCallback, useEffect, useRef } from 'react';
import { CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

import CodeBlock from '../CodeBlock';

import {
  StudyCard,
  QuestionContentContainer,
  StyledActionsContainer,
  ActionButton,
  FlipButton,
  StyledMarkdown,
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

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

function Flashcard({
  originalSet,
  localState: {
    cardIndex,
    currentSide,
    shouldShowRepeatOption,
  },
  allCards,
  handleShift,
  currentCard,
  flipCard,
  repeatCardAtEnd,
  goBackToList,
}) {
  const isFirstCard = cardIndex === 0;
  const isLastCard = cardIndex === allCards.length - 1;

  const flipButtonEl = useRef(null);

  const handleFlipButtonClick = () => {
    // if kept focussed after click, flipCard will be called twice on spacebar keydown
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
        if (shouldShowRepeatOption) {
          repeatCardAtEnd();
        }
        break;
      default:
        break;
    }
    return null;
  }, [isFirstCard, isLastCard, flipCard, handleShift, repeatCardAtEnd, shouldShowRepeatOption]);

  useEffect(() => {
    addEventListener('keydown', handleKeydown);
    return () => removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  return (
    <StudyCard>
      <CardContent>
        <h4>
          {`${originalSet.name}: ${currentSide && capitalize(currentSide)} ${cardIndex + 1}/${allCards.length}`}
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
          <QuestionContentContainer isShaded={currentSide === 'answer'}>
            <StyledMarkdown
              source={currentCard && currentCard[currentSide]}
              renderers={{ code: CodeBlock }}
            />
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
          <ActionButton
            size="small"
            side="left"
            disabled={!shouldShowRepeatOption}
            onClick={repeatCardAtEnd}
          >
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

Flashcard.defaultProps = {
  currentCard: null,
};

Flashcard.propTypes = {
  originalSet: PropTypes.objectOf(PropTypes.any).isRequired,
  localState: PropTypes.objectOf(PropTypes.any).isRequired,
  allCards: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleShift: PropTypes.func.isRequired,
  currentCard: PropTypes.objectOf(PropTypes.any),
  flipCard: PropTypes.func.isRequired,
  repeatCardAtEnd: PropTypes.func.isRequired,
  goBackToList: PropTypes.func.isRequired,
};

export default Flashcard;
