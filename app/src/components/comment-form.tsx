import { useAuthContext } from "@/contexts/auth.context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Skeleton } from "./ui/skeleton";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import supabase from "@/supabase-client";

type AddCommentProps = {
  gist_id: string;
  content: string;
  user_id: string;
};

const addComment = async ({ gist_id, user_id, content }: AddCommentProps) => {
  const { error } = await supabase
    .from("comments")
    .insert([{ gist_id, content, user_id }]);

  if (error) {
    throw error;
  }
};

type CommentProps = {
  gist_id: string;
};

const CommentForm: React.FC<CommentProps> = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <>
        <div className="my-4 p-4 bg-yellow-600/50 dark:bg-yellow-500/50 rounded-md">
          <div className="text-center">
            <Link
              to="/signup"
              className={`${buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "font-semibold",
              })} bg-green-600 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-700`}
            >
              Sign Up
            </Link>{" "}
            to join this conversation. Already have an account?{" "}
            <Link
              to="/login"
              className={`${buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "font-semibold",
              })} bg-green-600 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-700`}
            >
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative max-w-[80%] mx-auto">
        <div className="w-10 rounded-full absolute -left-12">
          <img
            alt={`${user?.name}`}
            src={
              user?.dp_url ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            }
            className="w-full border-2 rounded-full object-contain"
          />
        </div>
        <div className="mt-2">
          <h1>Add a comment</h1>
          <div>
            <Tabs defaultValue="comment-write">
              <div className="mt-2">
                <TabsList>
                  <TabsTrigger value="comment-write">Write</TabsTrigger>
                  <TabsTrigger value="comment-preview">Preview</TabsTrigger>
                </TabsList>
              </div>
              <div className="space-y-3">
                <TabsContent value="comment-write">
                  <Textarea
                    className="min-h-60"
                    placeholder="type your comment here..."
                  />
                </TabsContent>
                <TabsContent value="comment-preview">
                  <Skeleton className="h-60" />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export { CommentForm as default };
