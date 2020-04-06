import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import CardGroup from './containers/CardGroup';
import CardLibrary from './containers/CardLibrary';
import CardSet from './containers/CardSet';
import Main from './containers/Main';

import DrawerComponent from './components/Drawer/Drawer';
import NavBar from './components/NavBar/NavBar';
import Welcome from './components/Welcome';

import { UserProvider } from './context/userContext';

import { getApiReqData, useApiCall } from './api/apiRequest';
import { GET_CURRENT_USER } from './api/apiReqTypes.json';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const AppContainer = styled.div`
  ${(props) => (props.isLoading ? 'filter: blur(5px);' : '')}
`;

const LoadingIndicator = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
`;

function App() {
  const { root } = useStyles();
  const [{ data: currentUser, isLoading }, callApi] = useApiCall(
    getApiReqData({ type: GET_CURRENT_USER }),
  );

  useEffect(() => {
    callApi();
  }, [callApi]);

  return (
    <div>
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      <AppContainer isLoading={isLoading}>
        <div className={root}>
          <Router>
            <UserProvider currentUser={currentUser} isUserLoading={isLoading}>
              <NavBar />
              <DrawerComponent />
              {currentUser
            && (
              <Switch>
                <Route path="/" exact>
                  <Main />
                </Route>
                <Route path="/groups/:id">
                  <CardGroup />
                </Route>
                <Route path="/sets/:id">
                  <CardSet />
                </Route>
                <Route path="/library">
                  <CardLibrary />
                </Route>
              </Switch>
            )}
              {(!currentUser && !isLoading) && <Welcome />}
            </UserProvider>
          </Router>
        </div>
      </AppContainer>
    </div>
  );
}

export default App;
