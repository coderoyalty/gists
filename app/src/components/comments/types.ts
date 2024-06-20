import { fetchComments } from ".";

export type CommentUser = {
  id: string;
  username: string;
  name: string;
  dp_url?: string;
};

export type CommentWithUser = {
  id: string;
  created_at: string;
  updated_at: string;
  user: CommentUser;
  content: string;
};

export type CommentListProps = {
  isLoading: boolean;
  data: CommentWithUser[];
};

export type CommentContainerProps = {
  gist_id: string;
};

export type CommentsWithUser = Awaited<ReturnType<typeof fetchComments>>;
