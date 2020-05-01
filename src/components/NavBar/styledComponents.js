import styled from 'styled-components';

import {
  AppBar,
  Button,
} from '@material-ui/core';
import { GitHub, Menu } from '@material-ui/icons';

import { BUTTON_ICON_MIXIN } from '../../styles/mixins';

export const ButtonContainer = styled.div`
  position: absolute;
  right: 2%;
`;

export const StyledAppBar = styled(AppBar)`
  background-color: #2E7D32;
  z-index: 5000;
  position: fixed;
`;

export const StyledButton = styled(Button)`
  background-color: #FFF;
  margin-left: 25px;

  &:hover {
    background-color: #F0F0F0;
  }

  & a {
    color: #000;
    &:hover {
      text-decoration: none;
    }
  }

  @media only screen and (max-width: 800px) {
    background-color: #2E7D32;
    margin: 0;
    min-width: 10px;

    &:hover {
      background-color: initial;
    }
  }
`;

export const StyledGitHubIcon = styled(GitHub)`
  font-size: 16px;

  ${BUTTON_ICON_MIXIN}

  @media only screen and (max-width: 800px) {
    color: #FFF;
  }
`;

export const StyledFaIcon = styled.i`
  height: 16px;

  ${BUTTON_ICON_MIXIN}

  @media only screen and (max-width: 800px) {
    color: white;
  }
`;

export const StyledMenuIcon = styled(Menu)`
  margin-left: 20px;
  cursor: pointer;

  @media only screen and (min-width: 1040px) {
    visibility: collapse;
  }
`;

export const ResponsiveP = styled.p`
  display: inline;
  text-transform: none;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;
