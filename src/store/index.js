import { configureStore } from '@reduxjs/toolkit';
import typeReducer from './type';
import algorithmReducer from './algorithm';
import arrayReducer from './array';

const store = configureStore({
  reducer: {
    type: typeReducer,
    algorithm: algorithmReducer,
    array: arrayReducer,
  },
});

export default store;
