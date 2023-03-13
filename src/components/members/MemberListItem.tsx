import React from "react";

const MemberListItem: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <li className="p-2 mb-1 flex items-center justify-between" key={member.id}>
      {member.firstName} {member.lastName?.charAt(0)}
      {member.lastName?.charAt(0) && "."}
      <div className="flex gap-2">
        <button className="text-blue-600 py-2 px-3 border border-white  hover:border-blue-600 font-bold rounded-md active:border-white">
          Edit
        </button>
        <button className="text-red-500 border border-white hover:border-red-700 font-bold py-2 px-4 rounded-md active:border-white">
          Delete
        </button>
      </div>
    </li>
  );
};

export default MemberListItem;
