import { configureStore } from '@reduxjs/toolkit';
import {
  categories,
  references,
  reference,
  category,
  suggestion
} from './reducers';

export const store = configureStore({
  reducer: {
    categories,
    references,
    reference,
    category,
    suggestion
  },
});
