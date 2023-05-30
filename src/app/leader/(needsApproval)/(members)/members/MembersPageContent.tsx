"use client";
//TODO: turn it into a server component to fetch the group data and the members data before rendering the page
//TODO: the data will be given to the memebers page as props
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import MemberList from "../../../../../components/members/MemberList";
import { useRouter } from "next/navigation";
import useSWR, { Fetcher, useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import { IGroupData } from "../../(group)/group/page";
import ErrorPageDetails from "@/components/error/ErrorPageDetails";

//@ts-ignore
const fetchMemberData: Fetcher = (...args) =>
  //@ts-ignore
  fetch(...args).then((res) => res.json());

const MembersPageContent = ({ groupId }: { groupId: string }) => {
  const router = useRouter();
  const [searchMemberName, setSearchMemberName] = React.useState<string>("");
  const { data: session, status } = useSession({
    required: true,
  });

  //@ts-ignore
  const leaderId = session?.user?.id;

  console.log("leaderId", leaderId);
  console.log("groupId", groupId);

  const {
    data: membersData,
    error,
    isLoading,
  } = useSWR(
    `/api/leader/${leaderId}/group/${groupId}/member`,
    fetchMemberData
  ) as {
    data: any[];
    error: Error;
    isLoading: boolean;
  };

  if (isLoading) return <div>loading...</div>;

  if (error) {
    return <ErrorPageDetails />;
  }

  console.log("members data", membersData);

  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by name"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                value={searchMemberName}
                onChange={(e) => setSearchMemberName(e.target.value)}
              />
            </Grid>
            <Grid item>
              {/* TODO: you can put this at the bottom */}
              {/* <button
                className="inline-flex justify-center rounded-md ms-auto bg-indigo-500 py-2 px-3 font-semibold text-white shadow-sm hover:bg-indigo-600 "
                onClick={() => router.push("leader/new-member")}
              >
                Add Member
              </button> */}
              <Tooltip title="Reload">
                <IconButton
                  onClick={() => {
                    setSearchMemberName("");
                    //TODO: fetch group members from the database
                  }}
                >
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <MemberList
        searchMemberName={searchMemberName}
        members={membersData}
        leaderId={leaderId}
        groupId={groupId}
      />
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        You can add new members in the new-members tab.
      </Typography>
    </Paper>
  );
};

export default MembersPageContent;
