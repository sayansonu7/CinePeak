import React from "react";
import "./MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{movie.Title} ({movie.Year})</h2>
                <img src={movie.Poster} alt={movie.Title} className="poster" />
                <p><strong>Plot:</strong> {movie.Plot}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Runtime:</strong> {movie.Runtime}</p>
                <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                <button onClick={onClose} className="close-btn">Close</button>
            </div>
        </div>
    );
};

export default MovieModal;
