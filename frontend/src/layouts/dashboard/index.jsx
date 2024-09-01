import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useUserContext } from 'src/contexts/AuthContext';

import Nav from './nav';
import Main from './main';
import Header from './header';
import Loader from '../shared/Loader';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children, showHeader }) {
  const [openNav, setOpenNav] = useState(false);
  const { isLoading, isAuthenticated } = useUserContext();
  return (
    <>
      {isLoading ? (
        // Render loading indicator or placeholder content while user data is loading
        <Loader type="default" />
      ) : (
        <>
          {isAuthenticated && (
            <>
              {showHeader===true && <Header onOpenNav={() => setOpenNav(true)} />}
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
      )}
    </>
  );
}


DashboardLayout.propTypes = {
  children: PropTypes.node,
  showHeader: PropTypes.bool
};
