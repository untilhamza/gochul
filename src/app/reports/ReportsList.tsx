import React from "react";
import { Report } from "../shared/interfaces/reports.interfaces";
import ReportItem from "./ReportItem";

const ReportsList: React.FC<{ reports: Report[] }> = ({ reports }) => {
  return (
    <div className="flex flex-col gap-4 p-2">
      {reports.map((report, index) => {
        return (
          <ReportItem key={index} submissionDate={report.submissionDate} />
        );
      })}
    </div>
  );
};

export default ReportsList;
