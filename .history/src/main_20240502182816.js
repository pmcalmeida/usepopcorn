import { useState } from "react";
import MovieList from "./movie-list";
import Watched from "./watched";
  
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

function ToggleButton({ isOpen, toggleOpen }) {
    return (
        <button
            className="btn-toggle"
            onClick={toggleOpen)}
        >
            {isOpen ? "–" : "+"}
        </button>
    )

}

export default function Main({ movies }) {
    const [watched, setWatched] = useState(tempWatchedData);
    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <main className="main">
            <div className="box">
            <ToggleButton isOpen={isOpen1} toggleOpen={() => setIsOpen1((open) => !open)}/>
            {isOpen1 && (
                <MovieList movies={movies}/>
            )}
            </div>

            <div className="box">
            <ToggleButton isOpen={isOpen2} toggleOpen={() => setIsOpen2((open) => !open)}/>
            {isOpen2 && (
                <Watched watched={watched}/>
            )}
            </div>
      </main>
    )
}