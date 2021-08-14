import { createSlice } from '@reduxjs/toolkit';

const initialState = { grid: [], type: '' };
const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGrid(state, action) {
      state.grid = action.payload;
    },

    setMouseIsPressed(state, action) {
      state.mouseIsPressed = action.payload;
    },

    setType(state, action) {
      state.type = action.payload;
    },
  },
});

export const gridActions = gridSlice.actions;

export default gridSlice.reducer;
