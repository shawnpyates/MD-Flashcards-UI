import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

import NavBar from './components/NavBar'
import Drawer from './components/DrawerComponent'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
}));

function App() {
  const { root } = useStyles();
  return (
    <div className={root}>
      <NavBar />
      <Drawer />
    </div>
  );
}

export default App;
