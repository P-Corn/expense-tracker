import { combineReducers } from "redux";
import interfaceReducer from './interface';
import expensesReducer from './expenses';

export default combineReducers({
  interface: interfaceReducer,
  expenses: expensesReducer
});