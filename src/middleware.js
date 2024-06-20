import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const authRoutes = ["/signin", "/signup"];
const publicRoutes = ["/", "/verify"];

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req, ctx) {
  // Your custom middleware logic goes here

  const { nextUrl: url } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = url.pathname.startsWith("/api");
  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);

  const isPublicProfilePage = url.pathname.startsWith("/u");

  if (isPublicProfilePage) return null;

  if (isApiRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, url));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = url.pathname;

    if (url.search) {
      callbackUrl += url.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, url)
    );
  }

  return null;
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
