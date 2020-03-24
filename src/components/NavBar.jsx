import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  bar: {
    backgroundColor: '#060',
    zIndex: '5000',
    textAlign: 'center',
  },
  title: {
    flexGrow: 1
  },
}));

const NavBar = () => {
  const { title, bar } = useStyles();
  return(
    <AppBar className={bar} position="static">
      <Toolbar>
        <Typography variant="h5" className={title} color="inherit">
          MD Flashcards
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;