import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import { prisma } from "@/lib/PrismaClient";
import { verifyCodeSchema } from "@/schemas/verifyCodeSchema";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { verifyCode: code, email } = await request.json();

    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Sign up process failed. Please try again.",
        },
        { status: 400 }
      );
    }

    const validatedFields = verifyCodeSchema.safeParse({ verifyCode: code });

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

    const { verifyCode } = validatedFields.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Account doesn't exists",
        },
        {
          status: 404,
        }
      );
    }

    if (user.isVerified) {
      return Response.json(
        {
          success: false,
          message: "Your Account is already verified",
        },
        {
          status: 200,
        }
      );
    }

    const verificationCode = crypto.randomInt(100_000, 1_000_000).toString();

    const verificationCodeExpiryTime = new Date();
    verificationCodeExpiryTime.setMinutes(
      verificationCodeExpiryTime.getMinutes() + 5
    );

    if (user.verifyCode !== verifyCode) {
      const emailRes = await sendVerificationEmail(email, verificationCode);

      if (!emailRes.success) {
        return Response.json(emailRes, { status: 400 });
      }

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          verifyCode: verificationCode,
          verifyCodeExpiry: verificationCodeExpiryTime,
        },
      });

      return Response.json(
        {
          success: false,
          message: "Invalid Verification Code. New code sent on email",
        },
        {
          status: 400,
        }
      );
    }

    const isCodeExpired = new Date(user.verifyCodeExpiry) < new Date();

    if (isCodeExpired) {
      const emailRes = await sendVerificationEmail(email, verificationCode);

      if (!emailRes.success) {
        return Response.json(emailRes, { status: 400 });
      }

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          verifyCode: verificationCode,
          verifyCodeExpiry: verificationCodeExpiryTime,
        },
      });

      return Response.json(
        {
          success: false,
          message: "Verification Code Expired. New code sent on email",
        },
        {
          status: 400,
        }
      );
    }

    const verifyUser = await prisma.user.update({
      where: {
        email,
        verifyCode,
      },
      data: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpiry: null,
      },
    });

    if (verifyUser) {
      return Response.json(
        {
          success: true,
          message: "Verification successful. Signin to explore",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 400 }
    );
  } catch (error) {
    console.log("Error in Verify Code API ", error);
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
