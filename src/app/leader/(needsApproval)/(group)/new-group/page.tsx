import NewGroupForm from "@/components/group/NewGroupForm";
import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { IUserSession } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import GroupAlreadyCreated from "@/components/group/GroupAlreadyCreated";

const page = async () => {
  //TODO: check if the user already has a group, if so, redirect to group info page
  const session: IUserSession = await getServerSession();

  if (!session) {
    return redirect("/");
  }

  const user = session?.user;
  const email = user?.email;

  const group = await prisma.group.findFirst({
    where: {
      leader: {
        email: email,
      },
      active: true,
    },
  });

  if (group) {
    return <GroupAlreadyCreated />;
  }

  return <NewGroupForm />;
};

export default page;
