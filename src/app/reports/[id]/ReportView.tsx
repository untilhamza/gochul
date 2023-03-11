import React from "react";
import { Report, Member } from "@/app/shared/interfaces/reports.interfaces";

const ReportView: React.FC<{ reportData: Report }> = ({ reportData }) => {
  return (
    <div className="prose prose-base">
      <h2 className="mx-auto text-gray-800 my-5">Group Activity Report</h2>
      {/* Submission date */}
      <p className="italic">
        Submitted on: {reportData.submissionDate?.toDateString()}
      </p>
      <h3>Leader</h3>
      <p>Angel</p>
      {/* member present */}
      <h3>Members Present</h3>
      <ul>
        {reportData.membersPresent.map((member: Member) => (
          <li key={member.id}>{member.name}</li>
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
