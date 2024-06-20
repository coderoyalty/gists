import supabase from "@/supabase-client";
import { CommentsWithUser, CommentWithUser } from "./types";
import React from "react";

const from_comments = () => supabase.from("comments");

type AddCommentProps = {
  gist_id: string;
  content: string;
  user_id: string;
};

export const addComment = async ({
  gist_id,
  user_id,
  content,
}: AddCommentProps) => {
  const { data, error } = await from_comments()
    .insert([{ gist_id, content, user_id }])
    .select(
      `id,
      created_at,
      updated_at,
      content,
      user:users (
      id,
      username,
      name,
      dp_url)
      `
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * cursor-based pagination method for fetching comments
 * @param gist_id the table primary key for filtering the data
 * @param timestamp the cursor used for pagination
 * @param size the page size
 * @returns
 */
export const fetchComments = async (
  gist_id: string,
  timestamp: string | null,
  size?: number
) => {
  if (!size) size = 10;
  else if (![5, 10, 25].includes(size)) size = 10;

  let query = from_comments()
    .select(
      `id,
      created_at,
      updated_at,
      content,
      user:users (
      id,
      username,
      name,
      dp_url)
      `
    )
    .filter("gist_id", "eq", gist_id)
    .order("created_at", { ascending: false })
    .limit(size);

  if (timestamp) {
    query = query.lt("created_at", timestamp);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
};

/**
 * hook for subscribing to the insertion event on the `comments` table
 * @param gistId if the new payload (the comment) belongs to the given gist primary key.
 * @param callback the payload is passed to the callback for use/processing.
 */
export const useCommentSubscription = (
  gistId: string,
  callback: (payload: CommentsWithUser[number]) => void
) => {
  React.useEffect(() => {
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `gist_id=eq.${gistId}`,
        },
        async (payload) => {
          const newComment = payload.new as Omit<CommentWithUser, "user"> & {
            user_id: string;
          };

          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", newComment.user_id)
            .single();

          if (error) {
            console.error(
              "Unable to fetch user for the new gist",
              error.message
            );
          }

          callback({ ...newComment, user: data });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [gistId, callback]);
};
