import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getDataWithParams, postDataWithToast } from './loadData';

const initialState = {
  category: {},
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadCategory = createAsyncThunk(
  'category/loadCategory',
  (data, thunkAPI) => getDataWithParams(thunkAPI, `categories/one/${data.id}`)
);

export const createSuggestionCategory = createAsyncThunk(
  'category/createSuggestionCategory',
  (data, thunkAPI) => postDataWithToast(thunkAPI, `suggestions/create`, data.params, data.data)
);




export const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadCategory.pending, (state, action) => {
        state.category = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCategory.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status !== 'success') {
            state.category = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.category = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.category = null;
        state.error = action.payload;
      });
  },
});

export const getCategory = state => state.category;

export default categorySlice.reducer;
