import { createSlice } from '@reduxjs/toolkit';

const initialState = { visualize: true, generate: false, control: false };
const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setVisualize(state, action) {
      state.visualize = action.payload;
    },

    setGenerate(state, action) {
      state.generate = action.payload;
    },

    setControl(state, action) {
      state.control = action.payload;
    },
  },
});

export const inputActions = inputSlice.actions;
export default inputSlice.reducer;
