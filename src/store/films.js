import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchFilms} from '../api';

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFilms.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = [...(state.films || []), ...action.payload.results];
      state.loading = false;
    });
    builder.addCase(fetchFilms.rejected, state => {
      state.loading = false;
    });
  },
});

export default filmsSlice.reducer;
