import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  helperText?: string;

  error?: string;

  loading?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  containerClassName?: string;
}
