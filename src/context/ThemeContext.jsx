import { createContext, useContext } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  return children;
}

export function useTheme() {
  return useContext(ThemeContext);
}
