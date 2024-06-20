"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { logout } from "@/server-actions";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SignOutButton = ({ user }) => {
  return (
    <div className="flex justify-center items-center gap-x-2 mx-auto">
      <div className="mt-2 w-full flex justify-around items-center gap-3  bg-[#8678f9]/10 rounded-lg mb-1 pb-2 py-1 ps-4 pe-2 ">
        <Link href="/dashboard" className="flex flex-col text-gray-900">
          <span className="text-sm font-bold text-[#8678f9]">
            {user.username}
          </span>
          <span className="text-xs/3 font-medium text-[#8678f9]">
            {user.email}
          </span>
        </Link>
      </div>
      <AlertDialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button className="group relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200">
                  <>
                    <div className="translate-x-0 transition group-hover:translate-x-[300%]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="absolute -translate-x-[300%] transition group-hover:translate-x-0">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </>
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="m-3">
              <p>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Your session is about to end. Please save any unsaved work before
              proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <span
                onClick={async () => {
                  await logout();
                  toast.success("Sign out successfully");
                }}
                className="bg-red-500 cursor-pointer hover:bg-red-600"
              >
                Yes, Signout
              </span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SignOutButton;
