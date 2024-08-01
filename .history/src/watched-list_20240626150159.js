import Star from "./star";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function Summary({ watched }) {
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
            <Star rating={avgImdbRating}/>
            <Star rating={avgUserRating}/>
            <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
            </p>
            </div>
        </div>
    )
}

function WatchedMovie({ movie, onDeleteWatched }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
            <Star rating={movie.imdbRating}/>
            <Star rating={movie.userRating}/>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>
            </div>
            <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbId) }>X</button>
        </li>
    );
}

export function WatchedList({ watched, onDeleteWatched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbId} movie={movie} onDeleteWatched={onDeleteWatched}/>
            ))}
        </ul>
    )
};