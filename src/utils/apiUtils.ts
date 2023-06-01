import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const isAdminOrLeader = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = session.user;

  const userFromDB = await prisma.gochulUser.findUnique({
    where: { email: user?.email || "" },
  });

  if (
    !userFromDB ||
    (userFromDB.role !== "ADMIN" && userFromDB.role !== "LEADER")
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return userFromDB;
};
