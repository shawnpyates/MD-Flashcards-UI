import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

import { TABLE_POSITION_MIXIN } from '../styles/mixins';
import { BRAND_PRIMARY, LIGHT_GRAY, MEDIUM_GRAY } from '../styles/constants';
import { welcome as content } from '../content.json';

const {
  title,
  description,
  sampleCardQuestionImageUrl,
  sampleCardAnswerImageUrl,
} = content;

const WelcomeContainer = styled(Container)`
  width: 70%;
  text-align: center;
  border: 1px solid ${MEDIUM_GRAY};
  padding: 30px;
  color: ${BRAND_PRIMARY};
  background-color: ${LIGHT_GRAY};

  ${TABLE_POSITION_MIXIN}
`;

const StyledImage = styled.img`
  height: 50%;
  width: 50%;
  border 2px solid ${MEDIUM_GRAY};
  margin: 10px auto;
`;

function Welcome() {
  return (
    <WelcomeContainer>
      <h1>{title}</h1>
      {description.map((line) => <h3 key={line}>{line}</h3>)}
      <StyledImage
        src={sampleCardQuestionImageUrl}
        alt="sample card question"
      />
      <StyledImage
        src={sampleCardAnswerImageUrl}
        alt="sample card answer"
      />
    </WelcomeContainer>
  );
}

export default Welcome;
