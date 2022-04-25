import { ThemeProvider } from 'styled-components';

export const colors = {
  primaryColor: '#f5f5f5',
  secondaryColor: '#111827',
  actionColor: '#278ea5',
  hoverColor: '#2ca5bd',
  tableLight100: '#f5f5f5',
  tableLight200: '#DBE1E1',
  tableDark100: '#374151',
  tableDark200: '#1f2937',
  redColor: '#c20a32',
};
export const lightTheme = {
  backgroundColor: colors.primaryColor,
  fontColor: colors.secondaryColor,
  actionColor: colors.actionColor,
  hoverColor: colors.hoverColor,
  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
  table100: colors.tableLight100,
  table200: colors.tableLight200,
  redColor: colors.redColor,
  whiteColor: colors.primaryColor,
};

export const darkTheme = {
  backgroundColor: colors.secondaryColor,
  fontColor: colors.primaryColor,
  actionColor: colors.actionColor,
  hoverColor: colors.hoverColor,
  boxShadow: '0 0 20px 0 rgba(166,166,166,0.2), 0 5px 5px 0 rgba(166,166,166,0.24)',
  table100: colors.tableDark100,
  table200: colors.tableDark200,
  redColor: colors.redColor,
  whiteColor: colors.primaryColor,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  colors,
};
