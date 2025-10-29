import { useState, useEffect } from 'react';

/**
 * Custom hook for theme management
 */
export const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-tracker-theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    localStorage.setItem('portfolio-tracker-theme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  // Theme toggle handler
  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return {
    isDarkTheme,
    toggleTheme
  };
};