import * as z from "zod";

export const verifyCodeSchema = z.object({
  verifyCode: z.string().length(6, "Verification code must have 6 digits"),
  // email: z
  //   .string({
  //     required_error: "Email is required",
  //     invalid_type_error: "Email must be a string",
  //   })
  //   .email("Invalid email address"),
});
