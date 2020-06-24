import _ from 'lodash';
import { ActionTypes as types } from '../configs';

export default function registerProperty(state, action) {
  state = state || {
    phoneNumber: ''
  };

  switch (action.type) {
    case types.SET_PHONE_NUMBER:
      state = _.assign({}, state, {
        phoneNumber: action.phoneNumber
      });
      return state;
    default:
      return state;
  }
}
