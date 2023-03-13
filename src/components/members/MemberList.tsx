import React from "react";
import { Members } from "../../shared/data/members.data";
import MemberListItem from "./MemberListItem";

const MemberList: React.FC<{ searchMemberName?: string }> = ({
  searchMemberName = "",
}) => {
  return (
    <div className="p-3">
      <h3 className="py-2 font-semibold">Members in the group.</h3>
      <ul className="border border-slate-200 divide-y divide-slate-300">
        {Members.filter(
          (member) =>
            member.firstName
              .toLowerCase()
              .includes(searchMemberName.toLowerCase()) ||
            member.lastName
              ?.toLowerCase()
              .includes(searchMemberName.toLowerCase())
        ).map((member) => (
          <MemberListItem key={member.id} member={member} />
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
