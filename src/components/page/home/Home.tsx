// Vendors
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Hooks
import { useAppSelector, useAppDispatch } from '@/hooks/useReactRedux';

// Stores
import {
  movieLoading,
  movieLoadingScroll,
  movieList,
  movieDetail,
  movieFailure,
} from '@/store/module/movie/movieSlice';
import { dialogOpen } from '@/store/ui/dialog/dialogSlice';

// Components
import CardImg from '@/common/cardimg/CardImg';
import Modal from '@/common/modal/Modal';
import Loading from '@/common/loading/Loading';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.module.movie);
  const dialog = useAppSelector((state) => state.ui.dialog);
  const loading = useAppSelector((state) => state.module.movie.loading);
  const loadingScroll = useAppSelector((state) => state.module.movie.loadingScroll);

  const [page, setPage] = useState<number>(1);
  const [noData, setNoData] = useState<boolean>(false);

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        if (!noData) {
          fetchMovies(page);
        }
      }
    };
  }

  const handlePoster = (value: object) => {
    dispatch(dialogOpen(!dialog.open));
    dispatch(movieDetail(value));
  };

  const fetchMovies = async (value: number) => {
    if (page === 1) {
      dispatch(movieLoading(true));
    } else {
      dispatch(movieLoadingScroll(true));
    }
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_IMDB_API}&s=one piece&page=${value}`);
      if (value === 1) {
        dispatch(movieList(res.data.Search));
        setPage(page + 1);
      } else {
        const newMovieList = movie.list.concat(res.data.Search);
        dispatch(movieList(newMovieList));
        setPage(page + 1);
        if (res.data.length === 0) setNoData(true);
      }
    } catch (error) {
      dispatch(movieFailure());
    } finally {
      dispatch(movieLoading(false));
      dispatch(movieLoadingScroll(false));
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Grid container spacing={3}>
        {movie.list.map(({ Title, Poster, imdbID }) => (
          <Grid item xs={3} key={imdbID}>
            <CardImg
              title={Title}
              src={Poster}
              id={imdbID}
              showPoster={() => handlePoster({ Title, Poster })}
            />
          </Grid>
        ))}
      </Grid>
      {loadingScroll ? <Box sx={{ textAlign: 'center' }}>loading data ...</Box> : ''}
      {noData ? <Box sx={{ textAlign: 'center' }}>no data anymore ...</Box> : ''}
      <Modal
        open={dialog.open}
        onClose={() => dispatch(dialogOpen(!dialog.open))}
        title={movie.detail?.Title}
      >
        <img alt={movie.detail?.Title} src={movie.detail?.Poster} style={{ width: '100%' }} />
      </Modal>
    </>
  );
};

export default Home;
