import { useAppContext } from "@/contexts/app.context";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import MarkdownRenderer from "../utils/md-renderer";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";

const formSchema = z.object({
  content: z
    .string()
    .max(767, "Content must be less than 768 characters")
    .refine((value) => value.trim().length > 0, {
      message: "Cannot be empty or whitespace",
    }),
  title: z
    .string()
    .max(254, "Title must be less than 255 characters")
    .refine((value) => value.trim().length > 0, {
      message: "Cannot be empty or whitespace",
    }),
  secret: z.boolean(),
});

const GistForm = () => {
  const { isAuthenticated } = useAppContext();

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      secret: false,
    },
  });

  const watchedContent = form.watch("content");

  const onSubmit = (_: FormSchema) => {};

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto">
          <CardHeader>
            <h1 className="text-xl text-center">
              Instantly Share Notes and Snippets.
            </h1>
          </CardHeader>
          <CardContent className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Input placeholder="Gist title" {...field} />

                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs defaultValue="write">
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="grid w-full gap-1.5">
                      <Textarea
                        className="min-h-60"
                        placeholder="Type your gist here."
                        {...field}
                      />
                      <FormDescription className="text-sm text-neutral-600">
                        Your gist in markdown format.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="border p-2 rounded-md border-slate-600">
                  <MarkdownRenderer
                    className="min-h-60 max-h-[300px] overflow-y-auto"
                    content={watchedContent}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="md:flex md:justify-between max-md:space-y-2">
              <FormField
                control={form.control}
                name="secret"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      create as secret gist
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button type="submit" className="max-md:w-full">
                Create Gist
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default GistForm;
