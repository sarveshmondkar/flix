/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import {useState, useEffect, useContext, createContext} from "react";

const MovieContext = createContext();
 
const getStoredFavorites = () => {
    if (typeof window === "undefined") return [];

    try {
        const storedFavs = localStorage.getItem("favorites");
        if (!storedFavs) return [];
        const parsed = JSON.parse(storedFavs);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Failed to load favorites from localStorage:", error);
        return [];
    }
};

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState(getStoredFavorites);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (error) {
            console.error("Failed to save favorites to localStorage:", error);
        }
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites((prev) => {
            if (prev.some((item) => item.id === movie.id)) return prev;
            return [...prev, movie];
        });
    }

    const removeFromFavorites = (movieId) => {
        setFavorites((prev)=> prev.filter((movie) => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}