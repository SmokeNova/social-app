'use client';

import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useOptimistic } from 'react';

type Props = {
  likesCount: number;
};

export default function PostActions({
  likesCount,
}: Props) {
  const { data: session } = useSession();
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    { likesCount, pending: false },
    (state, newLikesCount: number) => ({
      ...state,
      likesCount: newLikesCount,
      pending: true,
    })
  );
  const handleLike = async () => {
    addOptimisticLike(likesCount + 1);
    setTimeout(() => {
      likesCount += 1;
    }, 5000)
  }

  return (
    <div className='self-center flex items-center gap-3'>
      <form>
        <button
          type='submit'
          className='outline-none border-none p-3 rounded-full bg-transparent hover:bg-rose-400/40 disabled:invisible inline-flex gap-1 items-center'
          disabled={optimisticLikes.pending}
          formAction={() => handleLike()}
        >
          <HeartIcon className='w-5 h-5 stroke-slate-500 hover:stroke-rose-400' />
          {optimisticLikes.likesCount}
        </button>
        <button
          type='button'
          className='outline-none border-none p-3 rounded-full bg-transparent hover:bg-cyan-600/20'
        >
          <MessageCircleIcon className='w-5 h-5 stroke-slate-500 hover:stroke-cyan-600' />
        </button>
      </form>
    </div>
  );
}
