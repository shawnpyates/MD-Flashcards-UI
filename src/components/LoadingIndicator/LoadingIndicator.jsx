import React from 'react';

import {
  LoadingContainer,
  LoadingTextContainer,
  LoadingSpinner,
  LoadingText,
} from './styledComponents';

function LoadingIndicator() {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingTextContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingTextContainer>
    </LoadingContainer>
  );
}


export default LoadingIndicator;
