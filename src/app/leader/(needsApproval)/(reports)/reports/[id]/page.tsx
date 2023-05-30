import React from "react";
import ReportView from "../../../../../../components/reports/ReportView";
import { REPORTS } from "@/shared/data/reports.data";

const SAMPLE_REPORT_DATA: Report = {
  id: "1",
  submissionDate: new Date(),
  leader: {
    id: "1",
    firstName: "Angel",
  },
  membersPresent: [
    {
      id: "1",
      firstName: "Angel",
    },
    {
      id: "2",
      firstName: "Bryan",
    },
    {
      id: "3",
      firstName: "Cindy",
    },
  ],
  eventsActivities: "We had a great time!",
  online: true,
  prayerRequests: "Pray for the world",
};

const page = () => {
  // const { id } = useParams<{ id: string }>();
  //TODO: choose the correct report from the list of reports
  return <ReportView reportData={SAMPLE_REPORT_DATA} data-superjson />;
};

export default page;
