import { Fragment, useEffect, useState, useRef } from "react";
import Header from "./header";
import Main from "./main";
import MovieList from "./movie-list";
import { WatchedList, Summary }  from "./watched-list";
import Search from "./search";
import Box from "./box";
import Rating from "./rating";


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

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
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

function MovieDetails({ selectedId,  onCloseMovie }) {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating: rating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot
  } = movie;

  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetch(`${ApiUrl}i=${selectedId}`);

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }


      const data = await res.json();
      setMovie(data);
    };

    getMovieDetails();
  }, []);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
        <img src={poster} alt={`Poster of ${movie}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span></span>
            {rating} IMDb rating
          </p>
          </header>
          <section>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const debounceId = useRef(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  const handleCloseMovie = () => {
    setSelectedId(null);
  }

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          setIsLoading(true)
          const res = await fetch(`${ApiUrl}s=${query}`);

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
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }


      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      debounceId.current = setTimeout(fetchMovies, 500);
  
      return () => {
        clearTimeout(debounceId.current);
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
              selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie}/> : 
              <Fragment>
                <Summary watched={watched}/>
                <WatchedList watched={watched}/>
              </Fragment>
            }
        </Box>
      </Main>
    </>
  );
}
