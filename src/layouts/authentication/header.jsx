import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';
import Setting from 'src/layouts/dashboard/setting';

import Iconify from 'src/components/iconify';

import LanguagePopover from '../shared/common/language-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <Setting />
      </Stack>
    </>
  );

  return (
    <Grid
      sx={{
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </Grid>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
