import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="favorites-empty">
        <Heart className="favorites-empty-icon" size={64} />

        <h2>No Favorites Yet</h2>

        <p>
          Start building your collection by clicking the
          <strong> heart icon</strong> on any movie.
        </p>
        <Link to="/" className="browse-button">
          Browse Movies
        </Link>
      </div>
    </>
  );
}

export default Favorites;
