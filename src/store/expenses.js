import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
  name: 'expenses',
  initialState: {
    list: [
      {
        amount: 52,
        title: 'title1',
        description: 'description1',
        category: 'cat1',
        date: '1/1/1111'
      },
      {
        amount: 53,
        title: 'title2',
        description: 'description1',
        category: 'cat1',
        date: '1/1/1111'
      },
      {
        amount: 54,
        title: 'title3',
        description: 'description1',
        category: 'cat1',
        date: '2/2/2222'
      }
    ],
    organizedList: {},
    budget: 0,
    loading: false,
    lastFetch: null
  },
  reducers: {
    expenseAdded: (expenses, action) => {
      expenses.list.push(action.payload);
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
      }, {})
      expenses.organizedList = {...organizedList}
    }
  }
});

const {
  expenseAdded,
  expensesOrganized 
} = slice.actions;
export default slice.reducer;

// COMMANDS
export const addExpense = expense => expenseAdded({ ...expense });

export const organizeExpenses = expenseList => expensesOrganized(expenseList);

// SELECTORS
export const loadExpenses =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.organizedList
  )