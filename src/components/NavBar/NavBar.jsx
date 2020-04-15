import React, { useContext } from 'react';

import {
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { UserContext } from '../../context/userContext';
import { AUTH_URL } from '../../config';

import {
  ButtonContainer,
  StyledAppBar,
  StyledButton,
  StyledGitHubIcon,
  StyledFaIcon,
} from './styledComponents';

function NavBar() {
  const { currentUser, isUserLoading } = useContext(UserContext);
  const buttons = (
    currentUser
      ? [{ endpoint: '/signout', content: 'Sign Out' }]
      : [{
        endpoint: '/google',
        content:
        <>
          <StyledFaIcon className="fab fa-google" />
          Sign in with Google
        </>,
      },
      {
        endpoint: '/github',
        content:
        <>
          <StyledGitHubIcon />
          Sign in with Github
        </>,
      }]
  );
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          MD Flashcards
        </Typography>
        {!isUserLoading
        && (
          <ButtonContainer>
            {buttons.map(({ endpoint, content }) => (
              <StyledButton key={endpoint}>
                <Link href={`${AUTH_URL}${endpoint}`}>
                  {content}
                </Link>
              </StyledButton>
            ))}
          </ButtonContainer>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}

export default NavBar;
