import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

const ErrorMessage = forwardRef(({ message }, ref) => (
    <FormHelperText sx= {{color: 'red', marginTop:'12px'}}>{message}</FormHelperText>
));

ErrorMessage.propTypes = {
  message: PropTypes.string, // Validation error message
};

export default ErrorMessage;