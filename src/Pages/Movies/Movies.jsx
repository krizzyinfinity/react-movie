import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Genres from '../../components/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleMovie from '../../components/SingleMovie/SingleMovie';
import useGenre from '../../hooks/useGenre';

const Movies = () => {
  const [page, setPage] = useState(1);
  const[movies, setMovies]=useState([]);
  const[numOfPages, setNumOfPages]=useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  const fetchMovies = async ()=> {
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
  console.log(data)
  setMovies(data.results);
  setNumOfPages(data.total_pages);
  }
  useEffect(()=>{
   window.scroll(0,0);
fetchMovies();
  }, [genreforURL,page]);
  return (
    <div>
    <span className='title'>Movies</span>
    <Genres 
    type="movie"
    selectedGenres={selectedGenres}
    setSelectedGenres={setSelectedGenres}
    genres={genres}
    setGenres={setGenres}
    setPage={setPage}/>
    <div className="trending">
        {movies &&
          movies.map((movie) => (
            <SingleMovie
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.release_date || movie.first_air_date}
              media_type="movie"
              average={movie.vote_average}
            />
          ))}
      </div>
      {
        numOfPages > 1 && (
      
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
  )
}

export default Movies