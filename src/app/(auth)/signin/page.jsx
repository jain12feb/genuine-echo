"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { toast } from "sonner";
import { passwordStrength } from "check-password-strength";
import { login } from "@/server-actions";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [passwordScore, setPasswordScore] = useState("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  (function searchParamsError() {
    const errorName = searchParams?.get("error");

    switch (errorName) {
      case "OAuthAccountNotLinked":
        toast.error("Email already used with different provider");
        break;
      // return {
      //   type: "error",
      //   message: "Email already used with different provider",
      // };
      case "OAuthCallbackError":
        toast.error("OAuth Provider returned an error");
        break;
      // return {
      //   type: "error",
      //   message: "OAuth Provider returned an error",
      // };

      default:
        return {};
    }
  })();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    setLoading(true);
    startTransition(async () => {
      try {
        const data = await login(formData, callbackUrl);

        if (data?.redirectUrl && data.success) {
          toast.success(data?.message);
          router.push(data?.redirectUrl);
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
  return (
    <div className="mx-auto max-w-md pt-14 space-y-8">
      <div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl tracking-tight">
            Explore{" "}
            <Link href="/" className="underline">
              Genuine Echo
            </Link>
          </div>
          <div>Sign in your account to explore our fabolous services</div>
          {/* <div className="text-center">
            Ever wished to hear what your peers truly think, without the
            pressure of identity?
          </div> */}
        </div>
      </div>
      <div>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
            // action={}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="emailOrUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormDescription>
                      Relax, we don't share your details with anyone else.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Enter your email or username"
                        {...field}
                        tabIndex={1}
                      />
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
                    <div className="flex items-center">
                      <div className="space-y-2">
                        <FormLabel>Password</FormLabel>
                        <FormDescription>
                          Keep updating your password time to time.
                        </FormDescription>
                      </div>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        placeholder="********"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPasswordScore(
                            passwordStrength(e.target.value).value
                          );
                        }}
                        tabIndex={2}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* <p
                      className={cn(
                        "text-[0.8rem] font-medium text-destructive"
                      )}
                    >
                      {passwordScore.length > 1 && passwordScore}
                    </p> */}
                  </FormItem>
                )}
              />
            </div>
            <LoadingButton
              type="submit"
              className="w-full"
              loading={loading}
              text="Sign In"
              icon={<ArrowRightIcon className="ml-2" />}
              disabled={isPending}
            />
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
