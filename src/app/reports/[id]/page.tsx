import React from "react";
import ReportView from "./ReportView";
import { REPORTS } from "@/app/shared/data/reports.data";
import { Report } from "@/app/shared/interfaces/reports.interfaces";

const SAMPLE_REPORT_DATA: Report = {
  id: "1",
  submissionDate: new Date(),
  leader: {
    id: "1",
    name: "Angel",
  },
  membersPresent: [
    {
      id: "1",
      name: "Angel",
    },
    {
      id: "2",
      name: "Bryan",
    },
    {
      id: "3",
      name: "Cindy",
    },
  ],
  eventsActivities: "We had a great time!",
  online: true,
  prayerRequests: "Pray for the world",
};

const page = () => {
  // const { id } = useParams<{ id: string }>();
  //TODO: choose the correct report from the list of reports
  return <ReportView reportData={SAMPLE_REPORT_DATA} />;
};

export default page;
