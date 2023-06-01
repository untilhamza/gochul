import * as React from "react";
import PageContent from "@/components/PageContent";
import GroupRequired from "@/components/group/GroupRequired";
import { getServerSession } from "next-auth";
import { IUserSession } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

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

  return <>{children}</>;
}
