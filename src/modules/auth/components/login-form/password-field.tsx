import { Input } from "@/components/ui/input";

import type { InputProps } from "@/components/ui/input/input.types";

type PasswordFieldProps = Omit<InputProps, "type" | "label">;

export function PasswordField(props: PasswordFieldProps) {
  return <Input label="Password" type="password" {...props} />;
}
