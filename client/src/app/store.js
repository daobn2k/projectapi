import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '../features/product/productSlice'
const rootReducers = {
  // products: productReducer
}

export const store = configureStore({
  reducer: rootReducers,  
});
