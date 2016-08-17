import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';

import Connect4 from './components/app';
import reducers from './reducers';

let store = createStore(reducers);
// bot can be passed true(to play against computer) or false to play against another player
// by default bot is always true if not passed
// use <Connect4 bot=false /> in place of <Connect4/> for playing against another player
ReactDOM.render(
  <Provider store={store}>
    <Connect4/>
  </Provider>
  , document.querySelector('.container'));
