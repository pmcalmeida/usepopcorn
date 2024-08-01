import { Fragment, useEffect, useState } from "react";
import Header from "./header";
import Main from "./main";
import MovieList from "./movie-list";
import { WatchedList, Summary }  from "./watched-list";
import Search from "./search";
import Box from "./box";
import MovieDetails from "./details";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

function NumResults({ results }) {
  return (
      <p className="num-results">
          Found <strong>{results}</strong> results
      </p>
  )
}

const ApiUrl = 'https://www.omdbapi.com/?apikey=7392b8d6&';

function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  const handleCloseMovie = () => {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => ([...watched, movie]));
  }

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter(movie => movie.imdbId !== id));
  }

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

      handleCloseMovie();
      fetchMovies();
  
      return () => {
        controller.abort();
      }
    }
  }, [setMovies, setIsLoading, query]);

  return (
    <>
      <Header numMovies={movies.length}>
        <Search query={query} setQuery={setQuery} />
        <NumResults results={movies.length} />
      </Header>
      <Main>
        <Box>
          { isLoading && <Loader /> }
          { !isLoading && !error && <MovieList movies={movies} onSelectedMovie={handleSelectMovie} /> }
          { error && <ErrorMessage message={error} /> }
        </Box>
        <Box>
          {
              selectedId ? <MovieDetails 
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
                /> : 
              <>
                <Summary watched={watched}/>
                <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched}/>
              </>
            }
        </Box>
      </Main>
    </>
  );
}
