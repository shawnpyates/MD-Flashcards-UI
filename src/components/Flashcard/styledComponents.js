import {
  Button,
  Card,
  CardActions,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import {
  BRAND_PRIMARY,
  BRAND_CONTRAST,
  WHITE,
  LIGHT_GRAY,
  MEDIUM_GRAY,
  BLACK,
} from '../../styles/constants';

const CHEV_SIZE = '60px';

const CHEV_STYLES_MIXIN = `
  font-size: ${CHEV_SIZE};
  cursor: pointer;
  color: ${BRAND_PRIMARY};
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
  border: 1px solid ${MEDIUM_GRAY};
  padding: 20px;
  background-color: ${(props) => (props.isShaded ? LIGHT_GRAY : WHITE)};
`;

export const StyledActionsContainer = styled(CardActions)`
  display: block;
  height: 30px;
`;

export const ActionButton = styled(Button)`
  position: absolute;
  background-color: ${MEDIUM_GRAY};
  color: ${BLACK};
  margin-top: 25px;
  ${(props) => props.side}: 50px;
`;

export const FlipButton = styled(Button)`
  background-color: ${BRAND_PRIMARY};
  color: ${WHITE};
  margin-top: 15px;

  &:hover {
    background-color: ${BRAND_CONTRAST};
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
