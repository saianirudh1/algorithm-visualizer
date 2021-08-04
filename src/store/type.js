import { createSlice } from '@reduxjs/toolkit';

const initialState = { algoType: 'sort' };
const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setType(state, action) {
      state.algoType = action.payload;
    },
  },
});

export const typeActions = typeSlice.actions;

export default typeSlice.reducer;
