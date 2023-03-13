import * as React from "react";
import PageContent from "@/components/PageContent";

const reportTabs: PageTab[] = [
  {
    label: "All Reports",
    path: "reports",
  },
  {
    label: "New Report",
    path: "new-report",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Reports" tabs={reportTabs}>
      {children}
    </PageContent>
  );
}
