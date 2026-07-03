import { AuthShell } from "../layouts";
import { AuthCard, LoginForm } from "../components";

export function LoginPage() {
  return (
    <AuthShell>
      <AuthCard title="Welcome Back 👋" subtitle="Sign in to continue">
        <LoginForm />
      </AuthCard>
    </AuthShell>
  );
}
