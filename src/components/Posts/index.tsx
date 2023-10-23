import { IPost } from "@/lib/models/post.model";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Posts({ posts }: { posts: IPost[] }) {
    console.log(posts[2])
  return (
    <div>
      <div className="border border-slate-800/20 rounded max-w-[1000px] w-1/2 mx-auto py-2 mt-10">
        {posts.map((post) => (
          <div key={post._id.toString()} className="flex flex-col">
            <div className="flex gap-2">
              <Link href={`/users/${post.creator.toString()}`}>
                <Avatar>
                  <AvatarImage src={post.creatorAvatar} />
                  <AvatarFallback>{"U"}</AvatarFallback>
                </Avatar>
                {post.creatorEmail ?? "d"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
