export default function Watched() {
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
    )
}