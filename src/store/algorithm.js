import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '0', name: 'Convergent Swarm Algorithm' };
const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState,
  reducers: {
    setAlgorithm(state, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },

    resetAlgorithm(state) {
      state.name = initialState.name;
      state.id = initialState.id;
    },
  },
});

export const algorithmActions = algorithmSlice.actions;
export default algorithmSlice.reducer;
