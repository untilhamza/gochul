// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authoptions from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

//TODO: add role based auth for admin and leader roles
// export const config = {
//   matcher: ["/"],
// };

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    // admin pages are only accessible by admin role
    if (
      req.nextauth.token?.role !== "ADMIN" &&
      req.nextUrl.pathname.startsWith("/admin")
    ) {
      return new NextResponse("Not authorized", { status: 401 });
    } else if (
      req.nextauth.token?.role !== "LEADER" &&
      req.nextUrl.pathname.startsWith("/leader")
    ) {
      return new NextResponse("Not authorized", { status: 401 });
    }
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        return token?.role !== "USER";
      },
    },
  }
);
