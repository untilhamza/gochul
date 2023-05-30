"use client";
import { useState, useEffect, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Group, District, Member, GochulUser } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR, { Fetcher, useSWRConfig } from "swr";
import Link from "next/link";
import Swal from "sweetalert2";
import GroupRequired from "@/components/group/GroupRequired";

export interface IGroupData extends Group {
  district: District;
  Member: Member[];
  leader: GochulUser;
}

const MembersPage = () => {
  const { data: session, status } = useSession();
  const { mutate } = useSWRConfig();
  //@ts-ignore
  const fetchGroupData: Fetcher = (...args) =>
    //@ts-ignore
    fetch(...args).then((res) => res.json());

  //@ts-ignore
  const leaderId = session?.user?.id;

  const handleDeactivateGroup = async (e: MouseEvent, groupId: string) => {
    e.preventDefault();
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    });

    const payload = {
      active: false,
    };

    if (isConfirmed) {
      try {
        const response = await fetch(
          `/api/leader/${leaderId}/group/${groupId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) throw new Error("Something went wrong!");
        const data = await response.json();
        if (data) {
          Swal.fire(
            "Deactivated!",
            "Your group has been deactivated.",
            "success"
          );
          mutate(`/api/leader/${leaderId}/group/`);
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Error!",
          "Something went wrong, please try again later.",
          "error"
        );
      }
    }
  };

  const {
    data: groupData,
    error,
    isLoading,
  } = useSWR(`/api/leader/${leaderId}/group/`, fetchGroupData) as {
    data: IGroupData[];
    error: Error;
    isLoading: boolean;
  };

  if (isLoading || status === "loading") return <div>Loading...</div>;

  //TODO: throw an error here and show them the error page
  if (error) return <div>Failed to load!</div>;

  if (!(groupData.length > 0)) {
    return <GroupRequired />;
  }

  const content = (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Group Information
        </h2>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-700 mb-1">Group Leader</p>
          <p className="text-xl text-gray-800">Hamza</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-700 mb-1">District</p>
          <p className="text-xl text-gray-800">COLLEGE</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-700 mb-1">
            Members Count
          </p>
          <p className="text-xl text-gray-800">No members yet</p>
        </div>
        <div className="flex justify-center">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4">
            Deactivate
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Add Members
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          marginBottom: "1rem",
        }}
      >
        <div className="md:grid md:grid-cols-3 md:gap-6 p-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-6 text-gray-900 mb-4">
                Group Information
              </h2>
            </div>
          </div>
          <div className="md:col-span-2">
            {
              <>
                <div className="px-4 sm:px-0">
                  <h4 className="text-base font-medium leading-6 text-gray-600">
                    Group Leader
                  </h4>
                  <p className="md:mt-1 text-base text-gray-800 mb-4">
                    {/* @ts-ignore */}
                    {groupData[0].leader.firstName}{" "}
                  </p>
                </div>
                <div className="px-4 sm:px-0">
                  <h4 className="text-base font-medium leading-6 text-gray-600">
                    District
                  </h4>
                  <p className="md:mt-1 text-base text-gray-800 mb-4">
                    {/* @ts-ignore */}
                    {groupData[0].district.name}
                  </p>
                </div>

                <div className="px-4 sm:px-0">
                  <h4 className="text-base font-medium leading-6 text-gray-600">
                    Members count
                  </h4>
                  <p className="md:mt-1 text-base text-gray-800">
                    {groupData[0].Member.length === 0
                      ? "No members added yet"
                      : groupData[0].Member.length === 1
                      ? "1 member"
                      : groupData[0].Member.length + " members"}
                  </p>
                </div>
              </>
            }
          </div>
        </div>
      </AppBar>

      <div className="px-3 pb-3 flex items-center justify-end">
        {
          <>
            <button
              onClick={(e) => handleDeactivateGroup(e, groupData[0].id)}
              className="inline-flex justify-center rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 mr-4"
            >
              Deactivate
            </button>

            <Link
              href="/leader/new-member"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-md inline-flex justify-center"
            >
              Add Members
            </Link>
          </>
        }
      </div>
    </Paper>
  );
};

export default MembersPage;
