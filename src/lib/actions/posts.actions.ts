'use server';

import { revalidatePath } from 'next/cache';
import Post, { IPost } from '../models/post.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';
import { postSchema } from '../validations/post';
import * as z from 'zod';

export async function createPost(data: any) {
  try {
    const values = postSchema
      .extend({
        name: z.string(),
        email: z.string().email(),
        avatar: z.string().url(),
      })
      .parse(data)
    await connectToDB();
    const user = await User.findOne({ email: values.email });
    const post = await Post.create({
      text: values.text,
      hashTags: values.hashTags,
      ...(values.media ? { media: values.media } : null),
      creator: user._id,
      creatorName: values.name,
      creatorEmail: values.email,
      creatorAvatar: values.avatar,
    });
    if (!post) throw new Error('Something went wrong!');
    console.log('created!');
    revalidatePath('/p/profile');
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function likePost({
  email,
  post,
}: {
  email: string;
  post: IPost;
}) {
  try {
    await connectToDB();
    let validatedEmail = z.string().email().parse(email);
    const user = await User.findOne({ email: validatedEmail });
    const userId = user?._id;
    if (!userId && typeof userId !== 'string') {
      throw new Error();
    }
    post.likes.push(userId);
    post.likesCount += 1;
    await post.save();
    revalidatePath('/p/profile');
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}
