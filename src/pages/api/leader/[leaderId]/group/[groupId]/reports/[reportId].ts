// GET /reports/reportId
// PUT /reports/reportId
// DELETE /reports/reportId
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Report, Member } from "@prisma/client";

// GET api/leader/[leaderId]/group/[groupId]/member/[memberId]

// PUT api/leader/[leaderId]/group/[groupId]/member/[memberId]
// Required fields  firstName: string

// DELETE api/leader/[leaderId]/group/[groupId]/member/[memberId]

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
    const memberId = req.query.memberId;

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
      const memberFromDB = await prisma.member.findFirst({
        where: {
          id: memberId as string,
          groupId: groupId as string,
          isDeleted: false,
        },
      });

      if (!memberFromDB) {
        return res.status(404).json({ error: "Member not found" });
      }

      return res.status(200).json(memberFromDB);
    } else if (req.method === "PUT") {
      const { firstName, isDeleted, lastName, country }: Member = req.body;

      // if name is not provided, return error
      if (!firstName) {
        return res.status(400).json({ error: "Missing firstName" });
      }

      // DELETE must be done through DELETE method
      if (isDeleted !== undefined && isDeleted === true) {
        return res.status(400).json({ error: "Cannot delete a member" });
      }

      const memberFromDB = await prisma.member.findFirst({
        where: {
          id: memberId as string,
          groupId: groupId as string,
          isDeleted: false,
        },
      });

      if (!memberFromDB) {
        return res.status(404).json({ error: "Member not found" });
      }

      const newData = {} as Member;

      if (firstName) {
        newData.firstName = firstName;
      }

      if (lastName) {
        newData.lastName = lastName;
      }

      if (country) {
        newData.country = country;
      }

      const member: Member = await prisma.member.update({
        where: { id: memberId as string },
        data: {
          ...newData,
        },
      });

      return res.status(200).json(member);
    } else if (req.method === "DELETE") {
      const memberFromDB = await prisma.member.findFirst({
        where: {
          id: memberId as string,
          groupId: groupId as string,
          isDeleted: false,
        },
      });

      if (!memberFromDB) {
        return res.status(404).json({ error: "Member not found" });
      }

      // do soft delete
      await prisma.member.update({
        where: { id: memberId as string },
        data: { isDeleted: true },
      });

      return res.status(200).json({ message: "Member deleted" });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to update member" });
  }
}
