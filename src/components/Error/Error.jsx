import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
`;

function Error() {
  return (
    <StyledContainer>
      <span role="img" aria-label="Crying Emoji">😭</span>
      Oh no! Something went wrong. Try refreshing the page to see if that helps.
      <span role="img" aria-label="Crossed Fingers Emoji">🤞</span>
    </StyledContainer>
  );
}


export default Error;
