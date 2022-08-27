import { createSlice } from '@reduxjs/toolkit';

export interface MovieState {
  list: any;
  detail: any;
  loading: boolean;
  loadingScroll: boolean;
  error: boolean;
  search: string;
}

const initialState: MovieState = {
  list: [],
  detail: null,
  loading: false,
  loadingScroll: false,
  error: false,
  search: 'one piece',
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
    movieSearch: (state, action) => {
      state.search = action.payload;
    },
    movieReset: () => initialState,
  },
});

export const {
  movieLoading,
  movieLoadingScroll,
  movieList,
  movieDetail,
  movieFailure,
  movieReset,
  movieSearch,
} = movieSlice.actions;

export default movieSlice.reducer;
