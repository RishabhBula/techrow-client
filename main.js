import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux'
import store from './reduxStore/reduxConfig'
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('app'));