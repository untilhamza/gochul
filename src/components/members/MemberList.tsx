import MemberListItem from "./MemberListItem";

const MemberList = ({
  searchMemberName = "",
  members = [],
  groupId,
  leaderId,
}: {
  searchMemberName?: string;
  members: any[];
  groupId: string;
  leaderId: string;
}) => {
  return (
    <div className="p-3">
      <h3 className="py-2 font-semibold">
        Members in the group.{" "}
        <span className="font-medium text-gray-600">({members.length})</span>
      </h3>
      <ul className="border border-slate-200 divide-y divide-slate-300">
        {members
          ?.filter(
            (member) =>
              member.firstName
                .toLowerCase()
                .includes(searchMemberName.toLowerCase()) ||
              member.lastName
                ?.toLowerCase()
                .includes(searchMemberName.toLowerCase())
          )
          .map((member) => (
            <MemberListItem
              key={member.id}
              member={member}
              leaderId={leaderId}
              groupId={groupId}
            />
          ))}
      </ul>
    </div>
  );
};

export default MemberList;
