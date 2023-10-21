import * as z from "zod";

const postSchema = z.object({
    text: z.string().min(5).max(400),
    media: z.string().url().optional(),
    hashTags: z.string().array(),
})
