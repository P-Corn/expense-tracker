import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
  name: 'interface',
  initialState: {
    currentTab: 2
  },
  reducers: {
    tabChanged: (state, action) => {
      state.currentTab = action.payload.currentTab
    },
  }
});

const {
  tabChanged
} = slice.actions;
export default slice.reducer;

// COMMANDS
export const changeTab = currentTab => tabChanged({ currentTab });

// SELECTORS
export const getCurrentTab =
  createSelector(
    state => state.entities,
    entities => entities.interface.currentTab
  )