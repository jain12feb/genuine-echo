"use client";

import { useForm } from "react-hook-form";
import { InputOTP, InputOTPSlot } from "../ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeSchema } from "@/schemas/verifyCodeSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "../LoadingButton/LoadingButton";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";

const VerifyOtpInput = ({ email }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      verifyCode: "",
      // email: email,
    },
    mode: "onChange",
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onSubmit = (otp) => {
    const { verifyCode } = otp;
    if (verifyCode && email) {
      setLoading(true);
      startTransition(async () => {
        try {
          const { data } = await axios.post("/api/auth/verify-code", {
            verifyCode,
            email,
          });

          if (data.success) {
            toast.success(data.message);
            router.replace("/signin");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      });
    } else {
      toast.error("Sign up process failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        disabled={true}
        className="grid gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="verifyCode"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center items-center gap-2">
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    size="lg"
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <div className="flex gap-3">
                      <div>
                        <InputOTPSlot index={0} />
                      </div>
                      <div>
                        <InputOTPSlot index={1} />
                      </div>
                      <div>
                        <InputOTPSlot index={2} />
                      </div>
                      <div>
                        <InputOTPSlot index={3} />
                      </div>
                      <div>
                        <InputOTPSlot index={4} />
                      </div>
                      <div>
                        <InputOTPSlot index={5} />
                      </div>
                    </div>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter verification code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            className="hidden"
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="hidden" placeholder="000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <LoadingButton
          type="submit"
          className="w-full"
          loading={loading}
          text="Sign Up"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};

export default VerifyOtpInput;
