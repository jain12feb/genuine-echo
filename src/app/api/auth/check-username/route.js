import { prisma } from "@/lib/PrismaClient";
import { usernameSchema } from "@/schemas/signUpSchema";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // const queryParam = searchParams.get("username");

    // const validatedFields = usernameSchema.safeParse(queryParam);

    // if (!validatedFields?.success) {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: validatedFields?.error?.errors[0].message,
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    // const { username } = validatedFields.data;
    const username = searchParams.get("username");

    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
        isVerified: true,
      },
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 409,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in Check Username API ", error);
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
