import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { LoginHeader } from "./login-header";
import { PasswordField } from "./password-field";
import { RememberMe } from "./remember-me";
import { LoginDivider } from "./login-divider";
import { SocialLogin } from "./social-login";
import { LoginFooter } from "./login-footer";

export function LoginForm() {
  return (
    <form className="space-y-6">
      <LoginHeader />

      <Input label="Email" type="email" placeholder="Enter your email" />

      <PasswordField />

      <RememberMe />

      <Button fullWidth>Sign In</Button>

      <LoginDivider />

      <SocialLogin />

      <LoginFooter />
    </form>
  );
}
