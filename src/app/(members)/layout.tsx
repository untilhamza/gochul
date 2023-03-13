import React from "react";
import PageContent from "@/components/PageContent";

const membersPageTabs: PageTab[] = [
  {
    label: "All Members",
    path: "members",
  },
  {
    label: "New Member",
    path: "new-member",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Members" tabs={membersPageTabs}>
      {children}
    </PageContent>
  );
}
