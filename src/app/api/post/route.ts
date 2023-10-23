import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { postSchema } from "@/lib/validations/post";
import { NextResponse } from "next/server";
import * as z from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const values = postSchema
      .extend({ email: z.string().email(), avatar: z.string().url() })
      .parse(body);
    await connectToDB();
    const user = await User.findOne({ email: values.email });
    const post = await Post.create({
      text: values.text,
      hashTags: values.hashTags,
      media: values.media,
      creator: user._id,
      creatorEmail: values.email,
      creatorAvatar: values.avatar,
    });
    console.log("created!");
    return NextResponse.json({ data: post });
  } catch (error) {
    return NextResponse.error();
  }
}
