import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
function Movies({ movies, onSelectedMovie, isLoading, error }) {
  return (
    <div className="flex flex-col bg-teal-900  overflow-y-scroll rounded-xl  md:w-1/2 h-screen drop-shadow-kxl ">
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <Loader />
      ) : (
        movies.map((movie) => {
          return (
            <div
              key={movie.imdbID}
              className="p-4 border-b border-teal-800 hover:bg-teal-600 flex flex-row space-x-8"
              onClick={() => onSelectedMovie(movie.imdbID)}
            >
              <img
                src={movie.Poster}
                alt="profile"
                key={movie.imdbID}
                className="w-[50px]"
              />
              <div className="flex flex-col text-teal-100  justify-center">
                <div className="font-bold text-lg">{movie.Title}</div>
                <div>
                  <span>🗓</span> <span>{movie.Year}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Movies;
