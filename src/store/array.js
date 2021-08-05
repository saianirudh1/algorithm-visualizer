import { createSlice } from '@reduxjs/toolkit';

const arraySlice = createSlice({
  name: 'array',
  initialState: { arr: [] },
  reducers: {
    setArray(state, action) {
      state.arr = action.payload;
    },
  },
});

export const arrayActions = arraySlice.actions;

export default arraySlice.reducer;
