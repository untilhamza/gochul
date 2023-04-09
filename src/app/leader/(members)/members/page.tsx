"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import MemberList from "../../../../components/members/MemberList";
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
              <button
                className="ms-1 inline-flex justify-center rounded-md ms-auto bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={() => router.push("leader/new-member")}
              >
                Add Member
              </button>
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
      <MemberList searchMemberName={searchMemberName} />
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        You can add new members in the new-members tab.
      </Typography>
    </Paper>
  );
};

export default MembersPage;
