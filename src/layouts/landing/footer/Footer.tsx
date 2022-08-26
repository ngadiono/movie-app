// Vendors
import React from 'react';
import Typography from '@mui/material/Typography';

// Styles
import { Wrapper } from './Footer.style';

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Typography variant="body1">Movie List. &copy; 2022</Typography>
    </Wrapper>
  );
};

export default Footer;
