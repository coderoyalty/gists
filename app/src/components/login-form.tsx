import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useAppContext } from "@/contexts/app.context";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const { session } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (session) {
        navigate("/");
      }
    }, 500);
  }, [session]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        ...values,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: `${error.message} 😿`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Hurray 🎉",
          description: "Signed In successfully 💃",
        });

        navigate("/");
      }
    } catch (err) {
    } finally {
      form.reset({
        email: "",
        password: "",
      });
    }
  }

  async function handleOAuthLogin(provider: "google" | "github") {
    let { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: `${error.message} 😿`,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              {/* Password */}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jane@example.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Jane123@"
                          type="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled
                onClick={() => handleOAuthLogin("github")}
              >
                <GitHubLogoIcon className="mr-2 w-5 h-5" />
                Login with Github
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link to="/" className="underline">
                Go Home
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
