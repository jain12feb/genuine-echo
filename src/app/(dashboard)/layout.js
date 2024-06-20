import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import SiteHeader from "@/components/Navbar/SiteHeader";

export const metadata = {
  title: "Dashboard - Genuine Echo",
  description: "Generated by create next app",
};

export default async function ProtectedLayout({ children }) {
  const session = await auth();

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        <SessionProvider session={session}>
          <SiteHeader />
          <div>{children}</div>
        </SessionProvider>
      </div>
    </>
  );
}