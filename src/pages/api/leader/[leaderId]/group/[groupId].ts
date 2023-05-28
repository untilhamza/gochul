import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";

//PUT /api/group/id
// Required fields in body:  active
//NOTE: update district is not supported
//NOTE: update leader is not supported

//GET /api/group/id

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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

    if (req.method === "PUT") {
      const { district, active } = req.body;

      // if is active data is not provided, return error
      if (active === undefined) {
        return res.status(400).json({ error: "Missing active" });
      }

      if (district) {
        const districtFromDB = await prisma.district.findUnique({
          where: { name: district },
        });

        if (!districtFromDB) {
          return res.status(404).json({ error: "District not found" });
        }
      }

      const groupId = req.query.groupId;
      const leaderId = req.query.leaderId;

      const groupFromDB = await prisma.group.findFirst({
        where: { id: groupId as string, leaderId: leaderId as string },
      });

      if (!groupFromDB) {
        return res.status(404).json({ error: "Group not found" });
      }

      const updatedGroup = await prisma.group.update({
        where: { id: groupId as string },
        data: {
          //NOTE: Prevent updating group districts for now
          // districtId: district ? district : groupFromDB.districtId,
          active: active,
        },
      });

      return res.status(200).json({ group: updatedGroup });
    } else if (req.method === "GET") {
      const groupId = req.query.groupId;
      const leaderId = req.query.leaderId;

      const groupFromDB = await prisma.group.findFirst({
        where: { id: groupId as string, leaderId: leaderId as string },
      });

      if (!groupFromDB) {
        return res.status(404).json({ error: "Group not found" });
      }

      return res.status(200).json({ group: groupFromDB });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
