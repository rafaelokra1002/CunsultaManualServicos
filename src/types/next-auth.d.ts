import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      active: boolean;
      isPremium: boolean;
      demoUsed: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "USER" | "ADMIN";
    active: boolean;
    isPremium: boolean;
    demoUsed: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "USER" | "ADMIN";
    active: boolean;
    isPremium: boolean;
    demoUsed: boolean;
  }
}
