import * as React from "react";
import PageContent from "@/components/PageContent";

const groupTabs: PageTab[] = [
  {
    label: "Group Info",
    path: "leader/group",
  },
  {
    label: "Create Group",
    path: "leader/new-group",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Groups" tabs={groupTabs}>
      {children}
    </PageContent>
  );
}
