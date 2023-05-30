import PageContent from "@/components/PageContent";
import prisma from "@/lib/prisma";
import { IUserSession } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import GroupRequired from "@/components/group/GroupRequired";

const reportTabs: PageTab[] = [
  {
    label: "All Reports",
    path: "leader/reports",
  },
  {
    label: "New Report",
    path: "leader/new-report",
  },
];

export default async function Content({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: IUserSession = await getServerSession();
  const user = session?.user;
  const userId = user?.id;

  const group = await prisma.group.findFirst({
    where: {
      leaderId: userId,
      active: true,
    },
  });

  return (
    <PageContent pageName="Reports" tabs={reportTabs} showTabs={!!group}>
      {group ? children : <GroupRequired />}
    </PageContent>
  );
}
