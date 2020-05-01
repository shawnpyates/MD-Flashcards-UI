import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';

import { TABLE_POSITION_MIXIN } from '../styles/mixins';
import {
  BRAND_PRIMARY,
  LIGHT_GRAY,
  MEDIUM_GRAY,
  BLACK,
} from '../styles/constants';
import { about as content } from '../content.json';

const {
  title,
  description,
  editorImageUrl,
  cardImageUrl,
} = content;

const AboutContainer = styled(Container)`
  width: 70%;
  text-align: center;
  border: 1px solid ${MEDIUM_GRAY};
  padding: 30px;
  color: ${BRAND_PRIMARY};
  background-color: ${LIGHT_GRAY};

  ${TABLE_POSITION_MIXIN}

  & p {
    color: ${BLACK};
  }
`;

const StyledImage = styled.img`
  max-height: ${(props) => (props.iswide ? '160px' : '300px')};
  border 2px solid ${MEDIUM_GRAY};
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
