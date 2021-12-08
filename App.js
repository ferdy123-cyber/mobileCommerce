import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import RoutePage from './components/routePage';

const App = () => {
  return (
    <Provider store={store}>
      <RoutePage />
    </Provider>
  );
};

export default App;
