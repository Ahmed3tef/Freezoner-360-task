import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {  getDataWithParams } from './loadData';

const initialState = {
  suggestion:{},
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadSuggestion = createAsyncThunk(
  'suggestion/loadSuggestion',
  (data, thunkAPI) => getDataWithParams(thunkAPI, `suggestions/${data.id}`, data.params)
);




export const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadSuggestion.pending, (state, action) => {
        state.suggestion = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSuggestion.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status !== 'success') {
            state.suggestion = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.suggestion = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadSuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.suggestion = null;
        state.error = action.payload;
      });
   
  },
});

export const getSuggestion = state => state.suggestion;

export default suggestionSlice.reducer;
