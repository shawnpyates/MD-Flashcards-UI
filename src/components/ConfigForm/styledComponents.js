import { RadioGroup } from '@material-ui/core';
import styled from 'styled-components';

import { Button as CommonButton, TableContainer } from '../commonStyledComponents';

export const ConfigContainer = styled(TableContainer)`
  width: 70%;
`;

export const StyledRadioGroup = styled(RadioGroup)`
  margin-bottom: 20px;
`;

export const StyledButton = styled(CommonButton)`
  margin-right: 25px;
`;
