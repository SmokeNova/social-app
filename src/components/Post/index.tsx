'use client';

import { IPost } from '@/lib/models/post.model';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Post({ post }: { post: IPost }) {
  console.log(post)
  return (
    <div className='flex flex-col'>
      <div className='flex gap-2'>
        <Link href={`/users/${post.creator.toString()}`}>
          <Avatar>
            <AvatarImage src={post.creatorAvatar} />
            <AvatarFallback>{'U'}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
