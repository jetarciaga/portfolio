import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { ALLOWED_GITHUB_USER_ID } from "@/lib/auth-config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/admin/sign-in",
  },
  providers: [GitHub],
  callbacks: {
    signIn({ account, profile, user }) {
      if (account?.provider !== "github") {
        return false;
      }

      const githubUserId = profile?.id ?? user.id;
      return (
        githubUserId !== undefined &&
        githubUserId !== null &&
        String(githubUserId) === ALLOWED_GITHUB_USER_ID
      );
    },
    jwt({ token, profile }) {
      if (profile?.id) {
        token.sub = String(profile.id);
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
    authorized({ auth: session, request }) {
      if (request.nextUrl.pathname === "/admin/sign-in") {
        return true;
      }

      return session?.user?.id === ALLOWED_GITHUB_USER_ID;
    },
  },
});
