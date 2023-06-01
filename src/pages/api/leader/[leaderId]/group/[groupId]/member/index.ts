import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Member } from "@prisma/client";

// GET api/leader/[leaderId]/group/[groupId]/member/
// -- get all members of a group

// POST api/leader/[leaderId]/group/[groupId]/member/
// -- create a member
// Required fields  firstName: string

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

    const groupId = req.query.groupId;
    const leaderId = req.query.leaderId;

    const groupFromDB = await prisma.group.findFirst({
      where: {
        id: groupId as string,
        leaderId: leaderId as string,
        active: true,
      },
    });

    if (!groupFromDB) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (req.method === "GET") {
      const membersFromDB = await prisma.member.findMany({
        where: { groupId: groupId as string, isDeleted: false },
      });

      return res.status(200).json(membersFromDB);
    } else if (req.method === "POST") {
      const member: Member = req.body;

      if (!member.firstName) {
        return res
          .status(400)
          .json({ error: "Missing required field firstName" });
      }

      const memberFromDB = await prisma.member.create({
        data: {
          ...member,
          groupId: groupId as string,
        },
      });

      return res.status(200).json(memberFromDB);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server error, Unable to update member" });
  }
}
