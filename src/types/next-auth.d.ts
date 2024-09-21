import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email: string;
      username: string;
      pfpUrl?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    email: string;
    username: string;
    pfpUrl?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email: string;
    username: string;
    pfpUrl?: string;
  }
}
