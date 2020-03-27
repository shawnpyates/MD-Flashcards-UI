import React from 'react';
import styled from 'styled-components';
// import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { GitHub } from '@material-ui/icons';

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
  return(
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          MD Flashcards
        </Typography>
        <StyledButton>
          <Link href="http://localhost:4000/auth/github">
            <StyledGitHubIcon />Login with Github
          </Link>
        </StyledButton>
      </Toolbar>
    </StyledAppBar>
  )
}

export default NavBar;