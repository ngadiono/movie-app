import { createSlice } from '@reduxjs/toolkit';

export interface MovieState {
  list: any[];
  detail: any;
  loading: boolean;
  error: boolean;
}

const initialState: MovieState = {
  list: [],
  detail: {},
  loading: false,
  error: false,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    movieStart: (state) => {
      state.loading = true;
    },
    movieList: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    movieDetail: (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    },
    movieFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { movieStart, movieList, movieDetail, movieFailure } = movieSlice.actions;

export default movieSlice.reducer;
