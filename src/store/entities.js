import { combineReducers } from "redux";
import interfaceReducer from './interface';
import expensesReducer from './expenses';
import categoriesReducer from './categories';

export default combineReducers({
  interface: interfaceReducer,
  expenses: expensesReducer,
  categories: categoriesReducer
});