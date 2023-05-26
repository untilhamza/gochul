import * as React from "react";
import PageContent from "@/components/PageContent";

const settingsPageTabs: PageTab[] = [
  // {
  //   label: "Group Settings",
  //   path: "group-settings",
  // },
  {
    label: "Account Settings",
    path: "leader/account",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Settings" tabs={settingsPageTabs}>
      {children}
    </PageContent>
  );
}
