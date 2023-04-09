"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { REPORTS } from "@/shared/data/reports.data";
import ReportView from "../../../../components/reports/ReportView";
import ReportsList from "../../../../components/reports/ReportsList";

export default function Page() {
  //TODO: fetch reports from the database for given group
  return (
    <div className="max-w-[936] m-auto overflow-hidden rounded-lg">
      <TopSection />
      {REPORTS.length ? (
        <ReportsList reports={REPORTS} />
      ) : (
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          No reports submitted yet
        </Typography>
      )}
    </div>
  );
}

const TopSection = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FolderOpenIcon color="inherit" sx={{ display: "block" }} />
          </Grid>
          <Grid item xs>
            {/* <TextField
              fullWidth
              placeholder="Search reports"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default" },
              }}
              variant="standard"
            /> */}
            <h2 className="font-bold">Reports</h2>
          </Grid>
          <Grid item>
            <button
              className="ms-1 inline-flex justify-center rounded-md ms-auto bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={() => router.push("leader/new-report")}
            >
              Add Report
            </button>
            <Tooltip title="Reload">
              <IconButton
                onClick={() => {
                  router.refresh();
                }}
              >
                <RefreshIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
