import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar
}));

const DrawerComponent = () => {
  const { drawer, toolbar } = useStyles();
  return(
    <Drawer className={drawer} variant="permanent" anchor="left">
      <div className={toolbar} />
      <List>
        {['My Flashcards', 'Flashcard Library', 'Settings'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default DrawerComponent;