import { JobsProvider, ThemeProvider, ToastProvider, UserProvider } from '.';

import { combineComponents } from '../utils';

const providers = [ThemeProvider, ToastProvider, UserProvider, JobsProvider];

const AppContextProvider = combineComponents(providers);

export default AppContextProvider;
