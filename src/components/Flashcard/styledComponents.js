import {
  Button,
  Card,
  CardActions,
  Typography,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import styled from 'styled-components';

const CHEV_SIZE = '60px';

const CHEV_STYLES_MIXIN = `
  font-size: ${CHEV_SIZE};
  cursor: pointer;
  color: #060;
`;

export const StudyCard = styled(Card)`
  width: 60%;
  min-height: 150px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 25px;
  text-align: center;
`;

export const QuestionContentContainer = styled.div`
  margin: auto 30px;
  display: inline-table;
  width: 70%;
  min-height: 40px;
  border: 1px solid #F0F0F0;
  vertical-align: top;
  padding: 5px;
  background-color: ${(props) => (props.isShaded ? '#F0F0F0' : '#FFF')};
`;

export const StyledActionsContainer = styled(CardActions)`
  display: block;
  height: 30px;
`;

export const ActionButton = styled(Button)`
  position: absolute;
  background-color: #F0F0F0;
  color: #000;
  margin-top: 25px;
  ${(props) => props.side}: 50px;
`;

export const FlipButton = styled(Button)`
  background-color: #060;
  color: #FFF;
  margin-top: 15px;

  &:hover {
    background-color: #070;
  }
`;

export const QuestionContent = styled(Typography)`
  vertical-align: middle;
  display: table-cell;
`;


export const ChevContainer = styled.div`
  width: ${CHEV_SIZE};
  display: inline-block;
  vertical-align: top;
`;

export const StyledLeftChev = styled(ChevronLeft)`
  ${CHEV_STYLES_MIXIN}
`;

export const StyledRightChev = styled(ChevronRight)`
  ${CHEV_STYLES_MIXIN}
`;
