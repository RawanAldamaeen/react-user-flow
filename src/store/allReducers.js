import { combineReducers } from 'redux';

import User from './userReducer';

const rootReducer = combineReducers({
  user: User
});


export default rootReducer;