import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, viewMode }) => {
  const navigate = useNavigate();
  const {
    title,
    vote_average,
    poster_path,
    original_language,
    release_date,
    imdbID,
  } = movie;
  const posterUrl = poster_path ? `${poster_path}` : "/no-poster.png";

  const handleClick = () => {
    navigate(`/details/${imdbID}`);
  };

  if (viewMode === "list") {
    return (
      <div className="movie-card cursor-pointer" onClick={handleClick}>
        <img src={posterUrl} alt={title} />
        <div className="movie-details">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-info">
            Rating: {vote_average ? vote_average.toFixed(1) : "N/A"}
          </p>
          <p className="movie-info">
            Language: {original_language?.toUpperCase() || "N/A"}
          </p>
          <p className="movie-info">{release_date}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="movie-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
    >
      <img src={posterUrl} alt={title} className="w-full h-auto object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span
            className={`text-sm font-semibold ${
              vote_average >= 7 ? "text-green-400" : "text-yellow-400"
            }`}
          >
            Rating: {vote_average ? vote_average.toFixed(1) : "N/A"}
          </span>
          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
            {original_language?.toUpperCase() || "N/A"}
          </span>
        </div>
        <p className="text-sm text-gray-300 mt-2">{release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
