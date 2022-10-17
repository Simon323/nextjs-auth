import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({
    req,
  });

  if (session) return res.send(session);

  return res.status(401).send("Not authenticated");
};

export default handler;
