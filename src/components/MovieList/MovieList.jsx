/* eslint-disable react/prop-types */
// import Fire from "../../assets/fire.png";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useState } from "react";
import _ from "lodash";

const MovieList = ({ type, title, emoji }) => {
  const API_URL = `https://api.themoviedb.org/3/movie/${type}?api_key=01dbb14b064ba19063a67ac56363232d`;
  const [movieData, setMovieData] = useState([]);
  const [filterMovieData, setFilterMovieData] = useState([]);
  const [initialRate, setinitialRate] = useState(0);
  const [sort, setSort] = useState({ by: "default", order: "asc" });
  console.log("hi");
  useEffect(() => {
    fetchMethod();
  }, []);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortfilterdata = _.orderBy(
        filterMovieData,
        [sort.by],
        [sort.order]
      );
      setFilterMovieData(sortfilterdata);
    }
  }, [sort]);

  const fetchMethod = async () => {
    const respose = await fetch(API_URL);
    const data = await respose.json();
    setMovieData(data.results);
    setFilterMovieData(data.results);
  };

  const handleratefilter = (rate) => {
    if (rate == initialRate) {
      setinitialRate(0);
      setFilterMovieData(movieData);
    } else {
      setinitialRate(rate);
      const filterRateData = movieData.filter(
        (rating) =>
          rating.vote_average >= rate && rating.vote_average < rate + 1
      );
      setFilterMovieData(filterRateData);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <section className="movie-list" id={type}>
      <header className="align-center movie-list-header">
        <h2 className="align-center movie-list-heading">
          {title}
          <img src={emoji} alt={`${emoji}-png`} className="navbar-emojis" />
        </h2>
        <div className="align-center movie-list-fs">
          <ul className="align-center movie-filter">
            <li
              className={
                initialRate == 8
                  ? "movie-filter-item active"
                  : "movie-filter-item"
              }
              onClick={() => {
                handleratefilter(8);
              }}
            >
              8+ Stars
            </li>
            <li
              className={
                initialRate == 7
                  ? "movie-filter-item active"
                  : "movie-filter-item"
              }
              onClick={() => {
                handleratefilter(7);
              }}
            >
              7+ Stars
            </li>
            <li
              className={
                initialRate == 6
                  ? "movie-filter-item active"
                  : "movie-filter-item"
              }
              onClick={() => {
                handleratefilter(6);
              }}
            >
              6+ Stars
            </li>
          </ul>

          <select
            name="by"
            id=""
            className="movie-sorting"
            onChange={handleSort}
          >
            <option value="default"> Sortby</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            name="order"
            id=""
            className="movie-sorting"
            onChange={handleSort}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie-cards">
        {filterMovieData.map((movieData) => (
          <MovieCard key={movieData.id} movieData={movieData} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
