import styled from 'styled-components';
import {
  Button as MaterialUiButton,
  TableCell as MaterialUiTableCell,
  TableContainer as MaterialUiTableContainer,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { TABLE_POSITION_MIXIN } from '../styles/mixins';

export const TableContainer = styled(MaterialUiTableContainer)`
  overflow: visible;
  min-width: 650px;

  ${TABLE_POSITION_MIXIN};
`;

export const Button = styled(MaterialUiButton)`
  background-color: #2E7D32;
  color: #FFF;

  &:hover {
    background-color: #070;
  }

  &:disabled{ 
    background-color: #F0F0F0;
  }
`;

export const HeadTableCell = styled(MaterialUiTableCell)`
  font-weight: 700;
  text-transform: uppercase;
`;

export const ContentTableCell = styled(MaterialUiTableCell)`
  width: calc(100% / ${(props) => props.columnlength});
`;

export const EmptyDataIndicator = styled.div`
  margin: 35px auto;
  text-align: center;
`;

export const StyledRowLink = styled(Link)`
  display: contents;
`;
