// Vendors
import React, { FC, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// Hooks
import { useAppSelector, useAppDispatch } from '@/hooks/useReactRedux';

// Stores
import {
  movieLoading,
  movieLoadingScroll,
  movieList,
  movieDetail,
  movieFailure,
  movieSearch,
} from '@/store/module/movie/movieSlice';

// Styles
import { Wrapper, Search, SearchIconWrapper, StyledInputBase } from './FieldSearch.style';

const DEBOUNCE = 1000;

interface SearchFieldProps {
  onSearch: (v: string) => void;
  isLoading: boolean;
}
const SearchField: React.FC<SearchFieldProps> = ({ onSearch, isLoading }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Search>
  );
};

const SearchList: React.FC<{
  items: string[];
  onSelect: (item: string) => void;
}> = ({ items, onSelect }) => {
  return (
    <List
      sx={{
        position: 'absolute',
        zIndex: 1,
        left: '8px',
        overflowY: 'scroll',
        height: '300px',
        padding: 0,
      }}
    >
      {items.map((item, index) => (
        <ListItem
          key={item + index}
          onClick={() => onSelect(item)}
          disablePadding
          sx={{ backgroundColor: '#fff' }}
        >
          <ListItemButton>
            <ListItemText primary={item} sx={{ color: '#000' }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const searchFun = (
  queryParam: string,
  setResults: (value: string[]) => void,
  setIsLoading: (value: boolean) => void,
  dispatch
) => {
  dispatch(movieLoading(true));
  dispatch(movieSearch(queryParam));
  axios
    .get(process.env.NEXT_PUBLIC_IMDB_API, {
      params: {
        s: queryParam,
      },
    })
    .then(({ data }) => {
      const { totalResults, Search } = data;
      setIsLoading(false);
      setResults(totalResults ? Search.map((i: any) => i.Title) : []);
      dispatch(movieList(Search));
    });
};

const debouncedSearch = debounce(searchFun, DEBOUNCE);

const FieldSearch: FC = () => {
  const dispatch = useAppDispatch();
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSearch = (v: string) => {
    const search = debouncedSearch;
    if (!v) {
      debouncedSearch.cancel();
      setResults([]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      search(v, setResults, setIsLoading, dispatch);
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        console.log('Enter key was pressed. Run your function.');
        event.preventDefault();
        // callMyFunction();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <Wrapper>
      <SearchField onSearch={onSearch} isLoading={isLoading} />
      {/* {!!results.length && <SearchList items={results} onSelect={(i) => alert(i)} />} */}
    </Wrapper>
  );
};

export default FieldSearch;
