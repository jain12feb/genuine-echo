import { prisma } from "@/lib/PrismaClient";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request) {
  try {
    const jsonData = await request.json();

    const validatedFields = messageSchema.safeParse(jsonData);

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

    const { username, content } = validatedFields.data;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "No Account Found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "Currently user is not accepting any messages",
        },
        { status: 403 }
      );
    }

    const createdMessage = await prisma.message.create({
      data: {
        userId: user.id,
        content,
      },
      select: {
        id: true,
      },
    });

    if (!createdMessage) {
      return Response.json(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Send Message API ", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
