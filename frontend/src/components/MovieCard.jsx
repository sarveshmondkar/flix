import '../css/MovieCard.css'
import {useMovieContext} from '../contexts/MovieContext'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

function MovieCard({movie}){

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }
    return(
        <>
            <Link to={`/movie/${movie.id}`}>
                <div className= "movie-card">
                    <div className="movie-poster">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <div className="movie-overlay">
                            <button
                                className={`favorite-btn ${favorite ? "active" : ""}`}
                            onClick={onFavoriteClick}
                            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            {favorite ? <Heart size={18} color="red" fill='red' /> : <Heart size={18} color="white" />}
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split('-')[0]}</p>
                </div>
            </div>
            </Link>
        </>
    )
}

export default MovieCard;