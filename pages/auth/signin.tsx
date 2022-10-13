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
  const [email, setEmail] = useState<string | null>(null);

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!email) return false;

    signIn("email", { email, redirect: false });
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
      <form
        className="pb-10 flex items-center flex-col"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
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
