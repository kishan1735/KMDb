function WatchedMoviesList({ watched, handleWatchedDelete }) {
  return (
    <div className="z-50">
      {watched.map((movie) => {
        return (
          <div
            className="flex p-6 space-x-8 md:space-x-10 border-b border-teal-950 shadow-sm shadow-teal-950"
            key={movie.imdbID}
          >
            <img src={movie.poster} alt="watched" className="w-[45px]" />
            <div className="flex flex-col space-y-1">
              <div className="font-bold text-lg text-teal-200">
                {movie.title}
              </div>
              <div className="flex space-x-8 md:space-x-9 font-bold text-teal-300">
                <div>
                  <span>⭐</span> {movie.imdbRating}
                </div>
                <div>
                  <span>🌟</span> {movie.userRating}
                </div>
                <div>
                  <span>⌛</span> {movie.runTime}
                </div>
                <button
                  className="bg-teal-950 rounded-full px-[10px] mt-[-6px] text-xl text-center"
                  onClick={() => handleWatchedDelete(movie.imdbID)}
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WatchedMoviesList;
