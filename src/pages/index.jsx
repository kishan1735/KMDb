import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

function HomePage() {
  // const { data: session } = useSession();
  // console.log(session);
  return (
    <>
      <Head>
        <title>KMDb</title>
      </Head>
      <div
        id="home"
        className="h-screen flex flex-col items-center text-center justify-center px-4 space-y-6"
      >
        <Link href="/login">
          <button className="bg-white opacity-90 border-4 border-black text-4xl px-4 w-full md:w-1/3 font-black font-sans uppercase tracking-wider  py-10 duration-200 hover:scale-105">
            Enter the World of Movies with KMDb
          </button>
        </Link>

        {/* {session ? (
          <Link href="/appMain">
            <button className="btn bg-white opacity-90">
              Enter the world of KMDb
            </button>
          </Link>
        ) : ( */}
        <Link href="/login">
          <button className="btn bg-white opacity-90">
            Login to Get Started
          </button>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
