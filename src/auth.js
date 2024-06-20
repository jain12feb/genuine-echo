import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { prisma } from "./lib/PrismaClient";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, user, token, newSession, trigger }) {
      // console.log("user form session callback ", user);
      if (token) {
        session.user.id = token.id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser, session, trigger }) {
      // console.log("user form jwt callback ", user);
      // console.log("trigger", trigger);
      // console.log("session", session);

      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }

      if (trigger === "update" && session?.user) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.isAcceptingMessages = session.user.isAcceptingMessages;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
