import { combineReducers } from 'redux';
import registeruser from './RegisterUser';

const appReducer = combineReducers({
  registeruser
});

const rootReducer = (state, action) =>
  //   if (action.type === types.LOGOUT) {
  //     state = undefined;
  //   }
  appReducer(state, action);
export default rootReducer;
