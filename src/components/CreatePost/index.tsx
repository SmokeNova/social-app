"use client";
import Image from "next/image";
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
import { Textarea } from "../ui/textarea";

export default function CreatePost() {
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
        text: "",
    }
  });

  const handleSubmit = (values: z.infer<typeof postSchema>) => {
    console.log(values);
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      if (!image.type.includes("image")) return;
      reader.readAsDataURL(image);
      reader.onload = async () => {
        const imageUrl = reader.result?.toString() ?? "";
        fieldChange(imageUrl);
      };
    }
  };

  return (
    <div className="border border-slate-800/30 p-4 rounded mx-auto w-[70%] max-w-[800px] min-h-[380px] max-sm:mx-4 my-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Content</FormLabel>
                <FormControl>
                  <Textarea
                    className="focus-visible:ring-0"
                    placeholder="What's on your mind"
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

          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="flex flex-col gap-4">
                  Upload an image for your post(Optional)
                  {!!field.value && (
                    <img
                      src={field.value}
                      alt="profile photo"
                      className="w-[70%] max-w-[500px] min-w-[300px] mx-auto max-sm:mx-4"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a Photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
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
