import { prisma } from "@/lib/PrismaClient";
import { currentUser } from "@/lib/currentUser";
import { acceptMessagesSchema } from "@/schemas/acceptMessageSchema";

export async function POST(request) {
  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      return Response.json(
        {
          success: false,
          message: "Unauthenticated",
        },
        { status: 401 }
      );
    }

    const jsonData = await request.json();

    const validatedFields = acceptMessagesSchema.safeParse(jsonData);

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

    const { isAcceptingMessages } = validatedFields.data;

    const user = await prisma.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        isAcceptingMessages,
      },
    });

    if (user) {
      return Response.json(
        {
          success: true,
          message: `Messages acceptance changed to ${
            isAcceptingMessages ? "ON" : "OFF"
          }`,
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
    console.log("Error in Accept Message API ", error);
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

export async function GET(request) {
  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      return Response.json(
        {
          success: false,
          message: "Unauthenticated",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: loggedInUser.id,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: `No Account Found"
          }`,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        // message: "Something went wrong",
        isAcceptingMessages: user.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Accept Messages API ", error);
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
