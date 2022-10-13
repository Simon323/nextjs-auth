import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

interface Providers {
  name: string;
}

const providers: Providers[] = [
  { name: "github" },
  { name: "twitter" },
  { name: "google" },
];

function Signin() {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider);
  };

  if (status === "loading") {
    return <h1>Checking authentication...</h1>;
  }

  if (session) {
    setTimeout(() => {
      push("/");
    }, 5000);
    return <h1>you are already signed in</h1>;
  }

  return (
    <div className="flex flex-col">
      {providers.map(({ name }, index) => (
        <button
          key={index}
          onClick={() => handleOAuthSignIn(name)}
          type="button"
          className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
        >
          Sign in with {name}
        </button>
      ))}
    </div>
  );
}

export default Signin;
