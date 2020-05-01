import {
  Table,
  TextareaAutosize,
} from '@material-ui/core';
import styled from 'styled-components';
import { DeleteForever, Help } from '@material-ui/icons';

import {
  TableContainer,
  Button,
  HeadTableCell as CommonHeadTableCell,
  ContentTableCell as CommonContentTableCell,
  EmptyDataIndicator as CommonEmptyDataIndicator,
} from '../commonStyledComponents';
import { BRAND_PRIMARY, RED } from '../../styles/constants';

export const ListContainer = styled(TableContainer)`
  width: 80%;
`;

export const ListTable = styled(Table)`
  width: 95%;
  ${(props) => (props.isloading ? 'filter: blur(5px);' : '')}
`;

export const ListButton = styled(Button)`
  ${(props) => (
    props.createnewitem
      ? ''
      : 'margin-right: 25px;'
  )}

  ${(props) => (
    props.addnewrow
      ? 'width: 80px; font-size: 10px;'
      : ''
  )}

  display: ${((props) => (props.ishidden ? 'none' : 'initial'))}
`;

export const SideContent = styled.td`
  margin-left: 20px;
`;

export const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 16px;
`;

export const StyledDeleteIcon = styled(DeleteForever)`
  color: ${RED};
  cursor: pointer;
`;

export const StyledHelpIcon = styled(Help)`
  color: ${BRAND_PRIMARY};
  cursor: pointer;
  vertical-align: middle;
`;

export const ContentTableCell = styled(CommonContentTableCell)`
  ${(props) => (props.islast && 'border-bottom: none;') || ''}
  ${(props) => (props.fornewrowbutton && 'padding-bottom: 35px;') || ''}
  padding: 0 5px auto;
  & pre > code {
    white-space: pre-wrap !important;
  }
`;

export const CsvUploadContainer = styled.div`
  margin: 12px auto;
`;

export const CsvUploadInput = styled.input`
  width: 170px;
  cursor: pointer;
`;

export const HeadTableCell = CommonHeadTableCell;

export const EmptyDataIndicator = CommonEmptyDataIndicator;
