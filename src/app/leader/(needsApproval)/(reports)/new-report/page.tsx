import prisma from "@/lib/prisma";
import { authOptions, IUserSession } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ReportForm from "./NewReport";

const NewReportPage = async () => {
  const session: IUserSession = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return redirect("/");

  const leaderId = user?.id;

  const group = await prisma.group.findFirst({
    where: {
      leaderId: leaderId,
      active: true,
    },
  });

  const groupId = group?.id;

  //NOTE: this page should not be accessible if there is no group
  if (!groupId) throw new Error("No group found");

  const members = await prisma.member.findMany({
    where: { groupId: groupId as string, isDeleted: false },
  });

  return (
    <>
      <ReportForm leaderId={leaderId} groupId={groupId} members={members} />
    </>
  );
};

export default NewReportPage;
