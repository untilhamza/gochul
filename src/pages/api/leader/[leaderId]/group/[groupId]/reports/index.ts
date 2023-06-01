// GET /reports
// POST /reports

// path: src/pages/api/leader/[leaderId]/group/[groupId]/reports/index.ts

import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { isAdminOrLeader } from "@/utils/apiUtils";
import { Report, Member } from "@prisma/client";

// GET api/leader/[leaderId]/group/[groupId]/reports/
// -- get all members of a group

// POST api/leader/[leaderId]/group/[groupId]/reports/
// -- create a member
// Required fields  firstName: string

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userFromDB = await isAdminOrLeader(req, res);

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
      const reportsFromDB = await prisma.report.findMany({
        where: { groupId: groupId as string },
      });

      return res.status(200).json(reportsFromDB);
    } else if (req.method === "POST") {
      const report: Report = req.body;
      // if (!report.title) {
      //   return res.status(400).json({ error: "Missing required field title" });
      // }
      const reportFromDB = await prisma.report.create({
        data: {
          ...report,
          groupId: groupId as string,
        },
      });
      return res.status(200).json(reportFromDB);
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
