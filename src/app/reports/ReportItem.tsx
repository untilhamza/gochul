import React from "react";

const ReportItem: React.FC<{ submissionDate: Date }> = ({ submissionDate }) => {
  return (
    <div className="w-full bg-blue-200 p-3 rounded-md hover:bg-blue-200/75 text-gray-800">
      {submissionDate.toDateString()}
    </div>
  );
};

export default ReportItem;
