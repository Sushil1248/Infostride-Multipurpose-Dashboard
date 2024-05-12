import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

const TextBox = ({ text }) => (
  <Paper elevation={3} className="p-4 mb-4">
    {text}
  </Paper>
);

TextBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextBox;