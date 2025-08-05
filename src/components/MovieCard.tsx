const MovieCard = ({
  movie: { title, vote_average, poster_path, original_language, release_date },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path && poster_path !== "N/A" ? poster_path : "/no-poster.png"
        }
        alt={title}
      />
      {/* <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p> */}

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star-3d.png" alt="star icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span></span>

          <p className="lang">{original_language}</p>

          <span></span>
          <p className="year">
            {release_date
              ? typeof release_date === "string"
                ? release_date.split("-")[0]
                : "N/A"
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
