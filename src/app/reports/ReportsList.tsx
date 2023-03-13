import React from "react";

import { Report } from "../shared/interfaces/reports.interfaces";
import ReportListItem from "./ReportListItem";

const ReportsList: React.FC<{ reports: Report[] }> = ({ reports }) => {
  // Use "data-superjson" attribute to pass non-serializable props to client components
  return (
    <div className="flex flex-col gap-4 p-2">
      {reports.map((report, index) => {
        return (
          <ReportListItem
            key={index}
            submissionDate={report.submissionDate}
            reportId={report.id}
            data-superjson
          />
        );
      })}
    </div>
  );
};

export default ReportsList;
