import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import dayjs from 'dayjs';

const slice = createSlice({
  name: 'interface',
  initialState: {
    currentTab: '',
    updateExpenseModalActive: false,
    addExpenseModalActive: false,
    addCategoryModalActive: false,
    updateCategoryModalActive: false,
    sortMethod: 'Recent',
    dateToSummarize: dayjs().format('MMMM YYYY')
  },
  reducers: {
    tabChanged: (state, action) => { state.currentTab = action.payload.currentTab },

    addExpenseModalToggled: (state) => { state.addExpenseModalActive = !state.addExpenseModalActive; },

    updateExpenseModalToggled: (state) => { state.updateExpenseModalActive = !state.updateExpenseModalActive; },

    addCategoryModalToggled: (state) => { state.addCategoryModalActive = !state.addCategoryModalActive; },

    updateCategoryModalToggled: (state) => { state.updateCategoryModalActive = !state.updateCategoryModalActive; },
    
    dateToSummarizeUpdated: (state, action) => { state.dateToSummarize = action.payload; },

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
  dateToSummarizeUpdated
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