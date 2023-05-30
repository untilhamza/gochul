import Swal from "sweetalert2";
import axios from "axios";
import { useSWRConfig } from "swr";
import Link from "next/link";

const MemberListItem = ({
  member,
  leaderId,
  groupId,
}: {
  member: Member;
  leaderId: string;
  groupId: string;
}) => {
  const { mutate } = useSWRConfig();

  const handleMemberDelete = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `/api/leader/${leaderId}/group/${groupId}/member/${member.id}`
          )
          .then((res) => {
            console.log(res);
            mutate(`/api/leader/${leaderId}/group/${groupId}/member`);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "Your file has not been deleted.", "error");
          });
      }
    });
  };

  // parse the edit url
  const editUrl = new URL(
    `/leader/new-member/?edit=${member.id}&firstName=${member.firstName}&lastName=${member.lastName}&country=${member.country}`,
    window.location.href
  );

  return (
    <li className="p-2 mb-1 flex items-center justify-between" key={member.id}>
      {member.firstName} {member.lastName?.charAt(0)}
      {member.lastName?.charAt(0) && "."}
      <div className="flex gap-2">
        <Link
          href={editUrl.href}
          className="flex-inline justify-center text-blue-500 py-2 px-3 border-2 border-white hover:text-blue-600 hover:border-blue-600 font-semibold rounded-md active:border-white"
        >
          Edit
        </Link>
        <button
          onClick={(e) => {
            handleMemberDelete(e);
          }}
          className=" flex-inline justify-center text-red-500 border-2 border-white hover:text-red:600 hover:border-red-600 font-semibold py-2 px-4 rounded-md active:border-white"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default MemberListItem;
