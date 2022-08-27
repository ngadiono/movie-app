// Vendors
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Styles
import { Search, SearchIconWrapper, StyledInputBase } from './Header.style';

const Header: React.FC = () => {
  const router = useRouter();

  const handleCheckRouter = () => {
    return router.pathname !== '/movie/[slug]';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {handleCheckRouter() ? (
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Link href="/">
              <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
            </Link>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Movie {handleCheckRouter() ? 'List' : 'Detail'}
          </Typography>
          {handleCheckRouter() && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
