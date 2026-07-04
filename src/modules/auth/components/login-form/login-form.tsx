import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import { LoginHeader } from "./login-header";
import { PasswordField } from "./password-field";
import { RememberMe } from "./remember-me";
import { LoginDivider } from "./login-divider";
import { SocialLogin } from "./social-login";
import { LoginFooter } from "./login-footer";
import { loginSchema, type LoginFormValues } from "../../schemas/auth.schema";
import { useLogin } from "../../hooks/use-login";

interface ApiErrorResponse {
  detail?: string;
}

const getLoginErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return (
      (error.response?.data as ApiErrorResponse | undefined)?.detail ??
      "Unable to sign in. Please try again."
    );
  }

  return "Unable to sign in. Please try again.";
};

export function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <LoginHeader />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordField
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <RememberMe />

      {loginMutation.isError && (
        <p className="text-sm font-medium text-red-600" role="alert">
          {getLoginErrorMessage(loginMutation.error)}
        </p>
      )}

      <Button fullWidth type="submit" loading={loginMutation.isPending}>
        Sign In
      </Button>

      <LoginDivider />

      <SocialLogin />

      <LoginFooter />
    </form>
  );
}
