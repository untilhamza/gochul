import Image from "next/image";
import ErrorImage from "public/images/error.png";
import { redirect } from "next/navigation";

const ErrorPageDetails = ({ onReload }: { onReload?: () => void }) => {
  return (
    <div className="flex items-center justify-center h-full py-10 m-auto">
      <div className="text-center">
        <h1 className="text-4xl text-red-500 mb-4">Oops! 😕</h1>
        <p className="text-xl text-gray-700 mb-2">Something went wrong.</p>
        <p className="text-lg text-gray-600 mb-8">Please try again later. 🔄</p>
        <Image
          className="mx-auto max-w-xs mb-8"
          src={ErrorImage}
          alt="Error Illustration"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (!onReload) redirect("/");
            onReload?.();
          }}
        >
          {onReload ? "Reload Page" : "Go Home"}
        </button>
      </div>
    </div>
  );
};

export default ErrorPageDetails;
