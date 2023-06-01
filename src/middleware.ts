// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
// import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    //admin pages are only accessible by admin role
    if (
      req.nextauth.token?.role !== "ADMIN" &&
      req.nextUrl.pathname.startsWith("/admin")
    ) {
      //@ts-ignore
      return NextResponse.redirect(new URL("/", req.url));
    } else if (
      req.nextauth.token?.role !== "LEADER" &&
      req.nextUrl.pathname.startsWith("/leader")
    ) {
      //@ts-ignore
      return NextResponse.redirect(new URL("/", req.url));
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

//TODO: add role based auth for admin and leader roles
export const config = {
  matcher: ["/admin/:path*", "/leader/:path*"],
};
