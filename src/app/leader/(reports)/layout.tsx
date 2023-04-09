import * as React from "react";
import PageContent from "@/components/PageContent";

const reportTabs: PageTab[] = [
  {
    label: "All Reports",
    path: "leader/reports",
  },
  {
    label: "New Report",
    path: "leader/new-report",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Reports" tabs={reportTabs}>
      {children}
    </PageContent>
  );
}
