import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { toggleUpdateCategoryModal } from './interface';

const slice = createSlice({
  name: 'categories',
  initialState: {
    loading: false,
    categories: [],
    categoryBeingEdited: {}
  },
  reducers: {
    categoriesRequested: (categories, action) => {
      categories.categories = action.payload
    },

    categoriesRequestFailed: (categories, action) => {
      categories.categories = action.payload
    },

    categoriesReceived: (categories, action) => {
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