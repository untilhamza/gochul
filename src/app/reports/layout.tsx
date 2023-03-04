import * as React from "react";
import PageContent from "@/app/components/PageContent";

export default function Content({ children }: { children: React.ReactNode }) {
  return <PageContent pageName="Reports">{children}</PageContent>;
}
