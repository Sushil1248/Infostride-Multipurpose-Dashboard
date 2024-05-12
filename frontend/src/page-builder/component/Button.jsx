import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';

const Button = ({ label }) => (
  <MuiButton variant="contained" color="primary" className="px-4 py-2">
    {label}
  </MuiButton>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Button;
