import * as React from "react";
import PageContent from "@/components/PageContent";
import GroupRequired from "@/components/group/GroupRequired";
import { getServerSession } from "next-auth";
import { IUserSession } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

const groupTabs: PageTab[] = [
  {
    label: "Group Info",
    path: "leader/group",
  },
  {
    label: "Create Group",
    path: "leader/new-group",
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
    <PageContent pageName="Groups" tabs={groupTabs} showTabs={true}>
      {children}
    </PageContent>
  );
}
