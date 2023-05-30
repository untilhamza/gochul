import Link from "next/link";

const ApprovalRequiredPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 py-100 bg-gray-100 border-red-100 border-10">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Approval Required
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          You need to get approval from an administrator to continue.
        </p>
        {/* <p className="text-lg text-gray-700">
          {" "}
          If you are an administrator, you will be approved as an admin.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          If you are a group leader, you will be approved as a leader.
        </p> */}
        <Link
          href="/contact-admin"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded"
        >
          Contact Administrator
        </Link>
      </div>
    </div>
  );
};

export default ApprovalRequiredPage;
