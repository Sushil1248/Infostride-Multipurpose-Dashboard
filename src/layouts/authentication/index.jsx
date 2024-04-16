import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Main from './main';

// ----------------------------------------------------------------------

export default function AuthLayout({ children }) {
  return (

    <Box
      sx={{
        minHeight: 1,
        p: 8,
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <Main sx={{
        p: 0,
      }}>{children}</Main>
    </Box>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};
