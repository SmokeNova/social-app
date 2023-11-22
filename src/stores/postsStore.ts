import { IPost } from '@/lib/models/post.model';
import { makeAutoObservable } from 'mobx';

class PostsStore {
  posts: IPost[] = [];
  selectedPost: IPost | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  populatePosts(posts: IPost[]) {
    this.posts = [...this.posts, ...posts];
  }

  selectPost(id: string) {
    const requiredPost = this.posts.find((el) => el._id.toString() === id);
    if (requiredPost !== undefined) {
      this.selectedPost = requiredPost;
    }
  }

  deselectPost() {
    this.selectedPost = null;
  }
}

let postsStore: PostsStore;

export const getPostsStore = () => {
  if (postsStore === undefined) {
    postsStore = new PostsStore();
  }
  return postsStore;
};
