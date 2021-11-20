import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import dayjs from 'dayjs';

const slice = createSlice({
  name: 'settings',
  initialState: {
    loading: false,
    categories: []
  },
  reducers: {
    categoriesRequested: (settings, action) => {
      categories = action.payload
    },

    categoriesRequestFailed: (settings, action) => {
      categories = action.payload
    },

    categoriesReceived: (settings, action) => {
      categories = action.payload
    },

    categoryDeleted: (settings, action) => {
      settings.categories = expenses.list.filter(expense => expense._id !== action.payload._id)
    }
  }
})

const {
  categoriesRequested,
  categoriesRequestFailed,
  categoriesReceived,
  categoryDeleted
} = slice.actions;
export default slice.reducer;

// COMMANDS
const url = '/categories';

export const loadCategories = () =>
  (dispatch) => {
    dispatch(
      apiCallBegan({
        url,
        onStart: categoriesRequested,
        onSuccess: categoriesReceived.type,
        onError: categoriesRequestFailed
      })
    )
  }

export const deleteCategory = category =>
  apiCallBegan({
    url,
    method: 'delete',
    data: category,
    onSuccess: categoryDeleted.type
  })
