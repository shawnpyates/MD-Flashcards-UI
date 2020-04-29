import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

import { TABLE_POSITION_MIXIN } from '../styles/mixins';
import { about as content } from '../containers/contentConfig.json';

const {
  title,
  description,
  editorImageUrl,
  cardImageUrl,
} = content;

const AboutContainer = styled(Container)`
  width: 70%;
  text-align: center;
  border: 1px solid #F0F0F0;
  padding: 30px;
  color: #060;
  background-color: #FBFBFB;

  ${TABLE_POSITION_MIXIN}

  & p {
    color: #000;
  }
`;

const StyledImage = styled.img`
  max-height: ${(props) => (props.iswide ? '160px' : '300px')};
  border 2px solid #F0F0F0;
  margin: 10px auto;
  display: block;
`;

function About() {
  return (
    <AboutContainer>
      <h1>{title}</h1>
      {description.map((line) => <p key={line}>{line}</p>)}
      <StyledImage
        src={editorImageUrl}
        alt="editor image URL"
        iswide="true"
      />
      <StyledImage
        src={cardImageUrl}
        alt="card image URL"
      />
    </AboutContainer>
  );
}

export default About;
