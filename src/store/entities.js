import { combineReducers } from "redux";
import interfaceReducer from './interface';

export default combineReducers({
  interface: interfaceReducer
});