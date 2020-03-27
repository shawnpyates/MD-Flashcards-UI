import React, { useContext } from 'react';
import Container from '@material-ui/core/Container'
import styled from 'styled-components';

import { UserContext } from '../context/userContext';

const MainContainer = styled(Container)`
  height: 300px;
  width: 300px;
  position: absolute;
  top: 100px;
  left: 300px;
  background-color: #F0F0F0;
`;

function Main() {
  const { currentUser } = useContext(UserContext);
  return (
    <MainContainer>
      hi{currentUser ? ` ${currentUser.name}` : currentUser}
    </MainContainer>
  )
}

export default Main;
