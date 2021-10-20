import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async countPage => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=ae50cc82723b4414ee5c7ba6c4c48781&language=en-US&page=${countPage}`,
    );
    return response.json();
  },
);

export const fetchSelectedFilm = createAsyncThunk(
  'selectedFilm/fetchSelectedFilm',
  async itemId => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${itemId}?api_key=ae50cc82723b4414ee5c7ba6c4c48781&language=en-US`,
    );
    return response.json();
  },
);
