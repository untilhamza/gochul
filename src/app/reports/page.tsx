"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

import ReportView from "./[id]/ReportView";
import { Report } from "../shared/interfaces/reports.interfaces";

const SAMPLE_REPORTS: Report[] = [
  {
    membersPresent: [
      { name: "Leader", id: "1" },
      { name: "Apple", id: "2" },
      { name: "Pear", id: "3" },
      { name: "Orange", id: "4" },
      { name: "Banana", id: "5" },
    ],
    eventsActivities: "We had a great time",
    online: true,
    prayerRequests: "Pray for my family",
    submissionDate: new Date(),
  },
  {
    membersPresent: [
      { name: "Leader", id: "1" },
      { name: "Apple", id: "2" },
      { name: "Pear", id: "3" },
      { name: "Orange", id: "4" },
      { name: "Banana", id: "5" },
    ],
    eventsActivities: "We had a great time",
    online: true,
    prayerRequests: "Pray for my family",
    submissionDate: new Date(),
  },
];

// TODO: this will render a list of reports from the database for a given group
export default function Page() {
  // {
  //   SAMPLE_REPORTS.map((report, index) => {
  //     return <ReportView key={index} reportData={report} />;
  //   });
  // }
  // return <ReportView reportData={SAMPLE_REPORT} />;
  return (
    <div className="max-w-[936] m-auto overflow-hidden rounded-lg">
      <TopSection />
      {
        /* Reports list */
        SAMPLE_REPORTS.length ? (
          <div className="flex flex-col gap-4 p-2">
            {SAMPLE_REPORTS.map((report, index) => {
              return (
                <div key={index} className="w-full bg-blue-100 p-3 rounded-md">
                  {report.submissionDate.toDateString()}
                </div>
              );
            })}
          </div>
        ) : (
          <Typography
            sx={{ my: 5, mx: 2 }}
            color="text.secondary"
            align="center"
          >
            No reports submitted yet
          </Typography>
        )
      }
    </div>
  );
}

const TopSection = () => {
  const router = useRouter();
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
            <SearchIcon color="inherit" sx={{ display: "block" }} />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Search reports"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default" },
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <button
              className="mr-1 bg-blue-400 text-white px-2 py-1 rounded-md hover:bg-blue-500 active:bg-blue-400"
              onClick={() => {
                router.push("/reports/new");
              }}
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
