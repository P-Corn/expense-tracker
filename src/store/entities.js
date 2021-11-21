import { combineReducers } from "redux";
import interfaceReducer from './interface';
import expensesReducer from './expenses';
import settingsReducer from './settings';

export default combineReducers({
  interface: interfaceReducer,
  expenses: expensesReducer,
  settings: settingsReducer
});