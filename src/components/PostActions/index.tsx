'use client';

import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import { useOptimistic, startTransition } from 'react';
import { CommentModal, useUser } from '..';
import { likePost } from '@/lib/actions/posts.actions';
import { useToast } from '../ui/use-toast';

type Props = {
  hasLiked: boolean;
  postId: string;
  likesCount: number;
  commentsCount: number;
};

export default function PostActions({ hasLiked, postId, likesCount, commentsCount }: Props) {
  const { toast } = useToast();
  const { id: userId } = useUser();
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    { likesCount, hasLiked },
    (state) => ({
      likesCount: state.hasLiked ? state.likesCount - 1 : state.likesCount + 1,
      hasLiked: !state.hasLiked,
    })
  );
  const handleLike = async () => {
    startTransition(() => addOptimisticLike({}));
    const res = await likePost({
      userId,
      postId,
      hasLiked: optimisticLikes.hasLiked,
    });
    if (!res.success) {
      toast({
        title: `Failed to ${
          optimisticLikes.hasLiked ? 'dislike' : 'like'
        } the post. Please try again.`,
      });
    }
  };

  return (
    <div className='self-center flex items-center gap-3'>
      <button
        type='button'
        className='outline-none border-none p-3 rounded-full bg-transparent hover:bg-rose-400/40 disabled:invisible inline-flex gap-1 items-center'
        onClick={() => handleLike()}
      >
        <HeartIcon
          className={`w-5 h-5 stroke-slate-500 hover:stroke-rose-400 ${
            optimisticLikes.hasLiked && '!stroke-rose-400 fill-rose-400'
          }`}
        />
        {optimisticLikes.likesCount}
      </button>

      <CommentModal triggerStyles='outline-none border-none p-3 rounded-full bg-transparent hover:bg-cyan-600/20 inline-flex gap-1 items-center' postId={postId}>
        <MessageCircleIcon className='w-5 h-5 stroke-slate-500 hover:stroke-cyan-600' />
        {commentsCount}
      </CommentModal>
    </div>
  );
}
