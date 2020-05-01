import { Drawer, List } from '@material-ui/core';
import styled from 'styled-components';

import { BLACK } from '../../styles/constants';

export const StyledDrawer = styled(Drawer)`
  color: ${BLACK};

  @media only screen and (max-width: 1040px) {
    visibility: collapse;
  }
`;

export const MenuTitle = styled.h4`
  text-transform: uppercase;
  text-decoration: underline;
  font-weight: 700
`;

export const StyledList = styled(List)`
  margin-top: -75px;
  padding-top: 0;
`;
