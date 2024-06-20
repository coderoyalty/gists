import { Separator } from "@radix-ui/react-dropdown-menu";
import { CommentListProps, CommentWithUser } from "./types";
import Comment from "./comment";

const CommentList: React.FC<CommentListProps> = ({ data }) => {
  return data.map((comment: CommentWithUser) => (
    <div key={comment.id}>
      <Comment {...comment} />
      <Separator className="h-[1px] bg-black dark:bg-white" />
    </div>
  ));
};

export default CommentList;
