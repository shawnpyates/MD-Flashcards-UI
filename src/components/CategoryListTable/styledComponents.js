import {
  TableRow,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';

import {
  TableContainer,
  Button,
  HeadTableCell as CommonHeadTableCell,
  ContentTableCell as CommonContentTableCell,
  EmptyDataIndicator as CommonEmptyDataIndicator,
} from '../commonStyledComponents';

export const ListContainer = styled(TableContainer)`
  width: 70%;
  position: absolute;
  top: 100px;
  left: 250px;
`;

export const ListRow = styled(TableRow)`
  cursor: pointer;
`;

export const ListButton = styled(Button)`
  ${(props) => (
    props.newitem
      ? 'transform: translateY(25%);'
      : 'display: block;'
  )}
`;

export const NewItemContainer = styled.div`
  margin: 30px auto 5px;
`;

export const StyledTextField = styled(TextField)`
  margin-right: 25px;
`;

export const HeadTableCell = CommonHeadTableCell;

export const ContentTableCell = CommonContentTableCell;

export const EmptyDataIndicator = CommonEmptyDataIndicator;