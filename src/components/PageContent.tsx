import * as React from "react";
import PageHeader from "@/components/PageHeader";

export default function PageContent({
  children,
  pageName,
  showTabs = true,
  tabs = [],
}: {
  children: React.ReactNode;
  pageName: string;
  tabs: PageTab[];
  showTabs?: boolean;
}) {
  return (
    <>
      {showTabs && <PageHeader pageName={pageName} tabs={tabs} />}
      <main className="flex-1 py-6 px-4 bg-sky-50">
        <div className="shadow-md rounded-md w-full md:max-w-[936px] mx-auto overflow-hidden p-3 bg-white border">
          {children}
        </div>
      </main>
    </>
  );
}
