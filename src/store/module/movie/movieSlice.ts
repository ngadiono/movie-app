import { createSlice } from '@reduxjs/toolkit';

export interface MovieState {
  list: [];
  loading: boolean;
  error: boolean;
}

const initialState: MovieState = {
  list: [],
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
    movieSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    movieFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { movieStart, movieSuccess, movieFailure } = movieSlice.actions;

export default movieSlice.reducer;
