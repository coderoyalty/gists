import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormField, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";
import { createUser } from "@/api/auth";
import { useAppContext } from "@/contexts/app.context";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(2),
  name: z.string().min(3).max(255),
});

export function SignupForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { session } = useAppContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const val = await createUser(values);
      if (val) {
        toast({
          title: "Hurray 🎉",
          description: "Account created successfully.",
        });

        navigate("/login");
      } else {
        toast({
          title: "Uh-Oh 😿",
          description: "We were unable to your create account.",
        });
      }
    } catch (err) {
      toast({
        title: "Error ⚠",
        description: "Couldn't sign-up",
      });
    } finally {
      form.reset();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (session) {
        navigate("/");
      }
    }, 500);
  }, [session]);

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <FormLabel>Username</FormLabel>
                      <Input placeholder="Max Robertson" {...field} />
                      <FormMessage />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <FormLabel>Name</FormLabel>
                      <Input placeholder="Robinson" {...field} />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" {...field} />
                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled
              >
                <GitHubLogoIcon className="mr-2 w-5 h-5" />
                Sign up with GitHub
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link to="/" className="underline">
              Go Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
}
