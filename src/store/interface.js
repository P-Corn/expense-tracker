import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
  name: 'interface',
  initialState: {
    currentTab: 0,
    openModal: false
  },
  reducers: {
    tabChanged: (state, action) => {
      state.currentTab = action.payload.currentTab
    },
    modalOpened: (state) => {
      state.openModal = true;
    },
    modalClosed: (state) => {
      state.openModal = false;
    },
  }
});

const {
  tabChanged,
  modalOpened,
  modalClosed
} = slice.actions;
export default slice.reducer;

// COMMANDS
export const changeTab = currentTab => tabChanged({ currentTab });
export const openModal = () => modalOpened();
export const closeModal = () => modalClosed();

// SELECTORS
export const getCurrentTab =
  createSelector(
    state => state.entities,
    entities => entities.interface.currentTab
  )