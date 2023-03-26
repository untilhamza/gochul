export { default } from "next-auth/middleware";

//TODO: add role based auth for admin and leader roles
export const config = {
  matcher: ["/"],
};
