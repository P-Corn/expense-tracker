import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
  name: 'interface',
  initialState: {
    currentTab: '',
    updateExpenseModalActive: false,
    addExpenseModalActive: false,
    addCategoryModalActive: false,
    sortMethod: 'Recent',

  },
  reducers: {
    tabChanged: (state, action) => { state.currentTab = action.payload.currentTab },

    addExpenseModalToggled: (state) => { state.addExpenseModalActive = !state.addExpenseModalActive; },

    updateExpenseModalToggled: (state) => { state.updateExpenseModalActive = !state.updateExpenseModalActive; },

    addCategoryModalToggled: (state) => { state.addCategoryModalActive = !state.addCategoryModalActive; },

    // updateCategoryModalToggled: (state) => { state.updateExpenseModalActive = !state.updateExpenseModalActive; },

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
  sortMethodChanged
} = slice.actions;
export default slice.reducer;

// COMMANDS
export const changeTab = currentTab => tabChanged({ currentTab });
export const toggleAddExpenseModal = () => addExpenseModalToggled();
export const toggleUpdateExpenseModal = () => updateExpenseModalToggled();
export const toggleAddCategoryModal = () => addCategoryModalToggled();
export const setSortMethod = sortMethod => sortMethodChanged(sortMethod);

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