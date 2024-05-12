import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

const ImageBox = ({ imageUrl }) => (
  <Paper elevation={3} className="mb-4">
    <img src={imageUrl} alt="test" className="max-w-full h-auto" />
  </Paper>
);

ImageBox.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ImageBox;
