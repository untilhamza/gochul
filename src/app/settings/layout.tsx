import * as React from "react";
import PageContent from "@/app/components/PageContent";
import { PageTab } from "@/app/shared/interfaces/page.interfaces";

const settingsPageTabs: PageTab[] = [
  {
    label: "Group Settings",
    path: "/group-settings",
  },
  {
    label: "Account Settings",
    path: "/account-settings",
  },
];

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <PageContent pageName="Settings" tabs={settingsPageTabs}>
      {children}
    </PageContent>
  );
}
