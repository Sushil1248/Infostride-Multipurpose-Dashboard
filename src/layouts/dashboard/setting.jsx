import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { useThemeSettingContext } from 'src/contexts/ThemeSettingContext';

import Iconify from 'src/components/iconify';

export default function Setting() {
  const { mode, setMode } = useThemeSettingContext();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 600 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h3" sx={{ padding: '1rem' }}>
        Settings
      </Typography>

      <Divider />

      <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>
        <Stack spacing={2} sx={{ width: '100%', padding: '0.75rem' }}>
          <Typography variant="h6">Mode</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined"  onClick={() => setMode('light')} sx={{ width: 200, height: 100 }} disabled={mode==='light'}>
              <span className={`${mode === 'light' && 'active'}`} >
                Light Mode
              </span>
            </Button>
            <Button variant="outlined" onClick={() => setMode('dark')} sx={{ width: 200, height: 100 }}  disabled={mode==='dark'}>
              <span className={`${mode === 'dark' && 'active'}`}>Dark Mode</span>
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Button onClick={toggleDrawer('right', true)}>
          {' '}
          <Iconify width={24} icon="solar:settings-bold" />
        </Button>
        <SwipeableDrawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}
        >
          {list('right')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
