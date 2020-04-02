import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}));

const drawerItems = [
  {
    text: 'My Flashcards',
    link: '/',
  },
  {
    text: 'Flashcard Library',
    link: '/',
  },
  {
    text: 'Settings',
    link: '/',
  },
];

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

function DrawerComponent() {
  const { drawer, toolbar } = useStyles();
  return (
    <Drawer className={drawer} variant="permanent" anchor="left">
      <div className={toolbar} />
      <List>
        {drawerItems.map(({ text, link }) => (
          <StyledLink to={link}>
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </Drawer>
  );
}

export default DrawerComponent;
