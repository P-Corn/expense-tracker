import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
  name: 'expenses',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    expenseAdded: (expenses, action) => {
      expenses.list.push(action.payload);
    },
  }
});

const {
  tabChanged
} = slice.actions;
export default slice.reducer;

// COMMANDS
// export const changeTab = currentTab => tabChanged({ currentTab });

// SELECTORS
// export const getCurrentTab =
//   createSelector(
//     state => state.entities,
//     entities => entities.interface.currentTab
//   )