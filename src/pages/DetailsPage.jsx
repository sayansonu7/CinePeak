import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [soundtracks, setSoundtracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch movie details from OMDB API
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }`
        );
        const data = await response.json();
        setMovieDetails(data);

        // Fetch soundtrack data (to be implemented with Spotify API)
        // const tracks = await fetchSoundtracks(data.Title);
        // setSoundtracks(tracks);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const streamingPlatforms = [
    {
      name: "Netflix",
      icon: "/icons/netflix.svg",
      url: `https://www.netflix.com/search?q=${movieDetails?.Title}`,
    },
    {
      name: "Prime Video",
      icon: "/icons/prime.svg",
      url: `https://www.primevideo.com/search?k=${movieDetails?.Title}`,
    },
    {
      name: "Hotstar",
      icon: "/icons/hotstar.svg",
      url: `https://www.hotstar.com/search?q=${movieDetails?.Title}`,
    },
    {
      name: "HBO",
      icon: "/icons/hbo.svg",
      url: `https://www.hbo.com/search?q=${movieDetails?.Title}`,
    },
  ];

  if (loading) return <div className="spinner">Loading...</div>;
  if (!movieDetails)
    return <div className="error">Failed to load details.</div>;

  return (
    <div className="details-page bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Hero Section */}
      <div className="hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movieDetails.Poster})`,
            filter: "blur(2px)",
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              className="w-64 rounded-lg shadow-2xl ring-1 ring-white/10"
            />
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {movieDetails.Title}
              </h1>
              <div className="flex flex-wrap gap-4 text-lg text-gray-300 mb-6">
                <span>{movieDetails.Year}</span>
                <span>•</span>
                <span>{movieDetails.Runtime}</span>
                <span>•</span>
                <span>{movieDetails.Rated}</span>
              </div>
              <p className="text-xl text-gray-200 max-w-3xl">
                {movieDetails.Plot}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Movie Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  {movieDetails.imdbRating}
                </div>
                <div className="text-sm text-gray-400">IMDb Rating</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {movieDetails.Metascore}
                </div>
                <div className="text-sm text-gray-400">Metascore</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {movieDetails.Runtime}
                </div>
                <div className="text-sm text-gray-400">Duration</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-purple-500 mb-2">
                  {movieDetails.Year}
                </div>
                <div className="text-sm text-gray-400">Release Year</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Movie Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2">
                      Director
                    </h4>
                    <p className="text-gray-200 text-lg">
                      {movieDetails.Director}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2">
                      Writers
                    </h4>
                    <p className="text-gray-200 text-lg">
                      {movieDetails.Writer}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2">
                      Genre
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails.Genre.split(", ").map((genre, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2">
                      Awards
                    </h4>
                    <p className="text-gray-200 text-lg">
                      {movieDetails.Awards}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cast Section */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {movieDetails.Actors.split(", ").map((actor, index) => (
                  <div key={index} className="group text-center">
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        actor + " actor"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-3 px-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 group-hover:transform group-hover:scale-105"
                    >
                      <h3 className="text-base md:text-lg font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
                        {actor}
                      </h3>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ratings & Watch Section */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6">Ratings</h3>
              <div className="space-y-4">
                {movieDetails.Ratings.map((rating, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                  >
                    <span className="text-gray-300">{rating.Source}</span>
                    <span className="text-lg font-semibold text-white">
                      {rating.Value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch Now Section */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6">Watch Now</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {streamingPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center p-2.5 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-lg text-gray-200 group-hover:text-white transition-colors">
                      {platform.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Soundtrack Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">Soundtrack</h2>
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="grid gap-4">
              {movieDetails.Title && (
                <div className="space-y-4">
                  {/* Here we create a YouTube search link for each song with the movie title */}
                  {[1, 2, 3].map((_, index) => (
                    <a
                      key={index}
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                        `${movieDetails.Title} soundtrack song ${index + 1}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/20 mr-3 group-hover:bg-red-500/30 transition-colors">
                          <svg
                            className="w-3 h-3 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white group-hover:text-red-400 transition-colors">
                            {`${movieDetails.Title} - Song ${index + 1}`}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Search on YouTube
                          </p>
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-red-400 transform group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
