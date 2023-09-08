import WatchedMovies from "@/components/WatchedMovies";
import Hero from "@/components/hero";
import Movies from "@/components/movies";
import Head from "next/head";
import { useState, useEffect } from "react";
const KEY = "d438043";

function AppMain() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${search}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (search.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      getMovies();
      return function () {
        controller.abort();
      };
    },
    [search]
  );
  return (
    <div>
      <Head>
        <title>KMDb</title>
      </Head>
      <Hero search={search} setSearch={setSearch} />
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 md:px-32 px-6 py-2 md:py-4 bg-black">
        <Movies
          movies={movies}
          onSelectedMovie={handleSelectedMovie}
          onCloseMovie={handleCloseMovie}
          isLoading={isLoading}
          error={error}
        />
        <WatchedMovies
          selectedId={selectedId}
          onCloseMovie={handleCloseMovie}
        />
      </div>
    </div>
  );
}

export default AppMain;
