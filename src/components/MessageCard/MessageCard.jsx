"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";
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
import moment from "moment";

const MessageCard = ({ message, handleMessageDelete }) => {
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardDescription className="flex flex-row justify-between items-start mb-5">
          {/* <span>Friday, February 10, 2023 at 5:57 PM</span> */}
          <span>{moment(message.createdAt).format("LLLL")}</span>
          <AlertDialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Cross2Icon className="ml-3 text-destructive cursor-pointer w-5 h-5" />
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete message</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* <AlertDialogContent className="flex flex-col p-4 bg-white shadow-md hover:shodow-lg rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex flex-col ml-3">
                    <div className="font-medium leading-none">
                      Delete Your Acccount ?
                    </div>
                    <p className="text-sm text-gray-600 leading-none mt-1">
                      By deleting your account you will lose your all data
                    </p>
                  </div>
                </div>
                <AlertDialogAction className="flex-no-shrink bg-red-500 hover:bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                  Delete
                </AlertDialogAction>

              </div>
            </AlertDialogContent> */}
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your session is about to end. Please save any unsaved work
                  before proceeding.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <span
                    onClick={() => handleMessageDelete(message.id)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer"
                  >
                    Yes, Delete it
                  </span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardDescription>
        <CardTitle>
          <span>{message.content}</span>
        </CardTitle>

        {/* <CardDescription>{new Date().getDate()}</CardDescription> */}
      </CardHeader>
    </Card>
  );
};

export default MessageCard;
