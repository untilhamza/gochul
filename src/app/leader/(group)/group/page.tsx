"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useRouter } from "next/navigation";

const MembersPage = () => {
  const router = useRouter();
  const [searchMemberName, setSearchMemberName] = React.useState<string>("");
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
              <p className="md:mt-1 text-sm text-gray-600">
                This is the group information.
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="px-4 sm:px-0">
              <h4 className="text-base font-semibold leading-6 text-gray-900">
                Group Leader
              </h4>
              <p className="md:mt-1 text-sm text-gray-600">
                [Group Leader Name]
              </p>
            </div>
            <div className="px-4 sm:px-0">
              <h4 className="text-base font-semibold leading-6 text-gray-900">
                District
              </h4>
              <p className="md:mt-1 text-sm text-gray-600">[District Name]</p>
            </div>

            <div className="px-4 sm:px-0">
              <h4 className="text-base font-semibold leading-6 text-gray-900">
                Members
              </h4>
              <p className="md:mt-1 text-sm text-gray-600">[Member count]</p>
            </div>
          </div>
        </div>
      </AppBar>

      <div className="px-3 pb-3 flex items-center justify-end">
        <button className="ms-1 inline-flex justify-center rounded-md ms-auto bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Add new members
        </button>
      </div>
    </Paper>
  );
};

export default MembersPage;
