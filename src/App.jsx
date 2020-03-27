import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Auth from './containers/Auth';
import Main from './containers/Main';

import NavBar from './components/NavBar';
import Drawer from './components/DrawerComponent';

import { UserProvider } from './context/userContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
}));


function App() {
  const { root } = useStyles();
  const [currentUser, setCurrentUser] = useState(null);
  console.log('cu: ', currentUser);
  useEffect(() => {
    fetch('http://localhost:4000/api/current_user', { credentials: 'include' })
    .then(res => res.json())
    .then(({ data }) => {
      setCurrentUser(data);
    })
  }, [])
  return (
    <div className={root}>
      <Router>
        <NavBar />
        <Drawer />
        <Route path="/" exact>
          <UserProvider currentUser={currentUser}>
            <Main />
          </UserProvider>
        </Route>
        <Route path="/auth/:userId">
          <Auth setCurrentUser={setCurrentUser} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
