import { configureStore } from '@reduxjs/toolkit';
import {

  categories,
  references,
  category
} from './reducers';

export const store = configureStore({
  reducer: {
    categories,
    references,
    category
  },
});
