import { useTheme } from './index';

export const useToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const updateTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(updateTheme);
    localStorage.setItem('theme', updateTheme);
  };
  return toggleTheme;
};
