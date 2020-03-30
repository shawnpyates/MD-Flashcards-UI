import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  AppBar,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

import { UserContext } from '../context/userContext';

const StyledAppBar = styled(AppBar)`
  background-color: #060;
  z-index: 5000;
  height: 60px;
`;

const StyledButton = styled(Button)`
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

const StyledGitHubIcon = styled(GitHub)`
  font-size: 16px;
  margin-right: 8px;
`;


function NavBar() {
  const { currentUser } = useContext(UserContext);
  const { endpoint, buttonContent } = (
    currentUser
      ? { endpoint: '/signout', buttonContent: 'Sign Out' }
      : {
        endpoint: '/github',
        buttonContent:
        <>
          <StyledGitHubIcon />
          Login with Github
        </>,
      }
  );
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          MD Flashcards
        </Typography>
        <StyledButton>
          <Link href={`http://localhost:4000/auth${endpoint}`}>
            {buttonContent}
          </Link>
        </StyledButton>
      </Toolbar>
    </StyledAppBar>
  );
}

export default NavBar;
