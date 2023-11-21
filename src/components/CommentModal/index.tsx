import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';

type Props = {
  children: ReactNode;
};

export default function CommentModal({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger className='outline-none border-none p-3 rounded-full bg-transparent hover:bg-cyan-600/20'>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>Comments</DialogTitle>
          <Separator className='mt-4 mb-2 bg-slate-600/30' />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
