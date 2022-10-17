import React from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

function Protected() {
  const { push } = useRouter();
  const { data: session, status } = useSession();

  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated: () => {
  //     push("/auth/signin");
  //   },
  // });

  if (status === "unauthenticated") {
    return <h1>Protected page unauthenticated</h1>;
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Protected;
