/* eslint react/prop-types: 0 */
import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  ConfigContainer,
  StyledRadioGroup,
  StyledButton,
} from './styledComponents';

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const renderOptions = (options) => Object.values(options).map((option) => (
  <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />
));

function ConfigForm({
  handleButtonClick,
  formState,
  originalSet,
  handleChange,
  cardSetModes,
  displayFirstOptions,
  orderOptions,
}) {
  const getButton = (mode, text) => (
    <StyledButton onClick={() => handleButtonClick(mode)}>{text}</StyledButton>
  );

  return (
    <ConfigContainer>
      <h2>{`Get ready to study ${originalSet.name}!`}</h2>
      <FormControl component="fieldset">
        <FormLabel component="legend">Which order should the cards appear in?</FormLabel>
        <StyledRadioGroup
          aria-label="displayOrder"
          name="order"
          value={formState.order}
          onChange={handleChange}
        >
          {renderOptions(orderOptions)}
        </StyledRadioGroup>
        <FormLabel component="legend">Which side of the card should appear first?</FormLabel>
        <StyledRadioGroup
          aria-label="displayFirst"
          name="displayFirst"
          value={formState.displayFirst}
          onChange={handleChange}
        >
          {renderOptions(displayFirstOptions)}
        </StyledRadioGroup>
      </FormControl>
      <div>
        {getButton(cardSetModes.STUDY, 'Start!')}
        {getButton(cardSetModes.VIEW, 'Go Back to Card List')}
      </div>
    </ConfigContainer>
  );
}

ConfigForm.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  formState: PropTypes.objectOf(PropTypes.string).isRequired,
  originalSet: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  cardSetModes: PropTypes.arrayOf(PropTypes.string).isRequired,
  displayFirstOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  orderOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ConfigForm;
