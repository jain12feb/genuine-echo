import { prisma } from "@/lib/PrismaClient";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import crypto from "crypto";
import { signUpSchema } from "@/schemas/signUpSchema";

export async function POST(request) {
  try {
    const jsonData = await request.json();

    const validatedFields = signUpSchema.safeParse(jsonData);

    if (!validatedFields?.success) {
      return Response.json(
        {
          success: false,
          message: validatedFields?.error?.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const { username, email, password } = validatedFields.data;

    // const existingUserVerifiedByUsername = await User.findOne({
    //   username,
    //   isVerified: true,
    // });

    const existingUserByUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUserByUsername?.isVerified) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 200,
        }
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // const verificationCode = Math.floor(
    //   100000 + Math.random() * 900000
    // ).toString();

    const verificationCode = crypto.randomInt(100_000, 1_000_000).toString();

    // const verificationCodeExpiryTime = new Date();
    // verificationCodeExpiryTime.setHours(
    //   verificationCodeExpiryTime.getHours() + 1
    // );

    const verificationCodeExpiryTime = new Date();
    verificationCodeExpiryTime.setMinutes(
      verificationCodeExpiryTime.getMinutes() + 5
    );

    if (existingUserByEmail) {
      // if (!existingUserByEmail.isVerified) {
      //   const emailRes = await sendVerificationEmail(email, verificationCode);
      //   if (!emailRes.success) {
      //     return Response.json(emailRes, { status: 400 });
      //   }
      //   await prisma.user.update({
      //     where: {
      //       email: existingUserByEmail.email,
      //     },
      //     data: {
      //       username,
      //       password,
      //       verifyCode: verificationCode,
      //       verifyCodeExpiry: verificationCodeExpiryTime,
      //     },
      //   });
      //   return Response.json(emailRes, { status: 200 });
      // } else {
      //   return Response.json(
      //     {
      //       success: false,
      //       message: "Email already exists",
      //     },
      //     {
      //       status: 400,
      //     }
      //   );
      // }

      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email already exists",
          },
          {
            status: 400,
          }
        );
      }
    } else if (existingUserByUsername) {
      await prisma.user.delete({
        where: {
          username,
          isVerified: false,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const emailRes = await sendVerificationEmail(email, verificationCode);

    if (!emailRes.success) {
      return Response.json(emailRes, { status: 400 });
    }

    await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        username,
        password: hashedPassword,
        verifyCode: verificationCode,
        verifyCodeExpiry: verificationCodeExpiryTime,
      },
      create: {
        username,
        email,
        password: hashedPassword,
        verifyCode: verificationCode,
        verifyCodeExpiry: verificationCodeExpiryTime,
      },
      // data: {
      //   username,
      //   email,
      //   password: hashedPassword,
      //   verifyCode: verificationCode,
      //   verifyCodeExpiry: verificationCodeExpiryTime,
      // },
    });

    return Response.json(emailRes, { status: 201 });
  } catch (error) {
    console.log("Error in Sign Up API ", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
