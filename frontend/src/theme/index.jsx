import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { useThemeSettingContext } from 'src/contexts/ThemeSettingContext';

import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { darkPalette, lightPalette, brown_variant,  green_variant, indigo_variant } from './palette';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const { mode, sectionColor } = useThemeSettingContext();
  const memoizedValue = useMemo(
    () => ({
      palette: mode === 'light' ? lightPalette() : darkPalette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [mode]
  );

  if(sectionColor && sectionColor !== 'default'){
   if(sectionColor === 'brown' ) memoizedValue.palette.primary = brown_variant;
   if(sectionColor === 'green' ) memoizedValue.palette.primary = green_variant;
   if(sectionColor === 'indigo')  memoizedValue.palette.primary = indigo_variant;
  }
  const theme = createTheme(memoizedValue);
  console.log(memoizedValue.palette.primary);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
