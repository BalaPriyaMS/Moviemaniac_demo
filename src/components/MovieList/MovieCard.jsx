/* eslint-disable react/prop-types */
import Star from "../../assets/star.png";
import "./MovieCard.css";

const MovieCard = ({ movieData }) => {
  return (
    <a
      href={`https://www.themoviedb.org/movie/${movieData.id}`}
      target="_blank"
      className="movie-card"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        alt=""
        className="movie-poster"
      />
      <div className="movie-details">
        <h3 className="movie-name">{movieData.title}</h3>
        <div className="movie-date-rate">
          <p>{movieData.release_date}</p>
          <p className="movie-rating">
            {movieData.vote_average}
            <img src={Star} alt="" className="card-emojis" />
          </p>
        </div>
        <p className="movie-des">{movieData.overview.slice(0, 100) + "..."}</p>
      </div>
    </a>
  );
};

export default MovieCard;
