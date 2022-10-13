import React from "react";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Home() {
  const { data: session } = useSession();
  const { push, asPath } = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/some" });
    push(data.url);
  };

  const handleSignIn = () => {
    // signIn()
    push(`/auth/signin?callbackUrl=${asPath}`);
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center flex-col">
        {session ? (
          <>
            <h1 className="p-3">Signed in as {session.user?.email}</h1>
            <button
              onClick={handleSignOut}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            <h1 className="p-3">You are not signed in</h1>
            <button
              onClick={handleSignIn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign in
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
