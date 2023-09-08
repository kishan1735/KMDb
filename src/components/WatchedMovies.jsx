/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element

import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import { useSession } from "next-auth/react";

const KEY = "d438043";

function WatchedMovies({ selectedId, onCloseMovie }) {
  const { data: session, status } = useSession();
  useEffect(
    function () {
      if (status === "unauthenticated") {
        localStorage.setItem("watched", "[]");
      }
    },
    [status]
  );

  const [userRating, setUserRating] = useState(null);
  const [watched, setWatched] = useState([]);

  useEffect(function () {
    const storedValue = window.localStorage.getItem("watched");
    setWatched(() => {
      return JSON.parse(storedValue);
    });
    // }
  }, []);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  function handleAdd() {
    setWatched([
      ...watched,
      {
        imdbID: movie.imdbID,
        poster: movie.Poster,
        title: movie.Title,
        imdbRating: movie.imdbRating,
        runTime: movie.Runtime,
        userRating,
      },
    ]);

    onCloseMovie();
    setUserRating(0);
  }
  function handleWatchedDelete(id) {
    setWatched(() => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      }
      getMovieDetails();
      setIsLoading(false);
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (watched?.length !== 0)
        window.localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <div className="flex flex-col bg-teal-900 rounded-xl  md:w-1/2 h-[100vh] drop-shadow-kxl">
      <div
        className={`flex flex-col px-4 py-4 space-y-2 bg-teal-800 rounded-t-xl shadow-sm shadow-teal-950 border-2 border-teal-900`}
      >
        <div className="font-black text-xl text-teal-200 text-center">
          Movies You Watched
        </div>
        <div className="flex space-x-2 justify-around text-teal-100 font-bold">
          <p>
            <span>#️⃣</span> {watched.length}{" "}
            {watched.length === 1 ? "movie" : "movies"}
          </p>
          <p>
            <span>⭐</span>{" "}
            {watched.length === 0
              ? 0
              : (
                  watched
                    .map((el) => +el.imdbRating)
                    .reduce((acc, cur, _, arr) => acc + cur, 0) / watched.length
                ).toFixed(2)}
          </p>
          <p>
            <span>🌟</span>{" "}
            {watched.length === 0
              ? 0
              : (
                  watched
                    .map((el) => +el.imdbRating)
                    .reduce((acc, cur, _, arr) => acc + cur, 0) / watched.length
                ).toFixed(2)}
          </p>
          <p>
            <span>⌛</span>{" "}
            {watched.length === 0
              ? 0
              : (
                  watched
                    .map((el) => Number.parseInt(el.runTime))
                    .reduce((acc, cur, _, arr) => acc + cur, 0) / watched.length
                ).toFixed(2)}{" "}
            min
          </p>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : selectedId ? (
        <div className="flex flex-col space-y-4">
          <header className="flex spcae-y-4 md:space-x-8 border-b border-teal-950 shadow-sm shadow-teal-950 py-4 px-4">
            <button
              className="bg-teal-200 rounded-full my-12 mr-2 px-4 py-3 text-xl font-bold text-black"
              onClick={onCloseMovie}
            >
              &larr;
            </button>

            <img
              src={movie.Poster}
              alt={`Poster of ${movie} movie`}
              className="w-[100px]"
            />
            <div className="pl-6 md:pl-12 text-center flex flex-col justify-center">
              <h2 className="font-bold text-xl text-teal-200 mb-2">
                {movie.Title}
              </h2>
              <p className="font-bold text-lg text-teal-300">
                {movie.Released} | {movie.Runtime}
              </p>
              <p className="font-bold text-lg text-teal-300">
                <span>⭐</span> {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <div className="">
            {!isWatched ? (
              <div className="flex flex-col items-center space-y-2">
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                  className=""
                />

                {userRating > 0 && (
                  <button
                    onClick={handleAdd}
                    className="text-teal-100 bg-teal-950 w-1/4 px-3 py-1 border-2 border-teal-800"
                  >
                    + Add to list
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center font-bold text-lg text-teal-200">
                You rated this movie with {watchedUserRating} ⭐
              </div>
            )}
          </div>
          <section className="px-4">
            <p className="text-teal-300 italic mb-1">{movie.Plot}</p>
            <p className=" text-teal-200">
              <span className="text-teal-100 font-bold">Starring :</span>{" "}
              {movie.Actors}
            </p>
            <p className=" text-teal-200">
              <span className="text-teal-100 font-bold">Directed by :</span>{" "}
              {movie.Director}
            </p>
          </section>
        </div>
      ) : (
        <WatchedMoviesList
          watched={watched}
          handleWatchedDelete={handleWatchedDelete}
        />
      )}
    </div>
  );
}

export default WatchedMovies;
