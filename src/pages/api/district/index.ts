import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Group_District, District } from "@prisma/client";

//POST /api/district
// Required fields in body: name

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // if (!session) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name } = req.body;
  // const user = session.user;

  // const userFromDB = await prisma.gochulUser.findUnique({
  //   where: { email: user?.email || "" },
  // });

  // if (!userFromDB) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }

  if (!name) {
    return res.status(400).json({ error: "Missing name" });
  }

  if (!Object.values(Group_District).includes(name)) {
    return res.status(400).json({ error: "Invalid district" });
  }

  const data = {
    name: name,
  };

  const result = await prisma.district.create({
    data: data,
  });
  return res.json(result);
}
