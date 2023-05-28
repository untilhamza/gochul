import NewGroupForm from "@/components/group/NewGroupForm";
import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { IUserSession } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    },
  });

  if (group) {
    // return redirect("/leader/group");
    return (
      <div className="mt-10 sm:mt-0 ">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Create New Group
              </h3>
              <p className="md:mt-1 text-sm text-gray-600">
                You can create a new group here.
              </p>
            </div>
          </div>
          <div className="md:mt-5 md:col-span-2 md:mt-0">
            <div>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6 md:h-[230px]">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <div className="flex flex-col align-middle justify-center gap-3">
                        <p className="text-lg font-semibold text-gray-900">
                          Sorry, You already have a group.
                        </p>
                        <p className="text-sm text-gray-600">
                          You can only have one group. If you want to create a
                          new group, please deactivate your current group.
                        </p>
                        <Link
                          className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          href="/leader/group"
                        >
                          Go to Group Info
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <NewGroupForm />;
};

export default page;
