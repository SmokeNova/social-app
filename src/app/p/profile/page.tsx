import { Posts } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authOptions } from '@/lib/authOptions';
import Post, { IPost } from '@/lib/models/post.model';
import { connectToDB } from '@/lib/mongoose';
import { getServerSession } from 'next-auth';

const getPostsByEmail = async (email: string) => {
  await connectToDB();
  const posts: IPost[] = await Post.find({ creatorEmail: email }).sort({
    createdAt: 'desc',
  });
  return posts;
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  let posts = await getPostsByEmail(session?.user?.email ?? '');

  return (
    <>
      <div className='flex flex-col items-center py-12 gap-10 text-slate-800 border-b border-b-slate-800/30'>
        <Avatar className='scale-[2]'>
          <AvatarImage src={session?.user?.image ?? ''} />
          <AvatarFallback>{session?.user?.name?.at(0) ?? 'U'}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1 items-center'>
          <h2 className='font-semibold text-2xl'>{session?.user?.name}</h2>
          <p className='text-lg font-semibold'>
            email: <span className='text-blue-700'>{session?.user?.email}</span>
          </p>
        </div>
      </div>

      <Posts posts={posts} />
    </>
  );
}

export const dynamic = 'force-dynamic';
