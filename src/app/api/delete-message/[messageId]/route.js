import { prisma } from "@/lib/PrismaClient";
import { currentUser } from "@/lib/currentUser";

export async function DELETE(request, { params }) {
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

    const id = params.messageId;

    const deletedMessage = await prisma.message.delete({
      where: {
        userId: loggedInUser.id,
        id,
      },
    });

    if (deletedMessage) {
      return Response.json(
        {
          success: true,
          message: "Message deleted successfully",
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
    console.log("Error in Delete Message API ", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
