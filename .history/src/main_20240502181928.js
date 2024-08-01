import { useState } from "react";
import MovieList from "./movie-list";
import Watched from "./watched";
  

export default function Main({ movies }) {
    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <main className="main">
            <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen1((open) => !open)}
            >
                {isOpen1 ? "–" : "+"}
            </button>
            {isOpen1 && (
                <MovieList movies={movies}/>
            )}
            </div>

            <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <Watched/>
            )}
            </div>
      </main>
    )
}