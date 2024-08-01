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

function MovieDetails({ selectedId,  onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);


  const watchedIds = watched.map((watchedMovie) => watchedMovie.imdbId);
  const isWatched = watchedIds.includes(selectedId);
  const watchedUserRating = watched.find((watchedMovie) => watchedMovie.imdbId === selectedId)?.userRating;

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
    Plot: plot,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(rating),
      userRating: Number(userRating),
      runtime: Number(runtime.split(" ")[0])
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`${ApiUrl}i=${selectedId}`);
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };

    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
     { isLoading ? <Loader /> : (
      <>
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
        </div>
      </header>
      <section>
        <div className="rating">
          {
            !isWatched ? (
              <>
                <Rating maxRating={10} size={24} defaultRating={Math.floor(rating)} onSetRating={setUserRating}/>
                { userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>Add to watch list</button>
                )}
              </>
            ) : <p>You rated movie with {watchedUserRating}</p>
          }
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
      </>
    )}
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
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

  const handleAddWatched = (movie) => {
    setWatched((watched) => ([...watched, movie]));
  }

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter(movie => movie.imdbId !== id));
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
