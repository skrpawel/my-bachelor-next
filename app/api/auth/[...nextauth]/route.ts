import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Brakujący login lub hasło");
        }
        const user = await prisma.users.findUnique({
          where: {
            email,
          },
        });
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Zły login lub hasło");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
