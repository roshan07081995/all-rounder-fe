import { AuthShell } from "../layouts";
import { AuthCard, SignupForm } from "../components";

export function SignupPage() {
  return (
    <AuthShell>
      <AuthCard title="Create Account" subtitle="Let's get started">
        <SignupForm />
      </AuthCard>
    </AuthShell>
  );
}
