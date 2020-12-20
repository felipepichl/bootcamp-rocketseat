import React from 'react';
import { Provider } from 'react-redux';

import GlobalStyles from './styles/global';

import Routes from './routes';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Routes />
    </Provider>
  );
};

export default App;
