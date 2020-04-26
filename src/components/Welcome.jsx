import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

import { TABLE_POSITION_MIXIN } from '../styles/mixins';

const WelcomeContainer = styled(Container)`
  width: 70%;
  text-align: center;
  border: 1px solid #F0F0F0;
  padding: 30px;
  color: #060;
  background-color: #FBFBFB;

  ${TABLE_POSITION_MIXIN}
`;

const StyledImage = styled.img`
  height: 50%;
  width: 50%;
  border 2px solid #F0F0F0;
  margin: 10px auto;
`;

function Welcome() {
  return (
    <WelcomeContainer>
      <h1>Welcome to MD Flashcards!</h1>
      <h3>Make web-based flashcards that support markdown and code snippets.</h3>
      <h3>Log in to get started or checkout our public Flashcard Library.</h3>
      <StyledImage
        src="https://res.cloudinary.com/dcupoxygs/image/upload/v1586553269/md-flashcards/sampleCardQuestion.png"
        alt="sample card question"
      />
      <StyledImage
        src="https://res.cloudinary.com/dcupoxygs/image/upload/v1586553274/md-flashcards/sampleCardAnswer.png"
        alt="sample card answer"
      />
    </WelcomeContainer>
  );
}

export default Welcome;
