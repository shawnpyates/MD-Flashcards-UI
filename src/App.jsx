import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import CardGroup from './containers/CardGroup';
import CardLibrary from './containers/CardLibrary';
import CardSet from './containers/CardSet';
import Main from './containers/Main';

import DrawerComponent from './components/Drawer/Drawer';
import NavBar from './components/NavBar/NavBar';
import Welcome from './components/Welcome';

import { UserProvider } from './context/userContext';

import { getApiReqData, useApiFetch } from './api/apiRequest';
import { GET_CURRENT_USER } from './api/apiReqTypes.json';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const { root } = useStyles();
  const [currentUser, isLoading] = useApiFetch(getApiReqData({ type: GET_CURRENT_USER }));

  return (
    <div className={root}>
      <Router>
        <UserProvider currentUser={currentUser}>
          <NavBar />
          <DrawerComponent />
          {isLoading
            ? <div>Loading!</div>
            : (
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
            )}
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
