import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '0', name: 'Select An Algorithm' };
const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState,
  reducers: {
    setAlgorithm(state, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.time = action.payload.time;
    },

    resetAlgorithm(state) {
      state.name = initialState.name;
      state.id = initialState.id;
      state.time = initialState.time;
    },
  },
});

export const algorithmActions = algorithmSlice.actions;
export default algorithmSlice.reducer;
