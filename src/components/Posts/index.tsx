'use client';

import { IPost } from '@/lib/models/post.model';
import Post from '../Post';
import { Fragment, useEffect } from 'react';
import { Separator } from '../ui/separator';
import { getPostsStore } from '@/stores/postsStore';
import { observer } from 'mobx-react-lite';

export default function Posts({ posts }: { posts: IPost[] }) {

  return (
    <div>
      <div className='border border-slate-800/20 rounded max-w-[1000px] w-1/2 mx-auto py-2 mt-10 mb-6'>
        {posts.map((post, idx) => (
          <Fragment key={post._id.toString()}>
            <Post post={post} />
            {idx !== posts.length - 1 && <Separator className='mb-6 mt-1' />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
