//import mongoose connection from the lib folder
import { connectMongoDB } from "@/lib/MongoConnect";
//import User model
import User from "@/models/UserSchema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        studentID: { label: "studentID", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          await connectMongoDB();

          const user = await User.findOne({ studentID: credentials.studentID });
          if (user && user.password === credentials.password) {
            return { ...user.toObject(), apiToken: user.token };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  // custom pages option

  pages: {
    signIn: "/login",
    signOut: "/login",
  },

  callbacks: {
    async session({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (c !== "iat" && c !== "exp" && c !== "jti" && c !== "apiToken") {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});
      return { ...session, user: sanitizedToken, apiToken: token.apiToken };
    },
    async jwt({ token, user, account, profile }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        return user;
      }
      return token;
    },

    // signIn: async (user, account, profile) => {
    //   return Promise.resolve("/student");
    // },
    // signOut: async (user, account) => {
    //   return Promise.resolve("/login");
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
