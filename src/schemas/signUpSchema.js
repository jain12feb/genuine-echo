import * as z from "zod";

export const usernameSchema = z
  .string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  })
  .min(3, "Username must be at least 3 characters long")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username must not contains any special characters"
  );

export const signUpSchema = z.object({
  username: usernameSchema,
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long"),
});
