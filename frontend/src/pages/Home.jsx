/* eslint-disable react-hooks/set-state-in-effect */
import "../css/Home.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";
import { Search } from "lucide-react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  //     {id: 5, title: "The Lord of the Rings: The Return of the King", release_date: "2003"},
  // ];

  // Fetch popular movies (exposed so we can reload on demand)
  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null);
      setSearchQuery("");
    } catch (error) {
      console.error("Error loading popular movies:", error);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // If the Navbar navigates to "/?reset=true" reload popular movies
  useEffect(() => {
    if (location.search && location.search.includes("reset=true")) {
      fetchPopularMovies();
      navigate("/", { replace: true });
    }
  }, [location.search, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Failed to search movies. Please try again later.");
    } finally {
      setLoading(false);
    }
    // setSearchQuery("");
  };

  return (
    <>
      <div className="home">
        <div className="hero">
          <h1 className="hero-title">Discover Your Next Favorite Movie</h1>

          <p className="hero-subtitle">
            Search from thousands of movies and explore ratings, release dates
            and more.
          </p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <button
                type="submit"
                className="search-button"
                disabled={loading}
              >
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>
        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading movies</div>
        ) : movies.length > 0 ? (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No movies found 🎬</h2>
            <p>
              We couldn't find any movies matching
              <strong> "{searchQuery}"</strong>.
            </p>

            <button className="reset-button" onClick={fetchPopularMovies}>
              Browse Popular Movies
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
