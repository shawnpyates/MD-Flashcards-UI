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
    link: '/library',
  },
  {
    text: 'Settings',
    link: '/',
  },
];

const StyledDrawer = styled(Drawer)`
  color: #000;
`;

function DrawerComponent() {
  const { drawer, toolbar } = useStyles();
  return (
    <StyledDrawer className={drawer} variant="permanent" anchor="left">
      <div className={toolbar} />
      <List>
        {drawerItems.map(({ text, link }) => (
          <Link to={link} key={text}>
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </StyledDrawer>
  );
}


export default DrawerComponent;
