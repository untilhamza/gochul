import PageContent from "@/components/PageContent";
import { IUserSession } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import GroupRequired from "@/components/group/GroupRequired";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const membersPageTabs: PageTab[] = [
  {
    label: "All Members",
    path: "leader/members",
  },
  {
    label: "New Member",
    path: "leader/new-member",
  },
];

export default async function Content({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: IUserSession = await getServerSession(authOptions);

  const user = session?.user as any;

  console.log(user);

  if (!user) return redirect("/");

  const userId = user?.id;

  const group = await prisma.group.findFirst({
    where: {
      leaderId: userId,
      active: true,
    },
  });

  console.log("group", group);

  return (
    <PageContent pageName="Members" tabs={membersPageTabs} showTabs={!!group}>
      {group ? children : <GroupRequired />}
    </PageContent>
  );
}
