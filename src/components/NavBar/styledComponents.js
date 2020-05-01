import styled from 'styled-components';

import {
  AppBar,
  Button,
  Typography,
} from '@material-ui/core';
import { GitHub, Menu } from '@material-ui/icons';

import { BUTTON_ICON_MIXIN } from '../../styles/mixins';
import {
  BRAND_PRIMARY,
  MEDIUM_GRAY,
  WHITE,
  BLACK,
} from '../../styles/constants';

export const ButtonContainer = styled.div`
  position: absolute;
  right: 2%;
`;

export const StyledAppBar = styled(AppBar)`
  background-color: ${BRAND_PRIMARY};
  z-index: 5000;
  position: fixed;
`;

export const StyledButton = styled(Button)`
  background-color: ${WHITE};
  margin-left: 25px;

  &:hover {
    background-color: ${MEDIUM_GRAY};
  }

  & a {
    color: ${BLACK};
    &:hover {
      text-decoration: none;
    }
  }

  @media only screen and (max-width: 800px) {
    background-color: ${BRAND_PRIMARY};
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
    color: ${WHITE};
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

export const StyledTitle = styled(Typography)`
  cursor: pointer;
`;
