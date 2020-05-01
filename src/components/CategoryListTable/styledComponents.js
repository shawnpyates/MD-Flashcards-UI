import {
  Table,
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
  StyledRowLink as CommonStyledRowLink,
} from '../commonStyledComponents';

import { BLACK } from '../../styles/constants';
import { CENTER_ELEMENT_MIXIN } from '../../styles/mixins';

export const StyledTable = styled(Table)`
  ${(props) => (props.isloading ? 'filter: blur(5px);' : '')}
`;

export const ListContainer = styled(TableContainer)`
  width: 70%;
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
  ${(props) => (props.isCreating ? 'filter: blur(5px);' : '')}
`;

export const StyledTextField = styled(TextField)`
  margin-right: 25px;
  width: 250px;
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  padding: 10px;
  border: 1px solid ${BLACK};
  border-radius: 5px;

  ${(props) => (props.margintop ? 'margin-top: 100px;' : '')}
  
  ${CENTER_ELEMENT_MIXIN}
`;

export const HeadTableCell = CommonHeadTableCell;

export const ContentTableCell = CommonContentTableCell;

export const EmptyDataIndicator = CommonEmptyDataIndicator;

export const StyledRowLink = CommonStyledRowLink;
