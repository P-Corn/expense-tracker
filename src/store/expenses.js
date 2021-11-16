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
    expensesByMonth: [],
    datesByMonth: [],
    sortMonth: ''
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

    datesPopulated: (expenses) => {
      let dateList = [];
      for (let expense of expenses.list) {
        let formattedDate = dayjs(expense.date).format('MMM D YYYY');
        if (!dateList.includes(formattedDate))
          dateList.push(formattedDate);
      }
      expenses.dates = dateList;
    },

    datesByMonthPopulated: (expenses) => {
      let dateList = [];
      for (let expense of expenses.expensesByMonth) {
        if (!dateList.includes(expense.date))
          dateList.push(expense.date);
      }
      expenses.datesByMonth = dateList;
    },

    expensesByMonthPopulated: (expenses, action) => {
      expenses.expensesByMonth = action.payload;
      console.log(expenses.expensesByMonth)
    },

    expenseEdited: (expenses, action) => {
      expenses.expenseToEdit = action.payload;
    },

    expenseUpdated: (expenses, action) => {
      let expenseToUpdate = expenses.list.findIndex(expense => expense._id === action.payload._id);
      expenses.list[expenseToUpdate] = action.payload;
    },

    sortMonthChanged: (state, action) => {
      state.sortMonth = action.payload;
    },
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
  expensesByMonthPopulated,
  datesByMonthPopulated,
  sortMonthChanged
} = slice.actions;
export default slice.reducer;

// COMMANDS
const url = '/expenses';

export const populateDates = () => datesPopulated();

export const populateExpensesByMonth = (month) =>
  async (dispatch, getState) => {
    const expenses = getState().entities.expenses.list;
    const expensesByMonth = expenses.filter(expense => dayjs(expense.date).format('MMMM YYYY') === month);
    await dispatch(expensesByMonthPopulated(expensesByMonth));
    dispatch(datesByMonthPopulated());
  }

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

export const setSortMonth = month => sortMonthChanged(month);

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

export const getDates =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.dates
  ) 

export const getDatesByMonth =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.datesByMonth
  )   

export const getExpensesByMonth =
  createSelector(
    state => state.entities.expenses,
    expenses => expenses.expensesByMonth
  )

export const getSortMonth =
  createSelector(
    state => state.entities,
    entities => entities.expenses.sortMonth
  )