import React from 'react';
import styled from 'styled-components';

import { CENTER_ELEMENT_MIXIN } from '../../styles/mixins';

const StyledContainer = styled.div`
  position: absolute;
  font-size: 28px;

  ${CENTER_ELEMENT_MIXIN}
`;

function Error() {
  return (
    <StyledContainer>
      <span role="img" aria-label="Crying Emoji">😭</span>
      Oh no! Something went wrong.
      <span role="img" aria-label="Crying Emoji">😭</span>
    </StyledContainer>
  );
}


export default Error;
