import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";
import { getUserByEmail, updateUser } from "@/lib/prisma/user";
import { GochulUser, Prisma } from "@prisma/client";
import {
  createGochulUser,
  getGochulUserByEmail,
} from "@/lib/prisma/gochulUser";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const googleProfile = profile as GoogleProfile;
        const userEmail = googleProfile?.email;
        const firstName = googleProfile?.given_name;
        const lastName = googleProfile?.family_name;
        const picture = googleProfile?.picture;
        const locale = googleProfile?.locale;
        const { gochulUser: gochulUserFromDb, error: gochulUserError } =
          await getGochulUserByEmail(userEmail!);
        if (gochulUserError) {
          console.log("Error signing in ", gochulUserError);
          return false;
        }
        if (!gochulUserFromDb) {
          //for new user signing up
          //@ts-ignore
          const newGochulUser: GochulUser = {
            name: firstName! + " " + lastName!,
            firstName: firstName!,
            lastName: lastName!,
            email: userEmail!,
            country: "", //TODO: get this from google util
            occupation: "",
            isApproved: false,
            role: "USER",
            locale: locale!,
            picture: picture!,
          };
          const { gochulUser: newGochulUserFromDb, error: newGochulUserError } =
            await createGochulUser(newGochulUser);
          if (newGochulUserError) {
            return false;
          }
          return true;
        } else {
          //for user signing in
          return true;
        }
      }
      return false; //TODO: Do different verification for other providers later
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        const { gochulUser, error } = await getGochulUserByEmail(user.email!);
        if (error) {
          console.log("Error fetching user for jwt", error);
        }
        token = {
          ...token,
          role: gochulUser?.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { gochulUser, error } = await getGochulUserByEmail(token.email!);
        if (error) {
          console.log("Error fetching user for session", error);
          return session;
        }
        session.user = {
          ...session.user,
          role: gochulUser?.role,
          firstName: gochulUser?.firstName,
          lastName: gochulUser?.lastName,
          picture: gochulUser?.picture,
        } as any;
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
