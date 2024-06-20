import * as z from "zod";

export const signInSchema = z.object({
  emailOrUsername: z
    .string("Email or Username is required")
    .min(1, "Email or Username is required"),
  // username: usernameSchema.optional(),
  // email: z
  //   .string({
  //     required_error: "Email is required",
  //     invalid_type_error: "Email must be a string",
  //   })
  //   .min(1, "Email is required")
  //   .email("Invalid email address")
  //   .optional(),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});
