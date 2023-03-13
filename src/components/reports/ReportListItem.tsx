"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

const ReportListItem: React.FC<{ submissionDate: Date; reportId: string }> = ({
  submissionDate,
  reportId,
}) => {
  const router = useRouter();
  return (
    <li key={reportId} className="p-2 mb-1 items-center  hover:bg-gray-100">
      <div
        className="cursor-pointer flex items-center p-2 rounded-md"
        onClick={() => router.push(`reports/${reportId}`)}
      >
        <span className="flex-1">
          {" "}
          <h3 className={`text-lg font-bold flex ${inter.className} `}>
            Group Report
          </h3>
          <p className="italic">
            Submitted on: &nbsp;
            {submissionDate.toDateString()}
          </p>
        </span>

        <span className="inline-block justify-self-end text-2xl font-bold">
          &rarr;
        </span>
      </div>

      {/* <div className="flex justify-start md:justify-end col-span-2">
        <button className="text-blue-600 py-2 px-3  cursor-pointer">
          View
        </button>
        <button className="text-red-500  cursor-pointer">Delete</button>
      </div> */}
      {/* icon {submissionDate.toDateString()} */}
    </li>
  );
};

export default ReportListItem;
