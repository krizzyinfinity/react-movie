import {  TextField, Tabs, Tab } from '@mui/material';
import "./Search.css"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleMovie from '../../components/SingleMovie/SingleMovie';

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setMovies(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div >
      <ThemeProvider theme={darkTheme}>
        <div className='search'>
      <TextField
            style={{ flex: 1, width: "39rem" }}
            className="searchBox"
            label="Search"
          
            variant="outlined"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" 
          onClick={fetchSearch}
          
          style={{ marginLeft: 10 }}><SearchIcon /></Button>

         </div>
          <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          centered
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
       
          </ThemeProvider>
          <div className="trending">
        {movies &&
          movies.map((movie) => (
            <SingleMovie
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type={type ? "tv" : "movie"}
              average={movie.vote_average}
            />
          ))}
        {searchText &&
          !movies &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search