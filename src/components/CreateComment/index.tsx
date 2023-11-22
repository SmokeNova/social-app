'use client';

import { commentValidation } from '@/lib/validations/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useUser } from '..';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { commentOnPost } from '@/lib/actions/posts.actions';
import { useState } from 'react';

export default function CreateComment({ postId }: { postId: string }) {
  const user = useUser();
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof commentValidation>>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      text: '',
    },
  });

  async function handleSubmit(values: z.infer<typeof commentValidation>) {
    setPending(true);
    const res = await commentOnPost({
      postId,
      text: values.text,
      user,
    });
    setPending(false);
    form.reset();
    console.log(res);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-1'>
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Content</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-2'>
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{'U'}</AvatarFallback>
                    </Avatar>
                    <Textarea
                      className='focus-visible:ring-0 !min-h-[10px]'
                      placeholder='Write a comment'
                      rows={2}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button
              disabled={pending}
              variant='primary'
              type='submit'
              size='sm'
              className='text-right disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {pending ? 'Posting' : 'Post'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
