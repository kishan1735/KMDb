import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";

function LoginPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
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
    <>
      <Head>
        <title>KMDb</title>
      </Head>
      <div className="h-screen bg-black flex flex-col items-center justify-center font-bold text-lg md:text-xl">
        <div className="bg-white rounded-xl px-8 py-6 flex flex-col space-y-4">
          <div className="flex justify-center pt-2 uppercase text-xl font-black tracking-widest">
            Login to get started
          </div>
          {session ? (
            <div className="flex justify-center pt-2">
              <div className="flex justify-center pt-2">
                <button className="btn" onClick={() => signOut()}>
                  LogOut of Google
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center pt-2">
              <button className="btn" onClick={() => signIn("google")}>
                LogIn With Google
              </button>
            </div>
          )}
          {session ? (
            <Link href="/appMain">
              <button className="btn bg-white opacity-90">
                Enter the world of KMDb
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
