import { authOptions, IUserSession } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import MembersPageContent from "./MembersPageContent";
import { redirect } from "next/navigation";

const GroupMembersListPage = async () => {
  const session: IUserSession = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const user = session?.user;
  const userId = user?.id;

  const group = await prisma.group.findFirst({
    where: {
      leaderId: userId,
      active: true,
    },
  });

  if (!group) throw new Error("No group found");

  const groupId = group?.id;

  return <MembersPageContent groupId={groupId} />;
};

export default GroupMembersListPage;
