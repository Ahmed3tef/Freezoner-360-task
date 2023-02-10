import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getDataWithParams } from './loadData';

const initialState = {
  categories: [],
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  ( thunkAPI) => getDataWithParams(thunkAPI, `categories`)
);

// one cat:{
//   "id": 31,
//   "name": {
//       "en": "Irving O'Hara",
//       "ar": "Mrs. Hope Bins II",
//       "fr": "fr_name"
//   },
//   "photo": "http://192.168.1.25:7000/sub-categories-lg/large-image.png",
//   "tags": "",
//   "photoAlt": ""
// },

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadCategories.pending, (state, action) => {
        state.categories = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status !== 'success') {
            state.categories = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.categories = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categories = null;
        state.error = action.payload;
      });
  },
});

export const getCategories = state => state.categories;

export default categoriesSlice.reducer;
