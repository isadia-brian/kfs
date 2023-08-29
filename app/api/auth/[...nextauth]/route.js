//import mongoose connection from the lib folder
import { connectMongoDB } from "@/lib/MongoConnect";
//import User model
import User from "@/models/UserSchema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userAuth: { label: "userAuth", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (typeof credentials !== "undefined") {
          await connectMongoDB();

          const query = {
            $or: [
              { studentID: credentials.userAuth },
              { username: credentials.userAuth },
            ],
          };

          const user = await User.findOne(query);

          if (user) {
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (!passwordMatch) {
              throw new Error("Invalid credentials");
            } else {
              const returnedUser = user.toObject();

              const validateUser = {
                fullName: returnedUser.fullName,
                username: returnedUser.username,
                studentID: returnedUser.studentID,
                email: returnedUser.email,
                mobileNumber: returnedUser.mobileNumber,
              };
              return { validateUser, apiToken: user.token };
            }
          } else {
            throw new Error("Invalid Credentials");
          }
        } else {
          throw new Error("Something went wrong");
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
