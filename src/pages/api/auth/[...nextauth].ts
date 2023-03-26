import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account?.provider === "google") {
  //       console.log("account", account);
  //       console.log("profile", profile);
  //       // return (
  //       //   profile?.email_verified && profile.email.endsWith("@example.com")
  //       // );
  //       return true;
  //     }
  //     return true; // Do different verification for other providers that don't have `email_verified`
  //   },
  // },
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
