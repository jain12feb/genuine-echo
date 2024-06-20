import * as z from "zod";
import { usernameSchema } from "./signUpSchema";

export const messageSchema = z.object({
  username: usernameSchema,
  content: z
    .string("Message is required")
    .min(10, "Message must be atleast 10 characters long")
    .max(300, "Message must be in 300 characters"),
});
