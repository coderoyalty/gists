import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";

function LoginPage() {
  return (
    <div className="min-h-dvh flex items-center">
      <LoginForm />
    </div>
  );
}

function SignupPage() {
  return (
    <div className="min-h-dvh flex items-center">
      <SignupForm />
    </div>
  );
}

export { LoginPage, SignupPage };
