import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import shadows from '@mui/material/styles/shadows';
import CssBaseline from '@mui/material/CssBaseline';
import WorkspacePage from 'pages/WorkspacePage';
import { SolutionsProvider } from 'context/solutions';

const customTheme = createTheme({
  theme: 'dark',
  shape: {
    borderRadius: 8,
  },
  shadows: shadows.map(() => 'none'),
  palette: {
    mode: 'light',
    primary: {
      main: '#79747E',
    },
    secondary: {
      main: '#FF621B',
    },
    background: {
      default: '#F6F2F2',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <SolutionsProvider>
        <WorkspacePage />
      </SolutionsProvider>
    </ThemeProvider>
  );
};

export default App;
