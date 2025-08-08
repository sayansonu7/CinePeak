import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useDebounce from "./hooks/useDebounce.js";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import { updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const popularMovieIds = [
  "tt32857110", // Bohurupi
  "tt5180504", // Avatar: The Way of Water
  "tt5083738", // Superman
  "tt10954652", // Mickey 17

  "tt1838557", // Companion

  "tt1838561", // Saiyaara

  "tt1838564", // Chhaava
  "tt1838565", // Housefull 5
  "tt1838566", // Sky Force
  "tt1838567", // Mayanagar
  "tt1745960", // Ballerina
  "tt10872610", // 28 Years Later
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0468569", // The Dark Knight
  "tt0071562", // The Godfather: Part II
  "tt0050083", // 12 Angry Men
  "tt1375666", // Inception
  "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
  "tt0167261", // The Lord of the Rings: The Two Towers
  "tt0080684", // Star Wars: Episode V - The Empire Strikes Back
  "tt0133093", // The Matrix
  "tt0099685", // Goodfellas

  "tt0110357", // The Lion King
  "tt0088763", // Back to the Future
  "tt0172495", // Gladiator
  "tt0047396", // Rear Window
  "tt1675434", // The Intouchables
  "tt8108198", // Andhadhun

  "tt15097216", // Jai Bhim

  "tt15699250", // Hanu Man
  "tt26548265", // Maharaja

  "tt4154796", // Avengers: Endgame
  "tt4633694", // Spider-Man: Into the Spider-Verse
  "tt6966692", // Green Book

  "tt4154756", // Avengers: Infinity War

  "tt1392190", // Mad Max: Fury Road

  "tt2278388", // The Grand Budapest Hotel
  "tt9362722", // Spider-Man: Across the Spider-Verse

  "tt10872600", // Spider-Man: No Way Home
  "tt15398776", // Oppenheimer
  "tt1300115", // The Dark Knight Rises
];

const MOVIES_PER_PAGE = 16;

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]); // For search results
  const [allPopularMovies, setAllPopularMovies] = useState([]); // For all popular movies
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("default"); // 'default', 'date_desc', 'rating_desc'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Debounce the search term
  const debouncedValueFromHook = useDebounce(searchTerm, 500);
  useEffect(() => {
    setDebouncedSearchTerm(debouncedValueFromHook);
    setCurrentPage(1); // Reset to first page on new search
  }, [debouncedValueFromHook]);

  // Fetch all popular movies on initial load
  useEffect(() => {
    const fetchAllPopularMovies = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        if (!API_KEY || API_KEY.trim() === "" || API_KEY === "undefined") {
          setErrorMessage("OMDB API Key is not configured.");
          return;
        }
        const popularMoviesDataPromises = popularMovieIds.map(async (id) => {
          const endpoint = `${API_BASE_URL}/?i=${id}&apikey=${API_KEY}`;
          try {
            const response = await fetch(endpoint);
            if (!response.ok) {
              if (response.status === 401) {
                throw new Error(
                  "Invalid API key. Please check your OMDB API key."
                );
              }
              console.warn(
                `Failed to fetch popular movie with ID ${id}: ${response.status} ${response.statusText}`
              );
              return null;
            }
            const data = await response.json();
            if (data.Response === "True") {
              return data;
            } else {
              console.warn(
                `OMDB API returned 'False' for popular movie ID ${id}: ${data.Error}`
              );
              return null;
            }
          } catch (error) {
            console.error(`Error fetching details for movie ID ${id}:`, error);
            return null;
          }
        });
        const popularMoviesData = (
          await Promise.all(popularMoviesDataPromises)
        ).filter((movie) => movie);
        setAllPopularMovies(popularMoviesData);
      } catch (error) {
        console.error(`Error fetching popular movies: ${error}`);
        setErrorMessage(
          `Error fetching popular movies: ${error.message}. Please try again later.`
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPopularMovies();
  }, []);

  // Fetch movies when search term changes
  useEffect(() => {
    const fetchSearchedMovies = async (query) => {
      if (!query) {
        setMovieList([]);
        return;
      }
      setIsLoading(true);
      setErrorMessage("");
      setMovieList([]);
      try {
        if (!API_KEY || API_KEY.trim() === "" || API_KEY === "undefined") {
          setErrorMessage("OMDB API Key is not configured.");
          return;
        }
        const endpoint = `${API_BASE_URL}/?s=${encodeURIComponent(
          query
        )}&apikey=${API_KEY}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid API key. Please check your OMDB API key.");
          }
          throw new Error(
            `Failed to fetch movies from search: ${response.statusText}`
          );
        }
        const data = await response.json();
        if (data.Response === "False") {
          setErrorMessage(data.Error || "No movies found for your search.");
          setMovieList([]);
        } else if (data.Search && data.Search.length > 0) {
          const detailedMoviesPromises = data.Search.map(
            async (searchResultMovie) => {
              const detailEndpoint = `${API_BASE_URL}/?i=${searchResultMovie.imdbID}&apikey=${API_KEY}`;
              try {
                const detailResponse = await fetch(detailEndpoint);
                if (!detailResponse.ok) {
                  console.warn(
                    `Failed to fetch details for movie ID ${searchResultMovie.imdbID}: ${detailResponse.statusText}`
                  );
                  return {
                    ...searchResultMovie,
                    imdbRating: "N/A",
                    Language: "N/A",
                  };
                }
                const detailData = await detailResponse.json();
                return detailData.Response === "True"
                  ? detailData
                  : {
                      ...searchResultMovie,
                      imdbRating: "N/A",
                      Language: "N/A",
                    };
              } catch (error) {
                console.error(
                  `Error fetching details for movie ID ${searchResultMovie.imdbID}:`,
                  error
                );
                return {
                  ...searchResultMovie,
                  imdbRating: "N/A",
                  Language: "N/A",
                };
              }
            }
          );
          const detailedMovies = await Promise.all(detailedMoviesPromises);
          setMovieList(detailedMovies.filter((movie) => movie));
          updateSearchCount();
        } else {
          setMovieList([]);
          setErrorMessage("No movies found for your search.");
        }
      } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        setErrorMessage(
          `Error fetching movies: ${error.message}. Please try again later.`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchedMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const sortedList = useMemo(() => {
    const listToSort = debouncedSearchTerm ? movieList : allPopularMovies;
    let sorted = [...listToSort];
    if (sortCriteria === "date_desc") {
      sorted.sort((a, b) => {
        const yearA = parseInt(a.Year, 10);
        const yearB = parseInt(b.Year, 10);
        if (isNaN(yearA)) return 1;
        if (isNaN(yearB)) return -1;
        return yearB - yearA;
      });
    } else if (sortCriteria === "rating_desc") {
      sorted.sort((a, b) => {
        const ratingA = a.imdbRating === "N/A" ? -1 : parseFloat(a.imdbRating);
        const ratingB = b.imdbRating === "N/A" ? -1 : parseFloat(b.imdbRating);
        return ratingB - ratingA;
      });
    } else if (sortCriteria === "ascending") {
      sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortCriteria === "descending") {
      sorted.sort((a, b) => b.Title.localeCompare(a.Title));
    }
    return sorted;
  }, [movieList, allPopularMovies, sortCriteria, debouncedSearchTerm]);

  const totalPages = useMemo(() => {
    if (debouncedSearchTerm) {
      return 1;
    }
    const moviesWithPosters = sortedList.filter(
      (movie) => movie.Poster && movie.Poster !== "N/A"
    );
    const moviesWithoutPosters = sortedList.filter(
      (movie) => !movie.Poster || movie.Poster === "N/A"
    );
    const reorderedList = [...moviesWithPosters, ...moviesWithoutPosters];
    return Math.ceil(reorderedList.length / MOVIES_PER_PAGE);
  }, [sortedList, debouncedSearchTerm]);

  const paginatedList = useMemo(() => {
    if (debouncedSearchTerm) {
      return sortedList;
    }

    const moviesWithPosters = sortedList.filter(
      (movie) => movie.Poster && movie.Poster !== "N/A"
    );
    const moviesWithoutPosters = sortedList.filter(
      (movie) => !movie.Poster || movie.Poster === "N/A"
    );

    const reorderedList = [...moviesWithPosters, ...moviesWithoutPosters];

    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    return reorderedList.slice(startIndex, endIndex);
  }, [sortedList, currentPage, debouncedSearchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const listToDisplay = debouncedSearchTerm ? sortedList : paginatedList;
  const moviesAvailable = listToDisplay.length > 0;

  return (
    <Router>
      <Routes>
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route
          path="/"
          element={
            <main>
              <div className="pattern" />
              <div className="wrapper">
                <header>
                  <h1>
                    Discover Your Next
                    <span className="text-gradient"> Favorite Movie </span> in
                    Seconds
                  </h1>
                  <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </header>
                <br />

                {isLoading && !moviesAvailable ? (
                  <Spinner />
                ) : errorMessage ? (
                  <p className="text-red-500 text-center py-4">
                    {errorMessage}
                  </p>
                ) : moviesAvailable ? (
                  <section className="movies-display">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <h2>
                          {debouncedSearchTerm
                            ? `Search Results for "${debouncedSearchTerm}"`
                            : `Popular Movies`}
                        </h2>
                      </div>
                      <div className="flex items-center">
                        <div className="view-mode-controls mr-4">
                          <button
                            onClick={() => setViewMode("grid")}
                            className={`px-3 py-1 border rounded ${
                              viewMode === "grid"
                                ? "bg-purple-900"
                                : "bg-gray-600"
                            } text-white`}
                          >
                            Grid
                          </button>
                          <button
                            onClick={() => setViewMode("list")}
                            className={`px-3 py-1 border rounded ${
                              viewMode === "list"
                                ? "bg-cyan-700"
                                : "bg-gray-600"
                            } text-white ml-2`}
                          >
                            List
                          </button>
                        </div>
                        <div className="sorting-controls">
                          <label
                            htmlFor="sort-select"
                            className="mr-2 text-sm text-gray-300"
                          >
                            Sort by:
                          </label>
                          <select
                            id="sort-select"
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                            className="p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
                          >
                            <option value="default">Default</option>
                            <option value="date_desc">Newest First</option>
                            <option value="rating_desc">Highest Rating</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <br />
                    <div
                      className={`${
                        viewMode === "grid" ? "movie-grid" : "movie-list"
                      }`}
                    >
                      {listToDisplay.map((movie) => (
                        <MovieCard
                          key={movie.imdbID}
                          movie={{
                            title: movie.Title,
                            vote_average:
                              movie.imdbRating && movie.imdbRating !== "N/A"
                                ? parseFloat(movie.imdbRating)
                                : null,
                            poster_path:
                              movie.Poster && movie.Poster !== "N/A"
                                ? movie.Poster
                                : null,
                            original_language:
                              movie.Language && movie.Language !== "N/A"
                                ? movie.Language.split(",")[0].trim()
                                : null,
                            release_date: movie.Year,
                            imdbID: movie.imdbID,
                          }}
                          viewMode={viewMode}
                        />
                      ))}
                    </div>
                    {!debouncedSearchTerm && totalPages > 1 && (
                      <div className="pagination-controls flex justify-center items-center space-x-4 my-8">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-4 py-2 bg-purple-900 text-white rounded disabled:bg-gray-400 hover:bg-purple-700 transition-colors"
                        >
                          Previous
                        </button>
                        {[...Array(totalPages).keys()].map((num) => (
                          <button
                            key={num + 1}
                            onClick={() => handlePageChange(num + 1)}
                            className={`px-4 py-2 rounded ${
                              currentPage === num + 1
                                ? "bg-blue-900 text-white"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            } transition-colors`}
                          >
                            {num + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 bg-cyan-800 text-white rounded disabled:bg-gray-400 hover:bg-cyan-600 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </section>
                ) : (
                  <p className="text-center py-4">
                    {debouncedSearchTerm
                      ? `No movies found for "${debouncedSearchTerm}".`
                      : "No popular movies found."}
                  </p>
                )}
              </div>
            </main>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
