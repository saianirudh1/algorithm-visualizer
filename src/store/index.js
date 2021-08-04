import { configureStore } from '@reduxjs/toolkit';
import typeReducer from './type';
import algorithmReducer from './algorithm';

const store = configureStore({
  reducer: { type: typeReducer, algorithm: algorithmReducer },
});

export default store;
