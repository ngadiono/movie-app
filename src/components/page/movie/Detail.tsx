// Vendors
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Typography from '@mui/material/Typography';

// Hooks
import { useAppSelector, useAppDispatch } from '@/hooks/useReactRedux';

// Stores
import { movieStart, movieDetail, movieFailure } from '@/store/module/movie/movieSlice';

// Styles
import { Desc } from './Detail.style';

const Detail: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.module.movie.detail);

  useEffect(() => {
    dispatch(movieStart());
    const fetchMovies = async () => {
      if (!router.isReady) return;
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_IMDB_API}&i=${router.query.slug}`);
        if (res.data.Response === 'True') {
          dispatch(movieDetail(res.data));
        } else {
          router.push('/404');
        }
      } catch (error) {
        dispatch(movieFailure());
      }
    };
    fetchMovies();
  }, [router.isReady]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4}>
        <img alt={movie.Title} src={movie.Poster} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Typography variant="h4" gutterBottom>
          {movie.Title}
        </Typography>
        <Desc>
          <Typography variant="h6">Country</Typography>
          <Typography variant="h6">{movie.Country}</Typography>
        </Desc>
        <Desc>
          <Typography variant="h6">Actors</Typography>
          <Typography variant="h6">{movie.Actors}</Typography>
        </Desc>
        <Desc>
          <Typography variant="h6">Director</Typography>
          <Typography variant="h6">{movie.Director}</Typography>
        </Desc>
        <Desc>
          <Typography variant="h6">Genre</Typography>
          <Typography variant="h6">{movie.Genre}</Typography>
        </Desc>
        <Desc>
          <Typography variant="h6">IMDb Rating</Typography>
          <Typography variant="h6">{movie.imdbRating}</Typography>
        </Desc>
        <Desc>
          <Typography variant="h6">Released</Typography>
          <Typography variant="h6">{movie.Released}</Typography>
        </Desc>
      </Grid>
    </Grid>
  );
};

export default Detail;
