"use client"; //TODO: will be a server-side component once useParams is implemented in next js 13
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const displayDateOptions: any = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const ReportView: React.FC<{ reportData: Report }> = ({ reportData }) => {
  const [dateString, setDateString] = useState("");
  const router = useRouter();
  console.log("reportData", reportData);

  useEffect(() => {
    setDateString(
      new Date(reportData.submissionDate).toLocaleDateString(
        "en-US",
        displayDateOptions
      )
    );
  }, [reportData.submissionDate]);

  return (
    <div className="prose prose-base min-w-full p-1">
      <div className="flex items-center justify-between py-1">
        <h2 className=" text-gray-800 flex-1 m-0">Group Activity Report</h2>
        <button
          className="inline-flex justify-center rounded-md ms-auto bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      {/* Submission date */}
      <p className="italic">
        Submitted on:
        {dateString}
      </p>
      <h3>Leader</h3>
      <p>Angel</p>
      {/* member present */}
      <h3>Members Present</h3>
      <ul>
        {reportData.membersPresent.map((member: ReportMember) => (
          <li key={member.id}>{member.firstName}</li>
        ))}
      </ul>
      {/* events / activities */}
      <h3>Events / Activities</h3>
      <p>{reportData.eventsActivities}</p>
      {/* online / offline */}
      <h3>Online / Offline</h3>
      <p>{reportData.online ? "Online" : "Offline"}</p>
      {/* prayer requests */}
      <h3>Prayer Requests</h3>
      <p>{reportData.prayerRequests}</p>
    </div>
  );
};

export default ReportView;
