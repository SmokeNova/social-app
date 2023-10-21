"use client";
import { postSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CreatePost() {
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
  });

  const handleSubmit = (values: z.infer<typeof postSchema>) => {
    console.log(values);
  };

  return (
    <div className="border border-slate-800/30 p-4 rounded mx-auto w-[70%] max-w-[800px] min-h-[380px] max-sm:mx-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Content</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:ring-0"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the content of your Post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button variant="primary" type="submit" className="text-right">
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
