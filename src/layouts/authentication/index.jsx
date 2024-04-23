import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/contexts/AuthContext';
import Main from './main';

export default function AuthLayout({ children }) {
  const { isAuthenticated } = useUserContext();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: 1,
        p: 8,
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <Main sx={{ p: 0 }}>{children}</Main>
    </Box>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};
