import { format } from "timeago.js";
import { Link } from "react-router-dom";
import MarkdownRenderer from "../utils/md-renderer";
import { CommentWithUser } from "./types";

const Comment: React.FC<CommentWithUser> = ({
  content,
  user,
  id,
  created_at,
}) => {
  return (
    <>
      <div id={id}>
        <div className="flex space-x-2">
          <img
            className="rounded-full w-12 h-12"
            src={user?.dp_url || "https://avatar.iran.liara.run/public"}
          />
          <div className="flex flex-col text-base">
            <span>{user.name}</span>
            <Link to={`/${user.username}`} className="underline text-blue-500">
              @{user.username}
            </Link>
            <span className="text-sm text-gray-400">{format(created_at)}</span>
          </div>
        </div>
        <MarkdownRenderer
          content={content}
          className="min-h-20 max-h-[320px] overflow-y-auto px-3 py-2"
        />
      </div>
    </>
  );
};

export default Comment;
