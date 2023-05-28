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

interface IGroupData extends Group {
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
          Swal.fire("Deleted!", "Your group has been deactivated.", "success");
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
  if (error) return <div>Failed to load!</div>;

  console.log("data", groupData);

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
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Group Information
              </h3>
              <p className="md:mt-1 text-sm text-gray-600 mb-6 border-b-2  border-b-gray-200 pb-3 md:mb-0 md:pb-0 md:border-b-0">
                This is the group information.
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            {groupData.length > 0 ? (
              <>
                <div className="px-4 sm:px-0">
                  <h4 className="text-base font-semibold leading-6 text-gray-900">
                    Group Leader
                  </h4>
                  <p className="md:mt-1 text-sm text-gray-600 mb-3">
                    {/* @ts-ignore */}
                    {groupData[0].leader.firstName}{" "}
                  </p>
                </div>
                <div className="px-4 sm:px-0">
                  <h4 className="text-base font-semibold leading-6 text-gray-900">
                    District
                  </h4>
                  <p className="md:mt-1 text-sm text-gray-600 mb-3">
                    {/* @ts-ignore */}
                    {groupData[0].district.name}
                  </p>
                </div>

                <div className="px-4 sm:px-0">
                  <h4 className="text-base font-semibold leading-6 text-gray-900">
                    Members count
                  </h4>
                  <p className="md:mt-1 text-sm text-gray-600">
                    {groupData[0].Member.length === 0
                      ? "No members yet"
                      : groupData[0].Member.length === 1
                      ? "1 member"
                      : groupData[0].Member.length + " members"}
                  </p>
                </div>
              </>
            ) : (
              <div className="px-4 sm:px-0">
                <p className="text-base font-semibold text-gray-700">
                  You need to create a group first.
                </p>
              </div>
            )}
          </div>
        </div>
      </AppBar>

      <div className="px-3 pb-3 flex items-center justify-end">
        {groupData.length > 0 ? (
          <>
            {" "}
            <button
              onClick={(e) => handleDeactivateGroup(e, groupData[0].id)}
              className="ms-1 inline-flex justify-center rounded-md ms-auto me-3 bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Deactivate group
            </button>{" "}
            <Link
              href="/leader/new-member"
              className="ms-1 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Add new members
            </Link>
          </>
        ) : (
          <Link
            href="/leader/new-group"
            className="ms-1 inline-flex justify-center rounded-md ms-auto bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Create a group
          </Link>
        )}
      </div>
    </Paper>
  );
};

export default MembersPage;
