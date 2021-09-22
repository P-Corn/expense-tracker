import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
  name: 'expenses',
  initialState: {
    list: [],
    budget: 0,
    loading: false,
    lastFetch: null
  },
  reducers: {
    expenseAdded: (expenses, action) => {
      expenses.list.push(action.payload);
    },
  }
});

const {
  expenseAdded
} = slice.actions;
export default slice.reducer;

// COMMANDS
export const addExpense = expense =>
  expenseAdded({ ...expense });

// SELECTORS
export const loadExpenses =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.list
  )