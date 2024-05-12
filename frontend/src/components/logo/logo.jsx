import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import { useThemeSettingContext } from 'src/contexts/ThemeSettingContext';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const { mode } = useThemeSettingContext();

  const themeLogos = {
    light: '/assets/logos/logo_dark.svg',
    dark: '/assets/logos/logo_light.svg',
  };

  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src={themeLogos[mode]}
      sx={{ width: 100, height: 40, cursor: 'pointer', ...sx }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'flex', justifyContent: 'center' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
