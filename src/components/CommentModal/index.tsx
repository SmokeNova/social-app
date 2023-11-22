'use client';

import { useClickOutside } from '@/hooks/use-click-outside';
import { ReactNode, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { Separator } from '../ui/separator';
import { CreateComment } from '..';
import { useGetComments } from '@/lib/react-query/queries';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
  children: ReactNode;
  postId: string;
  triggerStyles?: string;
};

export default function CommentModal({
  children,
  triggerStyles,
  postId,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type='button'
        className={triggerStyles}
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>
      {showModal && (
        <Modal hideModal={() => setShowModal(false)} postId={postId} />
      )}
    </>
  );
}

const Modal = ({
  hideModal,
  postId,
}: {
  hideModal: () => void;
  postId: string;
}) => {
  const ref = useClickOutside<HTMLDivElement>(hideModal);
  const { data: comments, isPending: commentsLoading } = useGetComments(postId);

  return (
    <div className='absolute top-0 left-0 bg-black/50 w-[100vw] z-50 h-[100vh] flex items-center justify-center'>
      <div
        ref={ref}
        className='p-3 rounded bg-white min-w-[350px] max-w-[850px] w-[80%]'
      >
        <div className='flex justify-between items-center mx-3'>
          <h3 className='text-slate-800 font-semibold text-2xl'>Comments</h3>
          <Button variant='ghost' size='sm' onClick={hideModal}>
            <X />
          </Button>
        </div>

        <Separator className='mt-4 mb-2' />

        <div className='flex flex-col gap-3'>
          <CreateComment postId={postId} />
          {commentsLoading && <div>loading...</div>}
          {comments !== undefined &&
            comments.map((comment, idx) => (
              <>
                <div
                  className='flex items-center gap-3'
                  key={comment._id.toString()}
                >
                  <Avatar>
                    <AvatarImage src={comment.authorImage} />
                    <AvatarFallback>{comment.authorName.at(0)}</AvatarFallback>
                  </Avatar>
                  <div className='grow flex flex-col gap-1/2'>
                    <h5 className='text-base font-semibold'>
                      {comment.authorName}
                    </h5>
                    <p className='grow'>{comment.text}</p>
                  </div>
                </div>
                {idx !== comments.length - 1 && <Separator className='my-1' />}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};
