import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, viewMode = "grid" }) => {
  const navigate = useNavigate();
  const {
    title,
    vote_average,
    poster_path,
    original_language,
    release_date,
    imdbID,
  } = movie;

  const posterUrl =
    poster_path && poster_path !== "N/A" ? `${poster_path}` : "/no-poster.png";

  const handleClick = () => navigate(`/details/${imdbID}`);

  /* ────────────── LIST VIEW ────────────── */
  if (viewMode === "list") {
    return (
      <div
        className="movie-card flex items-center gap-5 p-3 bg-[#1b162b] rounded-lg 
                   hover:shadow-md hover:-translate-y-[2px] transition cursor-pointer"
        onClick={handleClick}
      >
        {/* small poster */}
        <img
          src={posterUrl}
          alt={title}
          className="w-[60px] h-[90px] object-cover rounded-sm shrink-0"
        />

        {/* details */}
        <div className="movie-details flex flex-col text-left">
          <h3 className="movie-title text-sm font-bold text-white leading-snug">
            {title}
          </h3>
          <p className="movie-info text-xs text-gray-400 italic">
            {release_date ? release_date.substring(0, 4) : "----"}
          </p>
        </div>
      </div>
    );
  }

  /* ────────────── GRID VIEW (unchanged) ────────────── */
  return (
    <div
      onClick={handleClick}
      className="movie-card bg-gray-800 rounded-lg overflow-hidden shadow-lg
                 hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-auto object-cover"
      />
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
