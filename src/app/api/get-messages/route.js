import { prisma } from "@/lib/PrismaClient";
import { currentUser } from "@/lib/currentUser";

export async function GET(request) {
  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: loggedInUser.id,
    //   },
    //   select: {
    //     id: true,
    //     email: true,
    //     messages: {
    //       select: {
    //         id: true,
    //         content: true,
    //         createdAt: true,
    //       },
    //       orderBy: {
    //         createdAt: "desc",
    //       },
    //     },
    //   },
    // });

    const messages = await prisma.message.findMany({
      where: {
        userId: loggedInUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(
      {
        success: true,
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Get Messages API ", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
