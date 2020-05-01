import styled from 'styled-components';
import {
  Button as MaterialUiButton,
  TableCell as MaterialUiTableCell,
  TableContainer as MaterialUiTableContainer,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import {
  BRAND_PRIMARY,
  BRAND_CONTRAST,
  MEDIUM_GRAY,
  WHITE,
} from '../styles/constants';
import { TABLE_POSITION_MIXIN } from '../styles/mixins';

export const TableContainer = styled(MaterialUiTableContainer)`
  overflow: visible;
  min-width: 650px;

  ${TABLE_POSITION_MIXIN};
`;

export const Button = styled(MaterialUiButton)`
  background-color: ${BRAND_PRIMARY};
  color: ${WHITE};

  &:hover {
    background-color: ${BRAND_CONTRAST};
  }

  &:disabled{ 
    background-color: ${MEDIUM_GRAY};
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
