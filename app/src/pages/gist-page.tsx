import CommentForm from "@/components/comment-form";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import MarkdownRenderer from "@/components/utils/md-renderer";
import supabase from "@/supabase-client";
import { QueryData } from "@supabase/supabase-js";
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

const GistPage = () => {
  const { username, gistId } = useParams();

  const fetcher = async (): Promise<GistWithUsername> => {
    const { data, error } = await gistWithUsernameQuery()
      .eq("id", gistId)
      .eq("users.username", username)
      .single();

    if (error) {
      throw error;
    }

    return data as any;
  };

  const {
    data: gist,
    isLoading,
    isValidating,
    error,
  } = useSWR([`gist-${gistId}-${username}`], fetcher);

  if (isLoading || isValidating) {
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
  }

  if (error) {
    return (
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
    );
  }

  return (
    <>
      <div className="mx-auto my-4 max-w-[80%] p-4 max-md:max-w-full font-medium text-xl space-y-3">
        <div className="space-y-2">
          <h1>{gist?.title}</h1>
          <div className="text-sm text-gray-600">
            <p className="">
              Created by
              <Link
                to={`/${gist?.users.username}`}
                className="px-1 text-blue-500 hover:underline hover:text-blue-700"
              >
                @{gist?.users.username}
              </Link>
            </p>
            <span className="space-x-2">
              <span className="text-gray-600">
                {timeago.format(gist?.created_at)}
              </span>
              {gist?.updated_at != gist?.created_at && (
                <span>Last Edited: {timeago.format(gist?.updated_at)}</span>
              )}
            </span>
          </div>
        </div>

        <div className="mt-2 border p-4">
          <MarkdownRenderer content={gist?.content} />
        </div>
        <CommentForm />
      </div>
    </>
  );
};

export default GistPage;
