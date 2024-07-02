import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";



function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

function getAzureCredentials() {
  const clientId = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET;
  const tenantId = process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID;
  if (!clientId || clientId.length === 0) {
    throw new Error("NEXT_PUBLIC_AZURE_AD_CLIENT_ID missing");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET missing");
  }
  if (!tenantId || tenantId.length === 0) {
    throw new Error("NEXT_PUBLIC_AZURE_AD_TENANT_ID missing");
  }
  return { clientId, clientSecret, tenantId };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-up",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    AzureADProvider({
      clientId: getAzureCredentials().clientId,
      clientSecret: getAzureCredentials().clientSecret,
      tenantId: getAzureCredentials().tenantId,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = (await db.get(`user:${token.id}`)) as User | null;
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    redirect() {
      return "/browse";
    },
  },
};
