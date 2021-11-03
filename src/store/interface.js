import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
  name: 'interface',
  initialState: {
    currentTab: 0,
    updateModalActive: false,
    addModalActive: false,
    sortMethod: ''
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
    sortMethodChanged: (state) => {
      state.sortMethod = false;
    },
  }
});

const {
  tabChanged,
  addModalOpened,
  addModalClosed,
  updateModalOpened,
  updateModalClosed,
  sortMethodChanged
} = slice.actions;
export default slice.reducer;

// COMMANDS
export const changeTab = currentTab => tabChanged({ currentTab });
export const openAddModal = () => addModalOpened();
export const closeAddModal = () => addModalClosed();
export const openUpdateModal = () => updateModalOpened();
export const closeUpdateModal = () => updateModalClosed();
export const changeSortMethod = () => sortMethodChanged();

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