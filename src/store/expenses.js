import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'expenses',
  initialState: {
    list: [],
    organizedList: {},
    budget: 0,
    loading: false,
    lastFetch: null
  },
  reducers: {
    expensesRequested: (expenses) => {
      expenses.loading = true;
    },

    expensesRequestFailed: (expenses) => {
      expenses.loading = false;
    },

    expenseAdded: (expenses, action) => {
      expenses.list.push(action.payload);
    },

    expenseDeleted: (expenses, action) => {
      const expenseToDelete = expenses.find(expense => expense._id === action.payload._id);
      console.log(expenseToDelete);
    },

    expensesReceived: (expenses, action) => {
      expenses.list = action.payload;
    },

    expensesOrganized: (expenses, action) => {
      const organizedList = action.payload.reduce((newObj, expense) => {
        const date = expense.date;
        if(date in newObj)
          newObj[date].push(expense);
        else {
          newObj[date] = [];
          newObj[date].push(expense)
        }
        return newObj;
      }, {});
      expenses.organizedList = {...organizedList};
      expenses.loading = false;
    }
  }
});

const {
  expenseAdded,
  expensesRequested,
  expensesRequestFailed,
  expensesReceived,
  expenseDeleted
} = slice.actions;
export default slice.reducer;

// COMMANDS
const url = '/expenses';

export const loadExpenses = () =>
  (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        url,
        onStart: expensesRequested.type,
        onSuccess: expensesReceived.type,
        onError: expensesRequestFailed.type
      })
    )
  };

export const addExpense = expense => 
  apiCallBegan({
    url,
    method: 'post',
    data: expense,
    onSuccess: expenseAdded.type
  })

export const deleteExpense = expense =>
  apiCallBegan({
    url,
    method: 'delete',
    data: expense,
    onScucess: expenseDeleted.type
  })

// SELECTORS
export const getExpenses =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.list
  )