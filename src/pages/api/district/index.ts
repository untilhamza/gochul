import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { District } from "@prisma/client";

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

  if (req.method === "POST") {
    try {
      const { name } = req.body;
      // const user = session.user;

      // const userFromDB = await prisma.gochulUser.findUnique({
      //   where: { email: user?.email || "" },
      // });

      //TODO: make sure user is admin
      // if (!userFromDB || userFromDB.role !== "ADMIN") {
      //   return res.status(401).json({ error: "Unauthorized" });
      // }

      if (!name) {
        return res.status(400).json({ error: "Missing name" });
      }

      //make sure district doesn't already exist

      const isDistrictInDB = await prisma.district.findFirst({
        where: { name: name.toUpperCase() },
      });

      if (isDistrictInDB) {
        return res.status(400).json({ error: "District already exists" });
      }

      const data = {
        name: name.toUpperCase(),
      };

      const result = await prisma.district.create({
        data: data,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  } else if (req.method === "GET") {
    //TODO: make sure user is admin
    // if (!userFromDB || userFromDB.role !== "ADMIN") {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }
    try {
      const result = await prisma.district.findMany();
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
