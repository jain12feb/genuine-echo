"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/middleware";
import { AuthError } from "next-auth";

export const login = async (formData, callbackUrl) => {
  try {
    console.log("formData", formData);
    const { emailOrUsername, password } = formData;
    const redirectUrl = await signIn("credentials", {
      emailOrUsername,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      redirect: false,
    });

    console.log("redirectUrl", redirectUrl);

    return {
      success: true,
      message: "Welcome back " + emailOrUsername,
      redirectUrl,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("AuthError from login form", error);
      return {
        success: false,
        message: error.cause.err.message,
      };
    } else {
      console.log("error from login form", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

export const logout = async () => {
  await signOut({
    redirectTo: "/",
  });
};
