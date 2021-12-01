import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import dayjs from 'dayjs';

const slice = createSlice({
  name: 'interface',
  initialState: {
    currentTab: 0,
    updateExpenseModalActive: false,
    addExpenseModalActive: false,
    addCategoryModalActive: false,
    updateCategoryModalActive: false,
    sortMethod: 'Recent',
    dateToSummarize: dayjs().format('MMMM YYYY'),
    viewWidth: window.innerWidth,
    viewHeight: window.innerHeight
  },
  reducers: {
    tabChanged: (state, action) => { state.currentTab = action.payload.currentTab },

    addExpenseModalToggled: (state) => { state.addExpenseModalActive = !state.addExpenseModalActive; },

    updateExpenseModalToggled: (state) => { state.updateExpenseModalActive = !state.updateExpenseModalActive; },

    addCategoryModalToggled: (state) => { state.addCategoryModalActive = !state.addCategoryModalActive; },

    updateCategoryModalToggled: (state) => { state.updateCategoryModalActive = !state.updateCategoryModalActive; },
    
    dateToSummarizeUpdated: (state, action) => { state.dateToSummarize = action.payload; },

    viewWidthUpdated: (state, action) => { state.viewWidth = action.payload; },

    viewHeightUpdated: (state, action) => { state.viewHeight = action.payload; },

    sortMethodChanged: (state, action) => {
      state.sortMethod = action.payload;
      if (state.sortMonth) state.sortMonth = '';
    },
  }
});

const {
  tabChanged,
  addExpenseModalToggled,
  updateExpenseModalToggled,
  addCategoryModalToggled,
  updateCategoryModalToggled,
  sortMethodChanged,
  dateToSummarizeUpdated,
  viewWidthUpdated,
  viewHeightUpdated
} = slice.actions;
export default slice.reducer;

// COMMANDS
export const changeTab = currentTab => tabChanged({ currentTab });
export const toggleAddExpenseModal = () => addExpenseModalToggled();
export const toggleUpdateExpenseModal = () => updateExpenseModalToggled();
export const toggleAddCategoryModal = () => addCategoryModalToggled();
export const toggleUpdateCategoryModal = () => updateCategoryModalToggled();
export const setSortMethod = sortMethod => sortMethodChanged(sortMethod);
export const setDateToSummarize = date => dateToSummarizeUpdated(date);
export const setViewWidth = size => viewWidthUpdated(size);
export const setViewHeight = size => viewHeightUpdated(size);

// SELECTORS
export const getCurrentTab =
  createSelector(
    state => state.entities,
    entities => entities.interface.currentTab
  )

export const getSortMethod =
  createSelector(
    state => state.entities,
    entities => entities.interface.sortMethod
  )

export const getDateToSummarize =
  createSelector(
    state => state.entities,
    entities => entities.interface.dateToSummarize
  )

export const getViewWidth =
  createSelector(
    state => state.entities,
    entities => entities.interface.viewWidth
  )

export const getViewHeight =
  createSelector(
    state => state.entities,
    entities => entities.interface.viewHeight
  )