import GoogleProvider from "next-auth/providers/google";
import { User as IUser } from "next-auth";
import User from "./models/user.model";
import { connectToDB, disconnectFromDB } from "./mongoose";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: IUser }) {
      try {
        if (user) {
          await connectToDB();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            await User.create({
              username: user.name,
              email: user.email,
              image: user.image,
            });
          }
        }
      } catch (error) {
        console.log(error);
        disconnectFromDB();
        return false;
      }
      disconnectFromDB();
      return true;
    },
  },
};
