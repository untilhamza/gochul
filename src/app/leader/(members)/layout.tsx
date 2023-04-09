import React from "react";
import PageContent from "@/components/PageContent";

const membersPageTabs: PageTab[] = [
  {
    label: "All Members",
    path: "leader/members",
  },
  {
    label: "New Member",
    path: "leader/new-member",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Members" tabs={membersPageTabs}>
      {children}
    </PageContent>
  );
}
