'use server'

import { IPost } from '@/lib/models/post.model';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import Image from 'next/image';
import PostModel from '@/lib/models/post.model';
import { Tag } from '..';

export default async function Post({ post }: { post: IPost }) {
  const liked = Boolean(await PostModel.findOne({likes: {$in: [post._id]}}))
  console.log(liked);

  return (
    <div className='flex flex-col gap-2 px-4'>
      <div className='flex gap-1/2 items-center'>
        <Link href={`/users/${post.creator.toString()}`}>
          <Avatar>
            <AvatarImage src={post.creatorAvatar} />
            <AvatarFallback>{'U'}</AvatarFallback>
          </Avatar>
        </Link>

        <Link href={`/users/${post.creator.toString()}`}>
          <Button variant='link' className='text-base font-semibold'>
            {post.creatorName}
          </Button>
        </Link>
      </div>

      <div className='flex items-center gap-3 flex-wrap'>
        {post.hashTags.map((tag, idx) => (
          <Tag tag={tag} editable={false} key={idx} />
        ))}
      </div>

      <Link
        href={`/posts/${post.creator.toString()}`}
        className='flex flex-col gap-2'
      >
        <div>
          <p>{post.text}</p>
        </div>

        {post.media ? (
          <div
            className={`w-full relative ${
              post.media ? 'h-[500px]' : null
            } overflow-hidden`}
          >
            <Image
              src={post.media}
              alt='post picture'
              fill={true}
              className='!h-auto'
            />
          </div>
        ) : null}
      </Link>
    </div>
  );
}
