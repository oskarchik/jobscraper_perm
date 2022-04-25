import { useContext, useEffect } from 'react';
import ThemeContext from '../context/themeContext';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);
  return useContext(ThemeContext);
};
