import { Routes, Route } from 'react-router-dom';

import { Login, TablePage } from './pages';

import { Header, PersistLogin, SecureRoute } from './components';

import { useAuth, useTheme } from './hooks';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles';
import { themes } from './Theme';
import { StyledApp } from './App.styled';

function App() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme === 'light' ? themes.light : themes.dark}>
      <GlobalStyles />
      <StyledApp>
        {user && <Header />}
        <Routes>
          <Route element={<PersistLogin />}>
            <Route element={<SecureRoute />}>
              <Route path='/alljobs' element={<TablePage title='ALL JOBS' />} />
              <Route path='/' element={<TablePage title='LATESTS JOBS' />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
