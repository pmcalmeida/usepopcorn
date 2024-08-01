import { useEffect, useState, useRef } from "react";
import Rating from "./rating";

const ApiUrl = 'https://www.omdbapi.com/?apikey=7392b8d6&';

function Loader() {
    return <p className="loader">Loading...</p>
  }

export default function MovieDetails({ selectedId,  onCloseMovie, onAddWatched, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const titleRef = useRef(document.title);
    const countRef = useRef(0);
  
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
        runtime: Number(runtime.split(" ")[0]),
        countRating: 
      };
      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }

    useEffect(() => {
        countRef.current = userRating ? countRef.current + 1 : 0;
    }, [userRating]);
  
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
  
    useEffect(() => {
      const originalTitle = titleRef.current;
      title && (document.title = `Movie ${title}`);
  
      return () => {
        document.title = originalTitle;
      }
    }, [title]);
  
    useEffect(() => {
      const onKeyDown = function(e) {
        if(e.code === 'Escape') {
          onCloseMovie();
        }
      };
  
      document.addEventListener('keydown', onKeyDown);
  
      return () => {
        document.removeEventListener('keydown', onKeyDown);
      }
    }, [onCloseMovie]);
  
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