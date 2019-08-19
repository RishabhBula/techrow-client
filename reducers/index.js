import { combineReducers } from 'redux'
import app from './app';
import authentication from './authentication';
const allReducers = combineReducers({
	app: app,
	auth:authentication,
});

export default allReducers