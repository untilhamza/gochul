import * as React from "react";

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow-md rounded-md max-w-[936px] mx-auto overflow-hidden p-3 bg-white">
      <p className="mx-2 text-center text-gray-800 my-5 font-bold text-lg">
        Submit a new report
      </p>
      {children}
    </div>
  );
}
