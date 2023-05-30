import Link from "next/link";

const GroupRequired = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          No Group found
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          You need to create a group first before continuing.
        </p>
        <Link
          href="/leader/new-group"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded"
        >
          Create a group
        </Link>
      </div>
    </div>
  );
};

export default GroupRequired;
