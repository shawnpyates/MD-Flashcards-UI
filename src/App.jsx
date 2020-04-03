import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import CardGroup from './containers/CardGroup';
import CardLibrary from './containers/CardLibrary';
import CardSet from './containers/CardSet';
import Main from './containers/Main';

import Drawer from './components/DrawerComponent';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';

import { UserProvider } from './context/userContext';

import { getCurrentUser } from './api';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const { root } = useStyles();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      });
  }, []);

  return (
    <div className={root}>
      <Router>
        <UserProvider currentUser={currentUser}>
          <NavBar />
          <Drawer />
          <Switch>
            <Route path="/" exact>
              {currentUser ? <Main /> : <Welcome />}
            </Route>
            <Route path="/groups/:id" exact>
              <CardGroup />
            </Route>
            <Route path="/sets/:id" exact>
              <CardSet />
            </Route>
            <Route path="/library" exact>
              <CardLibrary />
            </Route>
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
