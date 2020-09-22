import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import lugger from './lugger'
import reports from './reports'


export default combineReducers({
  alert,
  auth,
  profile,
  lugger,
  reports
});
