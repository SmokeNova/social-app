import { IPost } from '@/lib/models/post.model';
import Post from '../Post';

export default function Posts({ posts }: { posts: IPost[] }) {
  return (
    <div>
      <div className='border border-slate-800/20 rounded max-w-[1000px] w-1/2 mx-auto py-2 mt-10'>
        {posts.map((post) => (
          <Post key={post._id.toString()} post={post} />
        ))}
      </div>
    </div>
  );
}
