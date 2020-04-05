import React, { useContext } from 'react';

import {
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { UserContext } from '../../context/userContext';
import { AUTH_URL } from '../../config';

import {
  StyledAppBar,
  StyledButton,
  StyledGitHubIcon,
} from './styledComponents';

function NavBar() {
  const { currentUser, isUserLoading } = useContext(UserContext);
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
        {!isUserLoading
        && (
          <StyledButton>
            <Link href={`${AUTH_URL}${endpoint}`}>
              {buttonContent}
            </Link>
          </StyledButton>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}

export default NavBar;
