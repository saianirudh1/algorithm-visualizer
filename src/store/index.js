import { configureStore } from '@reduxjs/toolkit';
import typeReducer from './type';
import algorithmReducer from './algorithm';
import arrayReducer from './array';
import inputReducer from './input';
import gridReducer from './grid';

const store = configureStore({
  reducer: {
    type: typeReducer,
    algorithm: algorithmReducer,
    array: arrayReducer,
    input: inputReducer,
    grid: gridReducer,
  },
});

export default store;
