import { combineReducers } from 'redux'
import app from './app';
import authentication from './authentication';
import signupdetails from './signupDetails';
import orderdetails from './orderDetails';
import headjackreducer from './HeadjackReducer';

import userData from './userData';
import classMode from './classMode';
const allReducers = combineReducers({
	app: app,
	auth:authentication,
	signupdetails:signupdetails,
	orderdetails:orderdetails,
	headjackreducer:headjackreducer,
	userData:userData,
	classMode:classMode
});

export default allReducers