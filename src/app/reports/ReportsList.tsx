import React from "react";
import { Report } from "../shared/interfaces/reports.interfaces";

const ReportsList: React.FC<{ reports: Report[] }> = ({ reports }) => {
  return (
    <div className="flex flex-col gap-4 p-2">
      {reports.map((report, index) => {
        return (
          <div
            key={index}
            className="w-full bg-blue-200 p-3 rounded-md hover:bg-blue-200/75 text-gray-800"
          >
            {report.submissionDate.toDateString()}
          </div>
        );
      })}
    </div>
  );
};

export default ReportsList;
