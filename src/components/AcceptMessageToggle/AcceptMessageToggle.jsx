"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessagesSchema } from "@/schemas/acceptMessageSchema";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const AcceptMessageToggle = () => {
  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
    // defaultValues: {
    //   isAcceptingMessages: true,
    // },
    // mode: "onChange",
  });

  const {
    update,
    data: { user: logedInUser },
  } = useSession();

  const handleIsAcceptingMessages = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/accept-messages");

      if (data.success) {
        form.setValue("isAcceptingMessages", data.isAcceptingMessages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }, [form.setValue]);

  const handleCheckboxChange = async (value) => {
    try {
      const { data } = await axios.post("/api/accept-messages", {
        isAcceptingMessages: value,
      });

      if (data.success) {
        await update({
          user: { ...logedInUser, isAcceptingMessages: value },
        });

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    handleIsAcceptingMessages();
  }, []);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mt-1 h-9 w-[180px] flex justify-between items-center bg-[#8678f9]/10 rounded-lg p-2 ">
            <Form {...form}>
              <form
              //  onChange={form.handleSubmit(handleCheckboxChange)}
              >
                <FormField
                  control={form.control}
                  name="isAcceptingMessages"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          id="accept-messages"
                          checked={field.value}
                          onCheckedChange={(e) => {
                            field.onChange(e);
                            handleCheckboxChange(e);
                          }}
                          // onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            {/* <Switch
              id="accept-messages"
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
            /> */}
            <Label
              htmlFor="accept-messages"
              className="cursor-pointer flex justify-center items-center font-bold text-[#8678f9]"
            >
              Accept Messages
            </Label>
            {/* <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
              <input
                type="checkbox"
                name="autoSaver"
                className="sr-only"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span
                className={`slider mr-2 flex h-[24px] w-[50px] items-center rounded-full p-1 duration-200 ${
                  isChecked ? "bg-purple-400" : "bg-purple-200"
                }`}
              >
                <span
                  className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                    isChecked ? "translate-x-6" : ""
                  }`}
                ></span>
              </span>
            </label> */}
          </div>
        </TooltipTrigger>
        <TooltipContent className="mt-2">
          Enable / Disable anonymous message acceptance
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AcceptMessageToggle;
