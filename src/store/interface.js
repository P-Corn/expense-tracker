import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
  name: 'interface',
  initialState: {
    currentTab: 0,
    updateModalActive: false,
    addModalActive: false,
    sortMethod: 'Recent',
    sortMonth: ''
  },
  reducers: {
    tabChanged: (state, action) => {
      state.currentTab = action.payload.currentTab
    },
    addModalOpened: (state) => {
      state.addModalActive = true;
    },
    addModalClosed: (state) => {
      state.addModalActive = false;
    },
    updateModalOpened: (state) => {
      state.updateModalActive = true;
    },
    updateModalClosed: (state) => {
      state.updateModalActive = false;
    },
    sortMethodChanged: (state, action) => {
      state.sortMethod = action.payload;
      if (state.sortMonth) state.sorthMonth = '';
    },
    sortMonthChanged: (state, action) => {
      state.sortMonth = action.payload;
    },
  }
});

const {
  tabChanged,
  addModalOpened,
  addModalClosed,
  updateModalOpened,
  updateModalClosed,
  sortMethodChanged,
  sortMonthChanged

} = slice.actions;
export default slice.reducer;

// COMMANDS
export const changeTab = currentTab => tabChanged({ currentTab });
export const openAddModal = () => addModalOpened();
export const closeAddModal = () => addModalClosed();
export const openUpdateModal = () => updateModalOpened();
export const closeUpdateModal = () => updateModalClosed();
export const setSortMethod = sortMethod => sortMethodChanged(sortMethod);
export const setSortMonth = month => sortMonthChanged(month);

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

export const getSortMonth =
  createSelector(
    state => state.entities,
    entities => entities.interface.sortMonth
  )