import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import "dotenv/config";

function Hero({ search, setSearch }) {
  const { data: session, status } = useSession();
  useEffect(
    function () {
      if (status === "unauthenticated") {
        localStorage.setItem("watched", "[]");
      }
    },
    [status]
  );
  return (
    <div className="flex justify-between items-center bg-teal-900 py-4 px-6 ">
      <Link href="/">
        <div className="font-alata font-black text-xl text-white hover:text-pink-400">
          <span className="text-2xl">🍿</span> KMDb
        </div>
      </Link>
      <input
        type="text"
        className="rounded-xl py-2 px-8  md:px-32 text-center text-black font-bold text-xl border-2 border-teal-200"
        value={search}
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      {session ? (
        <button
          className="text-teal-900 font-bold text-xl px-2 py-1 border-teal-800 border-2-2 bg-teal-400 hover:bg-teal-800 hover:border-teal-400 hover:text-teal-400"
          onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}
        >
          Signout
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Hero;
