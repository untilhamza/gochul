import React from "react";
import ReportListItem from "./ReportListItem";

const ReportsList: React.FC<{ reports: Report[] }> = ({ reports }) => {
  // Use "data-superjson" attribute to pass non-serializable props to client components
  return (
    <>
      {" "}
      {/* <h2 className="py-2 font-bold text-xl my-1 mt-2">Submitted Reports.</h2> */}
      <ul className="border border-slate-200 divide-y divide-slate-300 mt-3">
        {reports &&
          reports.map((report, index) => {
            return (
              <ReportListItem
                key={report.id}
                submissionDate={report.submissionDate}
                reportId={report.id}
              />
            );
          })}
      </ul>
    </>
  );
};

export default ReportsList;
