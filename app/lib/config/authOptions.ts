import { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })
        if (!user) {
          throw new Error("User not found")
        }
        const checkPassowrd = await compare(credentials?.password as string, user.password as string)
        if (!checkPassowrd) {
          throw new Error("Password incorrect")
        }
        return {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          image: user?.image,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      // if (account?.provider === "google") {
      //   const user = await prisma.user.findUnique({
      //     where: {
      //       email: profile?.email
      //     }
      //   })
      //   if (!user) {
      //     await prisma.user.create({
      //       data: {
      //         name: profile?.name as string,
      //         email: profile?.email,
      //         image: profile?.image,
      //         emailVerified: new Date()
      //       }
      //     })
      //   }
      // }
      return true
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token; // jangan kosongin token
    },
    session({ session, user, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
}