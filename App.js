/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import moment from 'moment';

import reducer from './src/reducers';

const middlewares = [thunk];

const store = createStore(reducer, applyMiddleware(...middlewares));

import AppNavigator from './src/AppNavigator';

const App: () => React$Node = () => {
  moment.locale('ja', {
    weekdays: [
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日',
    ],
    weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
  });
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  );
};

export default App;
