import React from "react";
import PageContent from "@/app/components/PageContent";
import { PageTab } from "../shared/interfaces/page.interfaces";

const membersPageTabs: PageTab[] = [
  {
    label: "All Members",
    path: "/members",
  },
  {
    label: "New Member",
    path: "/members/new",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Members" tabs={membersPageTabs}>
      {children}
    </PageContent>
  );
}
