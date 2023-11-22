'use server';

import { revalidatePath } from 'next/cache';
import Post from '../models/post.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';
import { postSchema } from '../validations/post';
import * as z from 'zod';
import Comment from '../models/comment.model';

export async function createPost(data: any) {
  try {
    const values = postSchema
      .extend({
        name: z.string(),
        email: z.string().email(),
        avatar: z.string().url(),
      })
      .parse(data);
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
      likesCount: 0,
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
  userId,
  postId,
  hasLiked,
}: {
  userId: string;
  postId: string;
  hasLiked: boolean;
}) {
  try {
    await connectToDB();
    if (hasLiked) {
      await Post.updateOne(
        { _id: postId },
        { $pull: { likes: userId }, $inc: { likesCount: -1 } }
      );
    } else {
      await Post.updateOne(
        { _id: postId },
        { $push: { likes: userId }, $inc: { likesCount: 1 } }
      );
    }
    revalidatePath('/p/profile');
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export const commentOnPost = async ({
  postId,
  text,
  user,
}: {
  postId: string;
  text: string;
  user: IUser;
}) => {
  try {
    await connectToDB();
    const comment = await Comment.create({
      text,
      edited: false,
      author: user.id,
      authorName: user.username,
      authorImage: user.image,
      post: postId,
      likesCount: 0,
    });
    if (!comment) throw new Error('Something went wrong!');
    await Post.updateOne({ _id: postId }, { $inc: { commentsCount: 1 } });
    console.log('comment created.');
    revalidatePath('/p/profile');
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
