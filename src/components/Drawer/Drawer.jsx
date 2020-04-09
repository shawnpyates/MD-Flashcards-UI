import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { MenuTitle, StyledDrawer, StyledList } from './styledComponents';

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
    link: '/library',
  },
];

function DrawerComponent() {
  const { drawer, toolbar } = useStyles();
  return (
    <StyledDrawer className={drawer} variant="permanent" anchor="left">
      <div className={toolbar} />
      <StyledList>
        <ListItem button>
          <MenuTitle>MD Flashcards</MenuTitle>
        </ListItem>
        {drawerItems.map(({ text, link }) => (
          <Link to={link} key={text}>
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </StyledList>
    </StyledDrawer>
  );
}


export default DrawerComponent;
