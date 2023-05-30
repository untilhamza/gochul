"use client";
import React from "react";
import { useRouter } from "next/navigation";
const ReportListItem: React.FC<{ submissionDate: Date; reportId: string }> = ({
  submissionDate,
  reportId,
}) => {
  const router = useRouter();
  return (
    <div
      className="w-full bg-blue-200 p-3 rounded-md hover:bg-blue-200/75 text-gray-800"
      onClick={() => router.push(`leader/reports/${reportId}`)}
    >
      {submissionDate.toDateString()}
    </div>
  );
};

export default ReportListItem;
