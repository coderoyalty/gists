import React from "react";
import { Button } from "../ui/button";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import { CommentContainerProps, CommentsWithUser } from "./types";
import { fetchComments, useCommentSubscription } from ".";

const CommentContainer: React.FC<CommentContainerProps> = ({ gist_id }) => {
  const [data, setData] = React.useState<CommentsWithUser>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [timestamp, setTimeStamp] = React.useState<string | null>(null);
  const [isInitialLoaded, setIsInitial] = React.useState(false);

  const pushComment = (comment: CommentsWithUser[number]) => {
    const val = data.find((value) => value.id == comment.id);
    if (val) {
      return;
    }
    setData((data) => [...data, comment]);
  };

  const fetcher = async () => {
    const size = 10; //TODO: can user set this?
    try {
      setLoading(true);
      const result = await fetchComments(gist_id, timestamp, size);

      if (!isInitialLoaded) {
        setIsInitial(true); // we've just fetched the latest data
      }

      if (!result.length || result.length < size) {
        setTimeStamp(null); // no more data to fetch.
      } else {
        setTimeStamp(result[result.length - 1].created_at);
      }

      if (isInitialLoaded) {
        setData((prevData) => [...result.reverse(), ...prevData]);
      } else {
        // we don't need to append the result,
        // it's the latest data from the table
        setData(result.reverse());
      }
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetcher();
  }, []);

  useCommentSubscription(gist_id, pushComment);

  return (
    <>
      {(timestamp == null && isInitialLoaded) || (
        <div className="flex justify-center">
          <Button
            disabled={isLoading}
            className="w-[80%]"
            onClick={() => fetcher()}
          >
            Load Earlier Comment
          </Button>
        </div>
      )}
      <CommentList data={data as any} isLoading={isLoading} />
      <CommentForm gist_id={gist_id} />
    </>
  );
};

export default CommentContainer;
