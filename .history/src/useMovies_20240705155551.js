import { useEffect, useState } from "react";

const ApiUrl = 'https://www.omdbapi.com/?apikey=7392b8d6&';


export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (query) {
          const controller = new AbortController();

          const fetchMovies = async () => {
            try {
              setIsLoading(true)
              const res = await fetch(`${ApiUrl}s=${query}`, { signal: controller.signal });
    
              if (!res.ok) {
                throw new Error('Something went wrong!');
              }
              
              const data = await res.json();
              if (Array.isArray(data.Search) && data.Search.length > 0) {
                setMovies(data.Search);
              } else {
                throw new Error('Movie not found!');
              }
            } catch(err) {
              if (err.name !== "AbortError") {
                console.log(err.message);
                setError(err.message);
              }
            } finally {
              setIsLoading(false);
            }
          }
    
          if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
          }
    
          fetchMovies();
      
          return () => {
            controller.abort();
          }
        }
    }, [setMovies, setIsLoading, query]);

    useEffect(() => {
        if (query) {
        callback?.();
        }
    }, [query, callback]);

    return [movies, isLoading, error];
}