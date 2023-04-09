import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";
import { getUserByEmail, updateUser } from "@/lib/prisma/user";
import { Prisma } from "@prisma/client";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      checks: ["pkce", "state"], //"both"
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const googleProfile = profile as GoogleProfile;
        const googleAccount = account as any;
        const userEmail = googleProfile?.email;
        const firstName = googleProfile?.given_name;
        const lastName = googleProfile?.family_name;
        const picture = googleProfile?.picture;
        const locale = googleProfile?.locale;
        const { user: dbUser, error } = await getUserByEmail(userEmail!);
        if (error) {
          console.log("error", error);
          return false;
        }
        if (!dbUser) {
          //TODO: this user is a new user, so we should create a new user in our db
          console.log("user not found");
          return false;
        } else {
          //TODO: this user is a returning user, so we should update their info in our db
          console.log("user found");
          if (dbUser) {
            const { user: newDbUser, error } = await updateUser(dbUser?.id, {
              ...dbUser,
              firstName,
              lastName,
              picture,
              locale,
            });
            if (error) {
              console.log("error", error);
              return false;
            }
            if (!newDbUser) {
              console.log("user not found");
              return false;
            }

            console.log("updated user from db", newDbUser);
          }

          return true;
        }
      }
      return true; //TODO: Do different verification for other providers
    },
    async jwt({ token, user, account, profile }) {
      //@ts-ignore
      if (user) {
        //@ts-ignore
        token.role = user.role;
        //@ts-ignore
        token.firstName = user.firstName;
        //@ts-ignore
        token.lastName = user.lastName;
        //@ts-ignore
        token.picture = user.picture;
        //@ts-ignore
        token.locale = user.locale;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        //@ts-ignore
        if (session && session.user) {
          //@ts-ignore
          session.user.role = token.role;
          //@ts-ignore
          session.user.firstName = token.firstName;
          //@ts-ignore
          session.user.lastName = token.lastName;
          //@ts-ignore
          session.user.locale = token.locale;
        }
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
