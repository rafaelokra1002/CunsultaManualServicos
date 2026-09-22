import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 dias
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Credenciais inválidas");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Credenciais inválidas");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.nome,
          role: user.role,
          active: user.active,
          isPremium: user.isPremium,
          demoUsed: user.demoUsed,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.active = (user as any).active;
        token.isPremium = (user as any).isPremium;
        token.demoUsed = (user as any).demoUsed;
      }
      // Atualizar demoUsed do banco a cada request para refletir mudanças em tempo real
      if (trigger === "update" || !user) {
        try {
          const dbUser = await prisma.user.findUnique({ where: { id: token.id as string }, select: { demoUsed: true, isPremium: true, active: true } });
          if (dbUser) {
            token.demoUsed = dbUser.demoUsed;
            token.isPremium = dbUser.isPremium;
            token.active = dbUser.active;
          }
        } catch {}
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).active = token.active;
        (session.user as any).isPremium = token.isPremium;
        (session.user as any).demoUsed = token.demoUsed;
      }
      return session;
    },
  },
};
