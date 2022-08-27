// Vendors
import React, { useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';

// Hooks
import { useAppSelector, useAppDispatch } from '@/hooks/useReactRedux';

// Stores
import { movieStart, movieList, movieDetail, movieFailure } from '@/store/module/movie/movieSlice';
import { dialogOpen } from '@/store/ui/dialog/dialogSlice';

// Components
import CardImg from '@/common/cardimg/CardImg';
import Modal from '@/common/modal/Modal';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.module.movie);
  const dialog = useAppSelector((state) => state.ui.dialog);

  const handlePoster = (value: object) => {
    dispatch(dialogOpen(!dialog.open));
    dispatch(movieDetail(value));
  };

  useEffect(() => {
    dispatch(movieStart());
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_IMDB_API}&s=one piece`);
        dispatch(movieList(res.data.Search));
      } catch (error) {
        dispatch(movieFailure());
      }
    };
    fetchMovies();
  }, []);

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
      <Modal open={dialog.open} onClose={() => dispatch(dialogOpen(!dialog.open))} title={movie.detail.Title}>
        <img alt={movie.detail.Title} src={movie.detail.Poster} style={{ width: '100%' }} />
      </Modal>
    </>
  );
};

export default Home;
