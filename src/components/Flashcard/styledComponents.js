import {
  Button,
  Card,
  CardActions,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const CHEV_SIZE = '60px';

const CHEV_STYLES_MIXIN = `
  font-size: ${CHEV_SIZE};
  cursor: pointer;
  color: #060;
`;

export const StudyCard = styled(Card)`
  min-width: 60%;
  max-width: 75%;
  overflow-x: scroll;
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
  width: 90%;
  min-height: 130px;
  border: 1px solid #F0F0F0;
  padding: 20px;
  background-color: ${(props) => (props.isShaded ? '#FBFBFB' : '#FFF')};
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

export const StyledMarkdown = styled(ReactMarkdown)`
  vertical-align: middle;
  display: table-cell;
  font-size: 20px;

  & > ul {
    text-align: left;
    display: inline-block;
  }
`;

export const ChevContainer = styled.div`
  height: 60px;
`;

export const StyledLeftChev = styled(ChevronLeft)`
  ${CHEV_STYLES_MIXIN}
`;

export const StyledRightChev = styled(ChevronRight)`
  ${CHEV_STYLES_MIXIN}
`;
