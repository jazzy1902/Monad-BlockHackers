import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { ToggleButton } from './ThemeToggle.styles';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} title="Toggle theme">
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};
