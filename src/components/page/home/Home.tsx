// Vendors
import React, { useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';

// Hooks
import { useAppSelector, useAppDispatch } from '@/hooks/useReactRedux';

// Stores
import { movieStart, movieSuccess, movieFailure } from '@/store/module/movie/movieSlice';

// Components
import CardImg from '@/common/cardimg/CardImg';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.module.movie.list);

  useEffect(() => {
    dispatch(movieStart());
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_IMDB_API}&s=one piece&page=1`);
        dispatch(movieSuccess(res.data.Search));
      } catch (error) {
        dispatch(movieFailure());
      }
    };
    fetchMovies();
  }, []);

  return (
    <Grid container spacing={3}>
      {movies.map(({ Title, Poster, imdbID }) => (
        <Grid item xs={3} key={imdbID}>
          <CardImg title={Title} src={Poster} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
