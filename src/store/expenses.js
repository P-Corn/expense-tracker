import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import dayjs from 'dayjs';
import { openUpdateModal } from './interface';

const slice = createSlice({
  name: 'expenses',
  initialState: {
    list: [],
    organizedList: {},
    budget: 0,
    loading: false,
    lastFetch: null,
    dates: [],
    expenseToEdit: {},
    datesByMonth: []
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
      expenses.list = expenses.list.filter(expense => expense._id !== action.payload._id)
    },

    expensesReceived: (expenses, action) => {
      expenses.list = action.payload;
    },

    datesPopulated: (expenses, action) => {
      let dateList = [];
      for (let expense of expenses.list) {
        let formattedDate = dayjs(expense.date).format('MMM D YYYY');
        if (!dateList.includes(formattedDate))
          dateList.push(formattedDate);
      }
      expenses.dates = dateList;
    },

    datesByMonthPopulated: (expenses, action) => {
      let dateList = [];
      for (let expense of expenses.list) {
        let formattedDate = dayjs(expense.date).format('MMM D YYYY');
        if (!dateList.includes(formattedDate))
          dateList.push(formattedDate);
      }
      expenses.dates = dateList;
    },

    expenseEdited: (expenses, action) => {
      expenses.expenseToEdit = action.payload;
    },

    expenseUpdated: (expenses, action) => {
      let expenseToUpdate = expenses.list.findIndex(expense => expense._id === action.payload._id);
      expenses.list[expenseToUpdate] = action.payload;
    },

    expensesOrganized: (expenses, action) => {
      const organizedList = action.payload.reduce((newObj, expense) => {
        const date = expense.date;
        if(date in newObj)
          newObj[date].push(expense);
        else {
          newObj[date] = [];
          newObj[date].push(expense);
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
  expenseDeleted,
  expenseEdited,
  expenseUpdated,
  datesPopulated,
  datesByMonthPopulated
} = slice.actions;
export default slice.reducer;

// COMMANDS
const url = '/expenses';
const dateReducer = (newObj, expense) => {
  const date = expense.date;
  const formattedDate = dayjs(date).format('MMM D YYYY');
  if (formattedDate in newObj) {
    newObj[formattedDate].push({ ...expense, date: formattedDate });
  } else {
    newObj[formattedDate] = [];
    newObj[formattedDate].push({ ...expense, date: formattedDate });
  }
  return newObj;
};

export const populateDates = () => datesPopulated();

export const populateDatesByMonth = () => datesByMonthPopulated();

export const loadExpenses = () =>
  async (dispatch, getState) => {
    await dispatch(
      apiCallBegan({
        url,
        onStart: expensesRequested.type,
        onSuccess: expensesReceived.type,
        onError: expensesRequestFailed.type
      }),
    )
    dispatch(populateDates())
  };

export const addExpense = expense =>
  async (dispatch) => { 
    dispatch(
      apiCallBegan({
        url,
        method: 'post',
        data: expense,
        onSuccess: expenseAdded.type
      })
    )
}

export const deleteExpense = expense =>
  apiCallBegan({
    url,
    method: 'delete',
    data: expense,
    onSuccess: expenseDeleted.type
  })

export const updateExpense = expense =>
  apiCallBegan({
    url,
    method: 'put',
    data: expense,
    onSuccess: expenseUpdated.type
  })

export const editExpense = expense =>
  (dispatch, getState) => {
    dispatch(openUpdateModal());
    dispatch(expenseEdited(expense));
  }

// SELECTORS
export const getExpenses =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.list
  )

export const getExpenseToEdit =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.expenseToEdit
  )

export const getOrganizedExpenses =
  createSelector(
    state => state.entities.expenses.list,
    list => list.reduce(dateReducer, {})
  )

export const getExpenseDates =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.dates
  ) 