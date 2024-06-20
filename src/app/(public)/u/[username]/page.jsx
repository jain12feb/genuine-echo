"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import data from "@/data/sample-messages.json";
import { BiSortDown } from "react-icons/bi";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { toast } from "sonner";
import LoadingButton from "@/components/LoadingButton/LoadingButton";

const PublicProfilePage = () => {
  const { username } = useParams();

  const [questions, setQuestions] = useState(data);

  const [loading, setLoading] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      username: username,
      content: "",
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    startTransition(async () => {
      try {
        const { data } = await axios.post("/api/send-message", values);
        if (data.success) {
          toast.success(data.message);
          form.reset({
            username: username,
            content: "",
          });
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

  const handleSuggestMessages = async () => {
    try {
      const { data } = await axios.get("/api/suggest-messages");

      if (data.success) {
        console.log("data.questions", data.questions);
        setQuestions(data.questions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message || "Something went wrong");
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <header className="w-full">
        <div className="flex items-center justify-between h-14 px-4">
          <Link className="flex items-center" href="/">
            <img src="/logo-base-32x32.png" alt="logo" />
            <h1 className="text-xl hidden font-semibold uppercase md:flex justify-center mx-1 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">
              Genuine Echo
            </h1>
          </Link>

          <Button
            size="sm"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-neutral-950  font-medium text-neutral-200"
            asChild
          >
            <Link href="/signup">
              <span className="mr-1">Get Started </span>
              <ArrowRightIcon />
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </Link>
          </Button>
        </div>
      </header>
      {/* <h1 className="text-4xl font-bold text-center">Public Profile Link</h1> */}
      <div className="container mx-auto p-6 rounded max-w-3xl">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control.content}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Send Anonymous Message to <strong> @{username}</strong>
                    </FormLabel>
                    <FormDescription>
                      Your message will be send without exposing your identity
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        className="flex font-medium min-h-[80px] w-full rounded-lg border border-[#8678f9] px-3 py-2 bg-[#8678f9]/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Write your anonymous message here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-2">
                <Button
                  size="sm"
                  variant="shine"
                  type="button"
                  onClick={() =>
                    form.reset({
                      content: "",
                      username: username,
                    })
                  }
                >
                  Reset
                </Button>
                <LoadingButton
                  size="sm"
                  variant="shine"
                  type="submit"
                  loading={loading}
                  text="Submit"
                  disabled={isPending}
                />
              </div>
              <Button
                size="sm"
                variant="shine"
                type="button"
                onClick={handleSuggestMessages}
              >
                Suggest Messages
                <BiSortDown className="ml-1 w-5 h-5" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="container mx-auto  rounded max-w-3xl">
        <div className="flex flex-col gap-3 p-4 border rounded-lg border-[#8678f9]">
          <CardTitle className="mb-4">
            Click on any message below to select it.
          </CardTitle>
          {questions &&
            questions.map((q, i) => (
              <Card
                key={i}
                className="cursor-pointer p-4 bg-[#8678f9]/25"
                onClick={() => form.setValue("content", q)}
              >
                {/* <CardHeader> */}
                <CardTitle>{q}</CardTitle>
                {/* </CardHeader> */}
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
