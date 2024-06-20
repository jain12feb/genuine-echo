import Link from "next/link";
import { Button } from "../ui/button";
import { currentUser } from "@/lib/currentUser";
import SignOutButton from "../SignOutButton/SignOutButton";
import AcceptMessageToggle from "../AcceptMessageToggle/AcceptMessageToggle";

export default async function SiteHeader() {
  const user = await currentUser();
  return (
    <header className="w-full">
      <div className="flex items-center justify-between h-14 px-4">
        <Link className="flex items-center" href="/">
          <img src="/logo-base-32x32.png" />
          <h1 className="text-xl hidden font-semibold uppercase md:flex justify-center mx-1 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">
            Genuine Echo
          </h1>
        </Link>
        {/* {user && user.email && <AcceptMessageToggle />} */}
        <div className="flex gap-2">
          {user && user.email ? (
            <SignOutButton user={user} />
          ) : (
            <>
              <Button
                size="sm"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-neutral-950  font-medium text-neutral-200"
                asChild
              >
                <Link href="/signup">
                  <span>Sign Up</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20"></div>
                  </div>
                </Link>
              </Button>
              <Button
                size="sm"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-neutral-950  font-medium text-neutral-200"
                asChild
              >
                <Link href="/signin">
                  <span>Sign In</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20"></div>
                  </div>
                </Link>
              </Button>
            </>
          )}
        </div>
        {/* <div>
        <Button size="sm">Sign Up</Button>
        <Button size="sm">Sign in</Button>
      </div> */}
      </div>
    </header>
  );
}
