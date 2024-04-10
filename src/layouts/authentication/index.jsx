import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function AuthLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  console.log(openNav)
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};
