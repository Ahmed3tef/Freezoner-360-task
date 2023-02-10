import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { deleteWithToast, getDataWithParams, postDataWithToast } from './loadData';

const initialState = {
  references: [],
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadReferences = createAsyncThunk(
  'references/loadReferences',
  (data, thunkAPI) => getDataWithParams(thunkAPI, `categories/${data.categoryId}/references`)
);

export const deleteReferences = createAsyncThunk(
  'references/deleteReferences',
  (data, thunkAPI) => deleteWithToast(thunkAPI, `references/one/${data.id}`)
);

export const createReference = createAsyncThunk(
  'references/deleteReferences',
  (data, thunkAPI) => postDataWithToast(thunkAPI, `references/create`,data.params, data.data)
);



export const referencesSlice = createSlice({
  name: 'references',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadReferences.pending, (state, action) => {
        state.references = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadReferences.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status !== 'success') {
            state.references = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.references = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadReferences.rejected, (state, action) => {
        state.isLoading = false;
        state.references = null;
        state.error = action.payload;
      });
  },
});

export const getReferences = state => state.references;

export default referencesSlice.reducer;
