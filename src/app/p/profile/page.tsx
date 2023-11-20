import { Posts } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/authOptions';
import Post, { IPost } from '@/lib/models/post.model';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const getPostsByEmail = async (email: string) => {
  await connectToDB();
  let posts: IPost[] = await Post.find({ creatorEmail: email }).sort({
    createdAt: 'desc',
  });
  const postIds = posts.map((post) => post._id);
  const { _id: userId } = await User.findOne({ email });
  const likedPosts = await Post.find({
    _id: { $in: postIds },
    likes: userId,
  });
  const likedPostIds = new Set(likedPosts.map((post) => post._id.toString()));
  // stringifying and parsing is done to convert posts to vanilla js objects because mongoose doesn't allow properties that are not defined in the schema
  posts = JSON.parse(JSON.stringify(posts));

  posts = posts.map((post) => ({
    ...post,
    hasLiked: likedPostIds.has(post._id.toString()),
  }));
  return posts;
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  let posts = await getPostsByEmail(session?.user?.email ?? '');

  return (
    <>
      <div className='flex flex-col items-center py-12 gap-10 text-slate-800 border-b border-b-slate-800/30'>
        <Avatar className='scale-[2.5]'>
          <AvatarImage src={session?.user?.image ?? ''} />
          <AvatarFallback>{session?.user?.name?.at(0) ?? 'U'}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1 items-center'>
          <h2 className='font-semibold text-2xl'>{session?.user?.name}</h2>
          <p className='text-lg font-semibold'>
            email: <span className='text-blue-700'>{session?.user?.email}</span>
          </p>
        </div>

        <Link href='/p/create-post'>
          <Button variant='primary'>Create Post</Button>
        </Link>
      </div>

      <Posts posts={posts} />
    </>
  );
}
