import { IUserSession } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ApprovalRequiredPage from "@/components/approval/ApprovalRequired";

//TODO: use this to tell them to get approval for their account

export default async function Content({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: IUserSession = await getServerSession();
  const user = session?.user;
  const userId = user?.id;

  const isApproved = session?.user?.role !== "USER";

  return <>{isApproved ? children : <ApprovalRequiredPage />}</>;
}
