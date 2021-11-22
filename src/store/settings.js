import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import dayjs from 'dayjs';
import expenses from './expenses';
import { toggleUpdateCategoryModal } from './interface';

const slice = createSlice({
  name: 'settings',
  initialState: {
    loading: false,
    categories: [],
    categoryBeingEdited: {}
  },
  reducers: {
    categoriesRequested: (settings, action) => {
      settings.categories = action.payload
    },

    categoriesRequestFailed: (settings, action) => {
      settings.categories = action.payload
    },

    categoriesReceived: (settings, action) => {
      settings.categories = action.payload
    },

    categoryAdded: (settings, action) => {
      settings.categories.push(action.payload);
    },

    categoryDeleted: (settings, action) => {
      settings.categories = settings.categories.filter(category => category._id !== action.payload._id)
    },

    categoryUpdated: (settings, action) => {
      let categoryToUpdate = settings.categories.findIndex(category => category._id === action.payload._id);
      settings.categories[categoryToUpdate] = action.payload;
    },

    categoryEdited: (settings, action) => {
      settings.categoryBeingEdited = action.payload;
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
    state => state.entities.settings,
    settings => settings.categories
  )

export const getCategoryBeingEdited = 
  createSelector(
    state => state.entities.settings,
    settings => settings.categoryBeingEdited
  )