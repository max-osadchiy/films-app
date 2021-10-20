import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchSelectedFilm} from '../api';

const selectedFilmSlice = createSlice({
  name: 'selectedFilm',
  initialState: {
    film: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSelectedFilm.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchSelectedFilm.fulfilled, (state, action) => {
      state.film = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSelectedFilm.rejected, state => {
      state.loading = false;
    });
  },
});

export default selectedFilmSlice.reducer;
