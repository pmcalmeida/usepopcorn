import Rating from "./rating";

function Summary({ length, rating }) {
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