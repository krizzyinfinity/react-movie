import axios from "axios";
import "./Trending.css";
import React, { useEffect, useState } from "react";
import SingleMovie from "../../components/SingleMovie/SingleMovie";
import CustomPagination from "../../components/Pagination/CustomPagination";
const URL = "https://api.themoviedb.org/3/trending/all/day";
const Trending = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const fetchPopular = async () => {
    const { data } = await axios.get(
      `${URL}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    console.log(data);
    setMovies(data.results);
  };
  useEffect(() => {
    fetchPopular();
  }, [page]);
  return (
    <>
      <div className="title">Trending now</div>
      <div className="trending">
        {movies &&
          movies.map((movie) => (
            <SingleMovie
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.release_date || movie.first_air_date}
              media_type={movie.media_type}
              average={movie.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </>
  );
};

export default Trending;
