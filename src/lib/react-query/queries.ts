import { useQuery } from '@tanstack/react-query';
import { IComment } from '../models/comment.model';

export const useGetComments = (postId: string) => {
  return useQuery<IComment[]>({
    queryKey: [postId],
    queryFn: async () => {
      const res = await fetch(`/api/post/comment?postId=${postId}`);
      const parsed = await res.json();
      return parsed.data;
    },
  });
};
