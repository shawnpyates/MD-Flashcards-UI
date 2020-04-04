import {
  Table,
  TextareaAutosize,
} from '@material-ui/core';
import styled from 'styled-components';
import { DeleteForever } from '@material-ui/icons';

import {
  TableContainer,
  Button,
  HeadTableCell,
  ContentTableCell as CommonContentTableCell,
  EmptyDataIndicator,
} from './commonStyledComponents';

const ListContainer = styled(TableContainer)`
  width: 80%;
`;

const ListTable = styled(Table)`
  width: 95%;
`;

const ListButton = styled(Button)`
  ${((props) => (
    props.createnewitem
      ? ''
      : 'margin-right: 25px;'
  ))}

  ${((props) => (
    props.addnewrow
      ? 'width: 80px; font-size: 10px;'
      : ''
  ))}
`;

const SideContent = styled.td`
  margin-left: 20px;
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
`;

const SuccessIndicator = styled.span`
  margin-left: 20px;
  color: #060;
  font-weight: 700;
`;

const StyledDeleteIcon = styled(DeleteForever)`
  color: #F00;
  cursor: pointer;
`;

const ContentTableCell = styled(CommonContentTableCell)`
  ${(props) => (props.islast && 'border-bottom: none;') || ''}
  ${(props) => (props.fornewrowbutton && 'padding-bottom: 35px;') || ''}
  padding: 0 5px auto;
  & pre > code {
    white-space: pre-wrap !important;
  }
`;

module.exports = {
  ListContainer,
  ListTable,
  ListButton,
  SideContent,
  StyledTextarea,
  SuccessIndicator,
  StyledDeleteIcon,
  HeadTableCell,
  ContentTableCell,
  EmptyDataIndicator,
};
