import * as React from "react";
import PageContent from "@/app/components/PageContent";
import { PageTab } from "@/app/shared/interfaces/page.interfaces";

const reportTabs: PageTab[] = [
  {
    label: "All Reports",
    path: "/reports",
  },
  {
    label: "New Report",
    path: "/reports/new",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Reports" tabs={reportTabs}>
      {children}
    </PageContent>
  );
}
