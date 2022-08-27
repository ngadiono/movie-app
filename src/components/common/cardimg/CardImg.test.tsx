import React from 'react';
import { render, screen } from '@testing-library/react';

import CardImg from './CardImg';

test('renders component card image', () => {
  const { getByTestId } = render(
    <CardImg
      id="tt0458339"
      src="https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg"
      title="Captain America: The First Avenger"
      showPoster={() => console.log('test')}
    />
  );
  const card = getByTestId('card');
  expect(card).toBeDefined();
});
