import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

const WelcomeContainer = styled(Container)`
  height: 300px;
  width: 300px;
  position: absolute;
  top: 100px;
  left: 300px;
  background-color: #F0F0F0;
`;

function Welcome() {
  return (
    <WelcomeContainer>
      Welcome to MD Flashcards!
    </WelcomeContainer>
  );
}

export default Welcome;
