'use client';
import { useRouter } from 'next/navigation';
import { postSchema } from '@/lib/validations/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useUploadThing } from '@/lib/uploadthing';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tags } from '..';
import { createPost } from '@/lib/actions/posts.actions';
import { useToast } from '../ui/use-toast';

export default function CreatePost() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [tag, setTag] = useState('');
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: '',
      hashTags: [],
    },
  });
  const { startUpload } = useUploadThing('media');

  const handleSubmit = async (values: z.infer<typeof postSchema>) => {
    setPending(true);
    if (values.media) {
      const imageRes = await startUpload(files);
      console.log(imageRes);
      if (imageRes && imageRes[0].url) {
        values.media = imageRes[0].url;
      }
    }
    const res = await createPost({
      ...values,
      name: session?.user?.name,
      email: session?.user?.email,
      avatar: session?.user?.image,
    });
    setPending(false);
    if (res.success) {
      toast({
        title: 'Post created successfully!',
      });
      router.push('/p/profile');
    } else {
      toast({
        title: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      if (!image.type.includes('image')) return;
      setFiles(Array.from(e.target.files));
      reader.readAsDataURL(image);
      reader.onload = async () => {
        const imageUrl = reader.result?.toString() ?? '';
        fieldChange(imageUrl);
      };
    }
  };

  const handleTags = (
    e: React.KeyboardEvent<HTMLInputElement>,
    tags: string[],
    fieldChange: (value: string[]) => void
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!!tag) {
        fieldChange([...tags, tag]);
        setTag('');
      }
    }
  };

  return (
    <div className='border border-slate-800/30 p-4 rounded mx-auto w-[70%] max-w-[800px] min-h-[380px] max-sm:mx-4 my-12'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Content</FormLabel>
                <FormControl>
                  <Textarea
                    className='focus-visible:ring-0'
                    placeholder="What's on your mind"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the content of your Post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='hashTags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Tags</FormLabel>
                <Tags editable tags={field.value} changeTags={field.onChange} />
                <FormControl>
                  <Input
                    className='focus-visible:ring-0'
                    placeholder="What's on your mind"
                    {...field}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={(e) =>
                      handleTags(e, field.value, field.onChange)
                    }
                  />
                </FormControl>
                <FormDescription>
                  Enter the tags for your post. They can be used to search your
                  post. Maximum 5 tags allowed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='media'
            render={({ field }) => (
              <FormItem className='space-y-4'>
                <FormLabel className='flex flex-col gap-4'>
                  Upload an image for your post(Optional)
                  {!!field.value && (
                    <img
                      src={field.value}
                      alt='profile photo'
                      className='w-[70%] max-w-[500px] min-w-[300px] mx-auto max-sm:mx-4'
                    />
                  )}
                </FormLabel>
                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                  <Input
                    type='file'
                    accept='image/*'
                    placeholder='Upload a Photo'
                    className='account-form_image-input'
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
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
              className='text-right disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {pending ? 'Posting' : 'Confirm'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
