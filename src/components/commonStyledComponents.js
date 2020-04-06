import styled from 'styled-components';
import {
  Button as MaterialUiButton,
  TableCell as MaterialUiTableCell,
  TableContainer as MaterialUiTableContainer,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export const TableContainer = styled(MaterialUiTableContainer)`
  overflow: visible;
  position: absolute;
  top: 100px;
  left: 250px;
`;

export const Button = styled(MaterialUiButton)`
  background-color: #060;
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
