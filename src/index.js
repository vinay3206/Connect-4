import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';

import App from './components/app';
import reducers from './reducers';

let store = createStore(reducers);
// bot can be passed true(to play against computer) or false to play against another player
// by default bot is always true if not passed
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.querySelector('.container'));
