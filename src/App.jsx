import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Main from './containers/Main';

import NavBar from './components/NavBar';
import Drawer from './components/DrawerComponent';
import Welcome from './components/Welcome';
import CardGroup from './containers/CardGroup';
import CardSet from './containers/CardSet';

import { UserProvider } from './context/userContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
}));


function App() {
  const { root } = useStyles();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4000/api/current_user', { credentials: 'include' })
    .then(res => res.json())
    .then(({ data }) => {
      console.log('USER: ', data);
      setCurrentUser(data);
    })
  }, [])
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
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
