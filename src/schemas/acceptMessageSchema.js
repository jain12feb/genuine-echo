import * as z from "zod";

export const acceptMessagesSchema = z.object({
  isAcceptingMessages: z.boolean(),
});
