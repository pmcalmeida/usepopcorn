import Rating from "./rating";
import ToggleButton from "./toggle-button";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Summary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
            <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
            </p>
            <Rating rating={avgImdbRating}/>
            <Rating rating={avgUserRating}/>
            <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
            </p>
            </div>
        </div>
    )
}

function WatchedMovie({ movie }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
            <Rating rating={movie.imdbRating}/>
            <Rating rating={movie.userRating}/>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>
            </div>
        </li>
    );
}

function WatchedList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie}/>
            ))}
        </ul>
        )
};

export default function Watched() {
    const [watched, setWatched] = useState(tempWatchedData);
    const [isOpen2, setIsOpen2] = useState(true);
    
    return (
        <div className="box">
            <ToggleButton isOpen={isOpen2} toggleOpen={() => setIsOpen2((open) => !open)}/>
            {isOpen2 && (
                <>
                    <Summary watched={watched}/>
                    <WatchedList watched={watched}/>
                </>
            )}
        </div>
    )
}