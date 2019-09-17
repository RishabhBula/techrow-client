import { combineReducers } from 'redux'
import app from './app';
import authentication from './authentication';
import signupdetails from './signupDetails';
import orderdetails from './orderDetails';
import headjackreducer from './HeadjackReducer';
const allReducers = combineReducers({
	app: app,
	auth:authentication,
	signupdetails:signupdetails,
	orderdetails:orderdetails,
	headjackreducer:headjackreducer
});

export default allReducers