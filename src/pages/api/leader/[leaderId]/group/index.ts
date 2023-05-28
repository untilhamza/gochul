import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";

//POST /api/group
// Required fields in body: district

//GET /api/group

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "POST") {
      const { district } = req.body;
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

      if (!district) {
        return res.status(400).json({ error: "Missing district" });
      }

      const districtFromDB = await prisma.district.findUnique({
        where: { name: district },
      });

      if (!districtFromDB) {
        return res.status(400).json({ error: "Invalid district" });
      }

      //TODO: a group should only be if the leader does not already have a group

      const hasActiveGroup = await prisma.group.findFirst({
        where: {
          leaderId: req.query.leaderId as string,
          active: true,
        },
      });

      if (hasActiveGroup) {
        return res.status(400).json({ error: "Leader already has a group" });
      }

      const result = await prisma.group.create({
        data: {
          district: {
            connect: { name: district },
          },
          leader: {
            connect: { email: userFromDB.email! },
          },
          active: true,
        },
      });

      return res.status(200).json(result);
    } else if (req.method === "GET") {
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

      const groups = await prisma.group.findMany({
        where: {
          leaderId: req.query.leaderId as string,
          active: true,
        },
        include: {
          leader: true,
          district: true,
          Member: true,
        },
      });

      return res.status(200).json(groups);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error: any) {
    console.error("Error creating group:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
