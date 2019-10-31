import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { darken } from 'polished';
import './config/ReactotronConfig';
import { store, persistor } from './store';
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={darken(0.07, '#22202C')}
        />
        <App />
      </PersistGate>
    </Provider>
  );
}
