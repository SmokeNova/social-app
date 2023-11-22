import * as z from "zod";

export const postSchema = z.object({
  text: z
    .string()
    .min(5, { message: "The post should have minimum 5 characters." })
    .max(400),
  media: z.string().url().optional(),
  hashTags: z
    .array(z.string().min(3).max(40))
    .min(1, { message: "At least one tag is required" })
    .max(5, { message: "Only 5 tags are allowed!" }),
});

export const commentValidation = z.object({
  text: z.string().min(4, {message: 'Should be at least 4 characters'}).max(450, {message: 'Too long'})
})
