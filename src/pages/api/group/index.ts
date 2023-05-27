import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Group, Group_District } from "@prisma/client";

//POST /api/group
// Required fields in body: district

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { district } = req.body;
  const user = session.user;

  const userFromDB = await prisma.gochulUser.findUnique({
    where: { email: user?.email || "" },
  });

  if (!userFromDB) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!district) {
    return res.status(400).json({ error: "Missing district" });
  }

  if (!Object.values(Group_District).includes(district)) {
    return res.status(400).json({ error: "Invalid district" });
  }

  const districtFromDB = await prisma.district.findUnique({
    where: { name: district },
  });

  if (!districtFromDB) {
    return res.status(400).json({ error: "Invalid district" });
  }

  const data = {
    districtId: districtFromDB.id,
    leaderId: userFromDB.id,
  };

  const result = await prisma.group.create({
    data: data,
  });
  return res.json(result);
}
