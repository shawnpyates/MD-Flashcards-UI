import styled, { keyframes } from 'styled-components';

import { CENTER_ELEMENT_MIXIN } from '../../styles/mixins';
import { BRAND_PRIMARY } from '../../styles/constants';

const rotate = keyframes`
  from {
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  padding: 10px;
  border-radius: 5px;
  height: 200px;

  ${CENTER_ELEMENT_MIXIN}
`;

export const LoadingSpinner = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: dashed 0.3rem ${BRAND_PRIMARY};
  animation-name: ${rotate};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  left: 50%;
  position: absolute;
`;

export const LoadingText = styled.p`
  color: ${BRAND_PRIMARY};
  font-size: 32px;
  font-family: serif;
  font-style: italic;
`;

export const LoadingTextContainer = styled.div`
  position: absolute;
  top: 125px;
  transform: translateX(-50%);
`;
