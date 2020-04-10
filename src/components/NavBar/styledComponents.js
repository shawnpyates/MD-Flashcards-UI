import styled from 'styled-components';

import {
  AppBar,
  Button,
} from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

export const StyledAppBar = styled(AppBar)`
  background-color: #060;
  z-index: 5000;
  height: 60px;
  position: fixed;
`;

export const StyledButton = styled(Button)`
  background-color: #FFF;
  position: absolute;
  right: 60px;

  &:hover {
    background-color: #F0F0F0;
  }

  & a {
    color: #000;
    &:hover {
      text-decoration: none;
    }
  }
`;

export const StyledGitHubIcon = styled(GitHub)`
  font-size: 16px;
  margin-right: 8px;
`;
