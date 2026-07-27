const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPopularMovies = async () => {
	try {
		const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        return data.results;
	}catch(error){
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export const searchMovies = async (query) => {
    try{
        const response =await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.results;
    }catch(error){
        console.error('Error searching movies:', error);
        return [];
    }
}

export const getMovieDetails = async (movieId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
        )
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching movie details:', error)
        return null
    }
}
