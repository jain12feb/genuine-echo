"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";

const UniqueProfileLink = () => {
  const { username } = useCurrentUser();

  const [link, setLink] = useState({
    protocol: "",
    host: "",
  });

  const [isTextCopied, setIsTextCopied] = useState(false);

  const copyToClipboard = () => {
    const { protocol, host } = link;
    setIsTextCopied(true);
    navigator.clipboard.writeText(`${protocol}//${host}/u/${username}`);
    toast.success("Profile URL has been copied to clipboard");
    setTimeout(() => {
      setIsTextCopied(false);
    }, 3000);
  };

  useEffect(() => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    setLink({ protocol, host });
  }, []);

  return (
    <div className="my-1 mx-auto flex flex-col gap-2 justify-between items-center p-3">
      {/* <p className="text-sm font-bold text-[#8678f9]">Unique Profile Link</p> */}
      <div className="flex items-center space-x-2 md:w-1/2">
        <div
          id="profile-link"
          className="flex h-9 w-full rounded-md border border-[#8678f9] bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {`${link.protocol}//${link.host}/u/${username}`}
        </div>
        <Button
          size="sm"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-neutral-950  font-medium text-neutral-200"
          onClick={copyToClipboard}
          // onClick={() => {
          //   setBtnText("Copied");
          //   navigator.clipboard.writeText(
          //     `${link.protocol}//${link.host}/u/${username}`
          //   );
          //   toast.success("Profile URL has been copied to clipboard");
          //   setTimeout(() => {
          //     setBtnText("Copy");
          //   }, 3000);
          // }}
          //   className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <span className="mr-1">{isTextCopied ? "Copied" : "Copy"}</span>
          {isTextCopied ? (
            <CheckIcon className="w-10 h-10 md:w-8 md:h-8" />
          ) : (
            <ClipboardIcon className="w-8 h-8 md:w-6 md:h-6" />
          )}

          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div className="relative h-full w-8 bg-white/20"></div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default UniqueProfileLink;
