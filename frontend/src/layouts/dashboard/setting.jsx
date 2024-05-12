import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useThemeSettingContext } from 'src/contexts/ThemeSettingContext';

import Iconify from 'src/components/iconify';

export default function Setting() {
  const { mode, setMode, sectionColor, setSectionColor } = useThemeSettingContext();
  const [state, setState] = React.useState({
    right: false,
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: isMobile ? '100%' : 600 }}
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
          <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
            <Button variant="outlined" onClick={() => setMode('light')} sx={{ width: isMobile ? '100%' : 200, height: 100 }} disabled={mode==='light'}>
              <span className={`${mode === 'light' && 'active'}`} >
                Light Mode
              </span>
            </Button>
            <Button variant="outlined" onClick={() => setMode('dark')} sx={{ width: isMobile ? '100%' : 200, height: 100 }} disabled={mode==='dark'}>
              <span className={`${mode === 'dark' && 'active'}`}>Dark Mode</span>
            </Button>
          </Stack>
        </Stack>
      </Box>


      <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 170px)' }}>
        <Stack spacing={2} sx={{ width: '100%', padding: '0.75rem' }}>
          <Typography variant="h6">Section Colors</Typography>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
            <Button variant="outlined" onClick={() => setSectionColor('indigo')} sx={{ width: isMobile ? '100%' : 200, height: 100 }} disabled={sectionColor==='indigo'}>
              <span className={`${sectionColor === 'indigo' && 'active'}`} >
                Indigo
              </span>
            </Button>
            <Button variant="outlined" onClick={() => setSectionColor('green')} sx={{ width: isMobile ? '100%' : 200, height: 100 }} disabled={sectionColor==='green'}>
              <span className={`${sectionColor === 'green' && 'active'}`} >
                Green
              </span>
            </Button>
            <Button variant="outlined" onClick={() => setSectionColor('brown')} sx={{ width: isMobile ? '100%' : 200, height: 100 }} disabled={sectionColor==='brown'}>
              <span className={`${sectionColor === 'brown' && 'active'}`} >
                Brown
              </span>
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
