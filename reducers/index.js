import { combineReducers } from 'redux'
import app from './app';
import authentication from './authentication';
import signupdetails from './signupDetails';
const allReducers = combineReducers({
	app: app,
	auth:authentication,
	signupdetails:signupdetails
});

export default allReducers