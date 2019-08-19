import {createStore, applyMiddleware} from 'redux';
import allReducers from '../reducers';

import thunk from 'redux-thunk';
import promise from 'redux-promise';

const store = createStore(
   allReducers,
   applyMiddleware(thunk, promise)
);
export default  store