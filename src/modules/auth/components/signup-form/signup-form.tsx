import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { SignupHeader } from "./signup-header";
import { SignupTerms } from "./signup-terms";
import { SignupDivider } from "./signup-divider";
import { SocialSignup } from "./social-signup";
import { SignupFooter } from "./signup-footer";

export function SignupForm() {
  return (
    <form className="space-y-6">
      <SignupHeader />

      <Input label="Full Name" type="text" placeholder="Enter your name" />

      <Input label="Email" type="email" placeholder="Enter your email" />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
      />

      <SignupTerms />

      <Button fullWidth>Create Account</Button>

      <SignupDivider />

      <SocialSignup />

      <SignupFooter />
    </form>
  );
}
