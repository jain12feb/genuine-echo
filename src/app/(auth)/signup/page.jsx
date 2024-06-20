"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { PasswordInput } from "@/components/ui/password-input";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "sonner";
import VerifyOtpInput from "@/components/OTPForm/VerifyOtpInput";
import { ArrowRightIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);

  const [showVerifyCode, setShowVerifyCode] = useState(false);

  const [username, setUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameRes, setUsernameRes] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(false);
  const debouncedUsername = useDebounce(username, 600);

  const [isPending, startTransition] = useTransition();

  const { watch, ...form } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { invalid: isUsernameInvalid } = form.getFieldState(
    "username",
    form.formState
  );

  const onSubmit = (formData) => {
    setLoading(true);
    startTransition(async () => {
      try {
        const { data, status } = await axios.post(
          "/api/auth/sign-up",
          formData
        );
        if (data.success) {
          toast.success(data.message);
          setShowVerifyCode(true);
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
  };

  //   useEffect(() => {
  //     const x = watch(({ username }) => setUsername(username));

  //     return () => x.unsubscribe();
  //   }, [watch]);

  useEffect(() => {
    const checkUsername = async () => {
      if (debouncedUsername.length > 2 && !isUsernameInvalid) {
        setIsCheckingUsername(true);
        try {
          const { data } = await axios.get(
            `/api/auth/check-username?username=${debouncedUsername}`
          );

          setUsernameRes(data.message);

          setIsUsernameUnique(data.success);

          //   form.setError("username", {
          //     message: data?.message,
          //     type: "value",
          //   });
        } catch (error) {
          console.log(error);
          setUsernameRes(
            error?.response?.data.message || "Error in checking username"
          );

          setIsUsernameUnique(false);

          //   form.setError(
          //     "username",
          //     {
          //       message:
          //         error?.response?.data.message || "Error in checking username",
          //       type: "",
          //     },
          //     {
          //       shouldFocus: true,
          //     }
          //   );
        } finally {
          setIsCheckingUsername(false);
        }
      } else {
        setIsUsernameUnique(false);
        setUsernameRes("");
      }
    };

    checkUsername();
  }, [debouncedUsername, isUsernameInvalid]);

  return (
    <div className="mx-auto pt-5 space-y-8 h-screen max-w-md">
      <div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl tracking-tight">
            Join{" "}
            <Link href="/" className="underline">
              Genuine Echo
            </Link>
          </div>
          <div>Sign up to start your anonymous message adventure</div>
          {/* <div className="text-center ">
            Experience the magic of genuine connections, one anonymous message
            at a time.
          </div> */}
        </div>
      </div>
      <div className="max-w-md">
        {showVerifyCode && <VerifyOtpInput email={form.getValues().email} />}

        {!showVerifyCode && (
          <Form {...form}>
            <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="johndae"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setUsername(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {isCheckingUsername ? (
                        <div className="flex gap-x-1">
                          <ClipLoader color="black" size={17} />
                          <p className="text-[0.8rem] font-medium">checking</p>
                        </div>
                      ) : (
                        usernameRes &&
                        !isUsernameInvalid &&
                        username.length > 2 && (
                          <div className="flex gap-x-1">
                            <p
                              className={cn(
                                "text-[0.8rem] font-medium",
                                isUsernameUnique
                                  ? "text-emerald-700"
                                  : "text-destructive"
                              )}
                            >
                              {usernameRes}
                            </p>
                            {isUsernameUnique ? (
                              <CheckIcon className="w-5 h-5 text-emerald-700" />
                            ) : (
                              <Cross2Icon className="w-5 h-5 text-destructive" />
                            )}
                          </div>
                        )
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormDescription>
                        Relax, we don&apos;t share your email with anyone else.
                      </FormDescription>
                      <FormControl>
                        <Input placeholder="john.dae@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormDescription>
                        Keep your password strong and remember it.
                      </FormDescription>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <LoadingButton
                type="submit"
                className="w-full mt-1"
                loading={loading}
                text="Continue"
                icon={<ArrowRightIcon className="ml-2" />}
                disabled={isPending || !isUsernameUnique}
              />
            </form>
          </Form>
        )}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
