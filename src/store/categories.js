import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import dayjs from 'dayjs';
import { toggleUpdateCategoryModal } from './interface';

const slice = createSlice({
  name: 'categories',
  initialState: {
    loading: false,
    categories: [],
    categoryBeingEdited: {},
    categoryTotals: []
  },
  reducers: {
    categoriesRequested: (categories, action) => {
      categories.loading = true;
    },

    categoriesRequestFailed: (categories, action) => {
      categories.loading = false;
    },

    categoriesReceived: (categories, action) => {
      categories.loading = false;
      categories.categories = action.payload
    },

    categoryAdded: (categories, action) => {
      categories.categories.push(action.payload);
    },

    categoryDeleted: (categories, action) => {
      categories.categories = categories.categories.filter(category => category._id !== action.payload._id)
    },

    categoryUpdated: (categories, action) => {
      let categoryToUpdate = categories.categories.findIndex(category => category._id === action.payload._id);
      categories.categories[categoryToUpdate] = action.payload;
    },

    categoryEdited: (categories, action) => {
      categories.categoryBeingEdited = action.payload;
    },

    categoryTotalsSet: (categories, action) => {
      categories.categoryTotals = action.payload;
    }
  }
})

const {
  categoriesRequested,
  categoriesRequestFailed,
  categoriesReceived,
  categoryDeleted,
  categoryAdded,
  categoryEdited,
  categoryUpdated
} = slice.actions;
export default slice.reducer;

// COMMANDS
const url = '/categories';

export const editCategory = category =>
  (dispatch) => {
    dispatch(toggleUpdateCategoryModal());
    dispatch(categoryEdited(category));
  }

export const loadCategories = () =>
  (dispatch) => {
    dispatch(
      apiCallBegan({
        url,
        onStart: categoriesRequested.type,
        onSuccess: categoriesReceived.type,
        onError: categoriesRequestFailed.type
      })
    )
  }

export const addCategory = category =>
  (dispatch) => {
    dispatch(
      apiCallBegan({
        url,
        method: 'post',
        data: category,
        onSuccess: categoryAdded.type
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

export const updateCategory = category =>
  apiCallBegan({
    url,
    method: 'put',
    data: category,
    onSuccess: categoryUpdated.type
  })


// SELECTORS

export const getCategories = 
  createSelector(
    state => state.entities.categories,
    categories => categories.categories
  )

export const getCategoryBeingEdited = 
  createSelector(
    state => state.entities.categories,
    categories => categories.categoryBeingEdited
  )

export const getCategoryTotals = 
  createSelector(
    state => state.entities.expenses.list,
    state => state.entities.interface.dateToSummarize,
    (list, date) => list.reduce((currState, listItem) => {
      if (dayjs(listItem.date).format('MMMM YYYY') !== date) {
        return { ...currState };
      }

      if (listItem.category in currState) {
        const total = parseFloat(listItem.amount) + currState[listItem.category];
        return { ...currState, [listItem.category]: total }
      }
      else {
        return { ...currState, [listItem.category]: parseFloat(listItem.amount) };
      }
    }, {})
  )

export const getTotalBudget =
  createSelector(
    state => state.entities.categories.categories,
    categories => categories.reduce((currVal, category) => {
      return currVal += parseFloat(category.budget);
    }, 0)
  )