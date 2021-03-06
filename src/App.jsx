import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import CardGroup from './containers/CardGroup';
import CardLibrary from './containers/CardLibrary';
import CardSet from './containers/CardSet';
import Main from './containers/Main';

import DrawerComponent from './components/Drawer/Drawer';
import NavBar from './components/NavBar/NavBar';
import Welcome from './components/Welcome';
import About from './components/About';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';

import { UserProvider } from './context/userContext';

import { getApiReqData, useApiCall } from './api/apiRequest';
import { GET_CURRENT_USER } from './api/apiReqTypes.json';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const AppContainer = styled.div`
  ${(props) => (props.isloading ? 'filter: blur(5px);' : '')}
`;

function App() {
  const { root } = useStyles();
  const [{ data: currentUser, isLoading }, getCurrentUser] = useApiCall(
    getApiReqData({ type: GET_CURRENT_USER }),
  );

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div>
      {isLoading && <LoadingIndicator />}
      <AppContainer isloading={String(isLoading || '')}>
        <div className={root}>
          <Router>
            <UserProvider currentUser={currentUser} isUserLoading={isLoading}>
              <NavBar />
              <DrawerComponent />
              <Switch>
                <Route path="/" exact>
                  {currentUser ? <Main /> : (!isLoading && <Welcome />)}
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/groups/:id">
                  {currentUser ? <CardGroup /> : (!isLoading && <Welcome />)}
                </Route>
                <Route path="/sets/:id">
                  <CardSet />
                </Route>
                <Route path="/library">
                  <CardLibrary />
                </Route>
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </UserProvider>
          </Router>
        </div>
      </AppContainer>
    </div>
  );
}

export default App;
