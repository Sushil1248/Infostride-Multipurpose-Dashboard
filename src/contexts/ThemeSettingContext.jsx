import PropTypes from 'prop-types';
import React, { useMemo, useState, useContext, createContext } from 'react';

const ThemeSettingContext = createContext();

export const ThemeSettingContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode, setMode]
  );

  return (
    <ThemeSettingContext.Provider value={contextValue}>{children}</ThemeSettingContext.Provider>
  );
};

ThemeSettingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useThemeSettingContext = () => useContext(ThemeSettingContext);
