import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

import { TABLE_POSITION_MIXIN } from '../styles/mixins';
import { welcome as content } from '../containers/contentConfig.json';

const {
  title,
  description,
  sampleCardQuestionImageUrl,
  sampleCardAnswerImageUrl,
} = content;

const WelcomeContainer = styled(Container)`
  width: 70%;
  text-align: center;
  border: 1px solid #F0F0F0;
  padding: 30px;
  color: #2E7D32;
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
