import {
  Container,
  RadioGroup,
} from '@material-ui/core';
import styled from 'styled-components';

import { Button as CommonButton } from '../commonStyledComponents';

export const ConfigContainer = styled(Container)`
  width: 70%;
  position: absolute;
  top: 100px;
  left: 250px;
`;

export const StyledRadioGroup = styled(RadioGroup)`
  margin-bottom: 20px;
`;

export const StyledButton = styled(CommonButton)`
  margin-right: 25px;
`;
