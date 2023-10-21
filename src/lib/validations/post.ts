import * as z from "zod";

export const postSchema = z.object({
  creatorId: z.string(),
  text: z
    .string()
    .min(5, { message: "The post should have minimum 5 characters." })
    .max(400),
  media: z.string().url().optional(),
  hashTags: z.string().array(),
});
