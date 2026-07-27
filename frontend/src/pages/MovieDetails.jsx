import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Calendar,
  Clock3,
  ExternalLink,
  Heart,
} from "lucide-react";
import { useMovieContext } from "../contexts/MovieContext";

import { getMovieDetails } from "../services/api";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      setLoading(true);

      const data = await getMovieDetails(id);

      if (!data || data.status_code) {
        setMovie(null);
        setError("Movie details could not be loaded.");
      } else {
        setMovie(data);
        setError("");
      }

      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-page">
        <div className="loading-message">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <div
        className="movie-hero"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
        }}
      >
        <div className="hero-actions">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            className="favorite-hero-button"
            onClick={() => {
              if (favorite) {
                removeFromFavorites(movie.id);
              } else {
                addToFavorites(movie);
              }
            }}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            title={favorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {favorite ? (
              <Heart size={20} color="#e50914" fill="#e50914" />
            ) : (
              <Heart size={20} color="white" />
            )}
          </button>
        </div>

        <div className="movie-details-card">
          {/* Poster */}
          <div className="movie-details-poster">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="poster-placeholder">No Poster Available</div>
            )}
          </div>

          {/* Info */}
          <div className="movie-details-info">
            <h1>{movie.title}</h1>

            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}

            <div className="movie-meta">
              <div className="meta-pill">
                <Calendar size={16} />
                {movie.release_date ? movie.release_date.split("-")[0] : "TBA"}
              </div>

              <div className="meta-pill">
                <Clock3 size={16} />
                {movie.runtime ? `${movie.runtime} min` : "N/A"}
              </div>

              <div className="meta-pill rating-pill">
                <Star size={16} fill="#f5c518" color="#f5c518" />
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </div>
            </div>

            {movie.genres?.length > 0 && (
              <div className="genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="overview">
              {movie.overview || "No description available."}
            </p>

            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className="homepage-link"
              >
                Official Website
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Cast */}
      {movie.credits?.cast?.length > 0 && (
        <section className="cast-section">
          <h2>Top Billed Cast</h2>

          <div className="cast-grid">
            {movie.credits.cast.slice(0, 8).map((cast) => (
              <div
                className="cast-card"
                key={cast.credit_id}
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(
                      `${cast.name} actor`,
                    )}`,
                    "_blank",
                  )
                }
              >
                {cast.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                    alt={cast.name}
                  />
                ) : (
                  <div className="cast-avatar">{cast.name?.charAt(0)}</div>
                )}

                <div className="cast-details">
                  <p className="cast-name">{cast.name}</p>

                  <p className="cast-role">{cast.character || "Unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default MovieDetails;
