import { createSlice } from '@reduxjs/toolkit';

export interface MovieState {
  list: any[];
  detail: any;
  loading: boolean;
  loadingScroll: boolean;
  error: boolean;
}

const initialState: MovieState = {
  list: [],
  detail: null,
  loading: false,
  loadingScroll: false,
  error: false,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    movieLoading: (state, action) => {
      state.loading = action.payload;
    },
    movieLoadingScroll: (state, action) => {
      state.loadingScroll = action.payload;
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
    movieReset: () => initialState,
  },
});

export const { movieLoading, movieLoadingScroll, movieList, movieDetail, movieFailure, movieReset } =
  movieSlice.actions;

export default movieSlice.reducer;
