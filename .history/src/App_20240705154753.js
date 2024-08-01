import { Fragment, useEffect, useState } from "react";
import Header from "./header";
import Main from "./main";
import MovieList from "./movie-list";
import { WatchedList, Summary }  from "./watched-list";
import Search from "./search";
import Box from "./box";
import MovieDetails from "./details";
import { useMovies } from "./useMovies";


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

function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>
}

export default function App() {
  const [watched, setWatched] = useState([]);
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

  const [movies, isLoading, error] = useMovies(query);

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
