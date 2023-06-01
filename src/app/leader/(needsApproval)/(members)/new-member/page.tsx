import NewMemberForm from "@/components/members/NewMemberForm";
import prisma from "@/lib/prisma";
import { IUserSession } from "@/app/api/auth/[...nextauth]/route";
import { Member } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import GroupRequired from "@/components/group/GroupRequired";

const page = async () => {
  const session: IUserSession = await getServerSession();
  const user = session?.user;
  const userId = user?.id;

  const group = await prisma.group.findFirst({
    where: {
      leaderId: userId,
      active: true,
    },
  });

  if (!group) {
    return <GroupRequired />;
  }

  const groupId = group?.id;

  return <NewMemberForm groupId={groupId} />;
};

export default page;
