import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useUserContext } from 'src/contexts/AuthContext';

import Nav from './nav';
import Main from './main';
import Header from './header';
import Loader from '../shared/Loader';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const { isLoading } = useUserContext();
  return (
    <>
      {isLoading ? (
        // Render loading indicator or placeholder content while user data is loading
        <Loader type="default" />
      ) : (
        <>
          <Header onOpenNav={() => setOpenNav(true)} />
          <Box
            sx={{
              minHeight: 1,
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
            }}
          >
            <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
            <Main>{children}</Main>
          </Box>
        </>
      )}
    </>
  );
}


DashboardLayout.propTypes = {
  children: PropTypes.node,
};
