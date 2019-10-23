import { combineReducers } from 'redux'
import app from './app';
import authentication from './authentication';
import signupdetails from './signupDetails';
import orderdetails from './orderDetails';
import headjackreducer from './HeadjackReducer';

import userData from './userData';
import classMode from './classMode';
import myLibrary from './myLibrary';
import marketContent from './marketContent';
import marketFeature from './marketFeature';
import marketSearch from './marketSearch';
import marketDetails from './marketDetails';
import marketSearchquery from './marketSearchquery';
import myLibraryquery from './myLibraryquery';
import theaterData from './theaterData';
import individualData from './individualData';
import selectedDevices from './selectedDevices';
const allReducers = combineReducers({
	app: app,
	auth:authentication,
	signupdetails:signupdetails,
	orderdetails:orderdetails,
	headjackreducer:headjackreducer,
	userData:userData,
	classMode:classMode,
	myLibrary:myLibrary,
	marketContent:marketContent,
	marketFeature:marketFeature,
	marketSearch:marketSearch,
	marketDetails:marketDetails,
	marketSearchquery:marketSearchquery,
	myLibraryquery:myLibraryquery,
	theaterData:theaterData,
	individualData:individualData,
	selectedDevices:selectedDevices
});

export default allReducers