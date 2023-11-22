import Comment from '@/lib/models/comment.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const postId = request.nextUrl.searchParams.get('postId');
    if (!postId) throw new Error();
    const comments = await Comment.find({ post: postId }).sort({
      createdAt: 'desc',
    });
    if (!comments) throw new Error();
    return NextResponse.json({ data: comments });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
