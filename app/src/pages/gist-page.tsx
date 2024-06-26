import CommentContainer from "@/components/comments/comment-container";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import MarkdownRenderer from "@/components/utils/md-renderer";
import supabase from "@/supabase-client";
import { QueryData } from "@supabase/supabase-js";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import * as timeago from "timeago.js";

const gistWithUsernameQuery = () =>
  supabase
    .from("gists")
    .select(
      `id, title, content, created_at, updated_at, users!inner (username)`
    );

type GistWithUsername = Omit<
  QueryData<ReturnType<typeof gistWithUsernameQuery>>[number],
  "users"
> & {
  users: QueryData<
    ReturnType<typeof gistWithUsernameQuery>
  >[number]["users"][number];
};

const GistContainer = () => {
  const { username, gistId = "" } = useParams();

  const fetcher = async (): Promise<any> => {
    const { data, error } = await gistWithUsernameQuery()
      .eq("id", gistId)
      .eq("users.username", username)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  const { data: gist, error: fetchError } = useSWR(
    `gist-${gistId}-${username}`,
    fetcher
  );

  return (
    <GistPreview
      gist={gist}
      error={fetchError}
      isLoading={!gist && !fetchError}
    />
  );
};

GistContainer.Skeleton = () => {
  return (
    <div className="mx-auto max-w-[80%] my-4 space-y-2">
      <div>
        <Skeleton className="h-[50px]" />
      </div>
      <div>
        <Skeleton className="h-[10px] w-20" />
      </div>
      <div>
        <div className="mt-5">
          <Skeleton className="min-h-[50vh]" />
        </div>
      </div>
    </div>
  );
};

GistContainer.ErrorUI = () => {
  return (
    <>
      <div className="flex flex-col min-h-[80vh] gap-4 justify-center items-center">
        <h1 className="text-7xl text-center">Oops</h1>
        <h2 className="text-xl text-red-500">
          <span className="font-bold text-xl">404</span> - GIST NOT FOUND
        </h2>

        <Link
          to="/discover"
          className={buttonVariants({
            variant: "default",
          })}
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

type PreviewProps = {
  gist: GistWithUsername | null;
  isLoading: boolean;
  error: any;
};

const GistPreview: React.FC<PreviewProps> = ({ gist, isLoading, error }) => {
  if (isLoading) {
    return <GistContainer.Skeleton />;
  }

  if (error || !gist) {
    return <GistContainer.ErrorUI />;
  }

  return (
    <>
      <div className="mx-auto my-4 max-w-[80%] p-4 max-md:max-w-full font-medium text-xl space-y-5">
        <div className="space-y-2">
          <h1>{gist.title}</h1>
          <div className="text-sm text-gray-600">
            <p className="">
              Created by
              <Link
                to={`/${gist.users.username}`}
                className="px-1 text-blue-500 hover:underline hover:text-blue-700"
              >
                @{gist.users.username}
              </Link>
            </p>
            <span className="space-x-2">
              <span className="text-gray-600">
                {timeago.format(gist.created_at)}
              </span>
              {gist?.updated_at && gist.updated_at !== gist.created_at && (
                <span>Last Edited: {timeago.format(gist.updated_at)}</span>
              )}
            </span>
          </div>
        </div>

        <div className="mt-2 border p-4">
          <MarkdownRenderer content={gist.content} />
        </div>

        <Separator className="h-1" />

        <CommentContainer gist_id={gist.id} />
      </div>
    </>
  );
};

const GistPage = () => {
  return <GistContainer />;
};

export default GistPage;
