import { useAuthContext } from "@/contexts/auth.context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import supabase from "@/supabase-client";

import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MarkdownRenderer from "./utils/md-renderer";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({ content: z.string().trim().min(1) });

type AddCommentProps = {
  gist_id: string;
  content: string;
  user_id: string;
};

const addComment = async ({ gist_id, user_id, content }: AddCommentProps) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ gist_id, content, user_id }])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data.id as string;
};

type CommentProps = {
  gist_id: string;
};

const CommentForm: React.FC<CommentProps> = ({ gist_id }) => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const location = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  const watchedContent = form.watch("content");

  if (!user) {
    return (
      <>
        <div className="my-4 py-8 bg-yellow-600/50 dark:bg-yellow-500/50 rounded-md">
          <div className="text-center">
            <Link to={`/signup?ref=${location.pathname}`} className="underline">
              Sign Up
            </Link>{" "}
            to join this conversation. Already have an account?{" "}
            <Link to={`/login?ref=${location.pathname}`} className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addComment({
        gist_id,
        user_id: user.id,
        content: values.content,
      });

      form.reset({ content: "" });

      toast({ title: "Yeah! 💪", description: "We've posted your comment" });
    } catch (error: any) {
      toast({
        title: "Uh-oh 😓, Unable to add comment",
        description: `${error.message} 😿`,
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1 max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl mx-auto"
      >
        <div className="mt-2 flex items-center gap-2">
          <img
            alt={`${user?.name}`}
            src={
              user?.dp_url ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            }
            className="w-10 border-2 rounded-full object-contain"
          />
          <h1>Add a comment</h1>
        </div>
        <div className="flex-auto">
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
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="min-h-60"
                            placeholder="type your comment here..."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="comment-preview">
                  <MarkdownRenderer
                    className="min-h-60 max-h-[320px] px-3 py-2 overflow-y-auto rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                    content={watchedContent}
                  />
                </TabsContent>
              </div>
            </Tabs>

            <div className="md:flex md:justify-end mt-2 max-md:space-y-2">
              <Button type="submit" className="max-md:w-full">
                Create Gist
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { CommentForm as default };
