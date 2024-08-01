import { useState } from "react";
import ToggleButton from "./toggle-button"

function Movie({ movie }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
            </div>
        </li>
    )
}

export default function MovieList({ movies }) {
    const [isOpen1, setIsOpen1] = useState(true);

    return (
        <div className="box">
            <ToggleButton isOpen={isOpen1} toggleOpen={() => setIsOpen1((open) => !open)}/>
            {isOpen1 && (
            <ul className="list">
                {movies?.map((movie) => (<Movie movie={movie}/>))}
            </ul>
            )}
        </div>
    )
}