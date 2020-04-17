import React, {
  useContext, useEffect, useRef, useState,
} from 'react';

import {
  Grow,
  Popper,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { UserContext } from '../../context/userContext';
import { AUTH_URL } from '../../config';
import { menu as menuItems } from '../../containers/contentConfig.json';

import {
  ButtonContainer,
  StyledAppBar,
  StyledButton,
  StyledGitHubIcon,
  StyledFaIcon,
  StyledMenuIcon,
} from './styledComponents';

function NavBar() {
  const { currentUser, isUserLoading } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setIsMenuOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsMenuOpen(false);
    }
  };

  const wasPreviouslyOpen = useRef(isMenuOpen);

  useEffect(() => {
    if (wasPreviouslyOpen.current === true && isMenuOpen === false) {
      anchorRef.current.focus();
    }

    wasPreviouslyOpen.current = isMenuOpen;
  }, [isMenuOpen]);

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
        <StyledMenuIcon
          ref={anchorRef}
          aria-controls={(isMenuOpen && 'menu-list-grow') || null}
          aria-haspopup="true"
          onClick={toggleMenu}
        />
        <Popper
          open={isMenuOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={isMenuOpen} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {menuItems.map(({ text, link, requiresCurrentUser }) => (
                      (currentUser || !requiresCurrentUser)
                      && (
                        <Link href={link} key={text}>
                          <MenuItem onClick={handleClose}>{text}</MenuItem>
                        </Link>
                      )
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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
