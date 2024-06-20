import { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./schemas/signInSchema";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/PrismaClient";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid Credentials";
  name = "Invalid Credentials";

  constructor(message) {
    super(message);
    this.message = message;
  }
}

export default {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        emailOrUsername: {
          label: "emailOrUsername",
          type: "text",
          placeholder: "Enter your email or username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        try {
          const validation = signInSchema.safeParse(credentials);

          console.log("credential authorize validation", validation);

          if (!validation.success) {
            throw new InvalidLoginError(validation?.error?.errors[0].message);
          }

          const { password, emailOrUsername } = validation?.data;

          // if we use mongoose
          // const user = await User.findOne({
          //   $or: [{ email }, { username: email }],
          // });

          const user = await prisma.user.findFirst({
            where: {
              OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
            },
          });

          if (!user) {
            throw new InvalidLoginError("Account doesn't exists");
          }

          if (!user.isVerified) {
            throw new InvalidLoginError(
              "Account not verified. Sign up again to verify"
            );
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            throw new InvalidLoginError("Incorrect password");
          }

          delete user.password;

          return user;
        } catch (error) {
          console.log("Credentials Authorize Error ", error);
          throw new Error(error.message);
        }
      },
    }),
  ],
};
