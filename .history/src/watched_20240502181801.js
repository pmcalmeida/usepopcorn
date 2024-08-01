import Rating from "./rating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Summary({ length, rating, runtime }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
            <p>
                <span>#️⃣</span>
                <span>{length} movies</span>
            </p>
            <Rating rating={rating.avgImdbRating}/>
            <Rating rating={rating.avgUserRating}/>
            <p>
                <span>⏳</span>
                <span>{runtime} min</span>
            </p>
            </div>
        </div>
    )
}

export default function Watched({ watched, rating, runtime }) {
    return (
        <>
            <Summary />
            <ul className="list">
                {watched.map((movie) => (
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
                ))}
        </ul>
      </>
    )
}