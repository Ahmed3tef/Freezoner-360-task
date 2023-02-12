import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { deleteWithToast, getDataWithParams, postDataWithToast } from './loadData';

const initialState = {
  reference:{},
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadReference = createAsyncThunk(
  'reference/loadReference',
  (data, thunkAPI) => getDataWithParams(thunkAPI, `categories/${data.categoryId}/reference`)
);




export const referenceSlice = createSlice({
  name: 'reference',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadReference.pending, (state, action) => {
        state.reference = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadReference.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status !== 'success') {
            state.reference = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.reference = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadReference.rejected, (state, action) => {
        state.isLoading = false;
        state.reference = null;
        state.error = action.payload;
      });
   
  },
});

export const getReference = state => state.reference;

export default referenceSlice.reducer;
